/**
 * 杜邦美達坦克 詢價單接收器（Google Apps Script）
 *
 * 功能：
 *   1. 接收 Next.js /api/send-order 送來的 POST JSON
 *   2. 將訂單附加到 Google Sheet 一列
 *   3. 同時發送 Google Chat webhook 通知
 *
 * ================================================================
 * 部署步驟（一次性設定）
 * ================================================================
 *
 * 1. 建立 Google Sheet
 *    - 新增一個 Sheet；記下網址中的 SHEET_ID（介於 /d/ 與 /edit 之間）
 *    - 第一個工作表命名為「詢價單」（或自訂，見 SCRIPT PROPERTIES）
 *    - 首列表頭建議欄位（可用 initSheetHeader() 自動建立）：
 *      訂單編號 | 建立時間 | 姓名 | 電話 | Email | 縣市 |
 *      預計施工日 | 花色明細 | 總坪數 | 總金額(參考) | 備註
 *
 * 2. 建立 Google Chat 空間 → 「Manage webhooks」→ 新增一個 → 複製 URL
 *
 * 3. 開啟 https://script.google.com → 新專案 → 貼上此檔案內容
 *
 * 4. 專案設定（左側齒輪圖示） → Script Properties → 新增 3 筆：
 *    SHEET_ID          = <你的 Sheet ID>
 *    SHEET_TAB_NAME    = 詢價單                （若使用預設可省略）
 *    CHAT_WEBHOOK_URL  = <Google Chat webhook 網址>
 *
 * 5. 執行一次 initSheetHeader（會要求授權）以確認表頭
 *
 * 6. 部署 → 新增部署作業 → 類型「網頁應用程式」
 *    - 執行身分：我
 *    - 存取權：所有人
 *    - 部署後複製 Web app URL（形如 https://script.google.com/macros/s/.../exec）
 *
 * 7. 把該 URL 設到 Next.js env var：GOOGLE_SHEET_WEBHOOK_URL
 *    （Vercel: `vercel env add GOOGLE_SHEET_WEBHOOK_URL production` 等）
 *
 * ================================================================
 * 更新 Script 後要重新部署（新版本）才會生效
 * ================================================================
 */

// ---------- Script Properties helpers ----------
function _props() {
  return PropertiesService.getScriptProperties();
}
function _getSheetId() {
  const id = _props().getProperty('SHEET_ID');
  if (!id) throw new Error('缺少 Script Property: SHEET_ID');
  return id;
}
function _getSheetTabName() {
  return _props().getProperty('SHEET_TAB_NAME') || '詢價單';
}
function _getChatWebhookUrl() {
  return _props().getProperty('CHAT_WEBHOOK_URL'); // 允許缺省（則不送通知）
}

// ---------- 表頭定義 ----------
const HEADERS = [
  '訂單編號',
  '建立時間',
  '姓名',
  '電話',
  'Email',
  '縣市',
  '預計施工日',
  '花色明細',
  '總坪數',
  '總金額(參考)',
  '備註',
];

/**
 * 初始化表頭（首次使用時執行一次）
 */
function initSheetHeader() {
  const ss = SpreadsheetApp.openById(_getSheetId());
  let sheet = ss.getSheetByName(_getSheetTabName());
  if (!sheet) {
    sheet = ss.insertSheet(_getSheetTabName());
  }
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
  sheet.setFrozenRows(1);
  return '表頭已就緒：' + HEADERS.join(', ');
}

// ---------- HTTP handlers ----------

/**
 * POST 入口 — 接收 Next.js 送來的 JSON
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const row = _buildRow(payload);

    // 1) 寫入 Sheet
    const ss = SpreadsheetApp.openById(_getSheetId());
    const sheet = ss.getSheetByName(_getSheetTabName()) || ss.insertSheet(_getSheetTabName());
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow(row);

    // 2) 送 Google Chat 通知（失敗不影響主流程）
    try {
      _notifyChat(payload);
    } catch (chatErr) {
      console.error('Chat notify failed', chatErr);
    }

    return _jsonOk({ orderNumber: payload.orderNumber });
  } catch (err) {
    console.error(err);
    return _jsonErr(String(err && err.message ? err.message : err));
  }
}

/**
 * GET 入口 — 保留用來 debug 或做健康檢查
 */
function doGet(e) {
  return _jsonOk({ status: 'ok', service: 'metatank-inquiry-receiver' });
}

// ---------- 資料處理 ----------

function _buildRow(p) {
  const items = Array.isArray(p.items) ? p.items : [];

  // 花色明細：每個 item 一行，格式「花色（型號） x N 坪」
  const itemsText = items
    .map(function (i) {
      const label = i.name + (i.model ? '（' + i.model + '）' : '');
      return label + ' x ' + i.pings + ' 坪';
    })
    .join('\n');

  const totalPings = items.reduce(function (s, i) {
    return s + (Number(i.pings) || 0);
  }, 0);

  return [
    p.orderNumber || '',
    p.submittedAt || new Date().toISOString(),
    p.name || '',
    p.phone || '',
    p.email || '',
    p.region || '',
    p.constructionDate || '',
    itemsText,
    totalPings,
    p.totalPrice || '',
    p.notes || '',
  ];
}

// ---------- Google Chat 通知 ----------

function _notifyChat(p) {
  const url = _getChatWebhookUrl();
  if (!url) return; // 未設 webhook 就跳過

  const items = Array.isArray(p.items) ? p.items : [];
  const totalPings = items.reduce(function (s, i) {
    return s + (Number(i.pings) || 0);
  }, 0);

  const itemsLine = items
    .map(function (i) {
      return '• ' + i.name + ' — ' + i.pings + ' 坪';
    })
    .join('\n');

  const card = {
    cardsV2: [
      {
        cardId: 'metatank-inquiry-' + (p.orderNumber || Date.now()),
        card: {
          header: {
            title: '新詢價單 ' + (p.orderNumber || ''),
            subtitle: (p.name || '') + '　' + (p.phone || ''),
            imageUrl: 'https://www.gstatic.com/images/icons/material/system/2x/shopping_cart_black_48dp.png',
            imageType: 'CIRCLE',
          },
          sections: [
            {
              widgets: [
                {
                  decoratedText: {
                    topLabel: 'Email',
                    text: p.email || '（未填）',
                  },
                },
                {
                  decoratedText: {
                    topLabel: '縣市 / 預計施工日',
                    text: (p.region || '') + '　' + (p.constructionDate || ''),
                  },
                },
                {
                  decoratedText: {
                    topLabel: '總坪數',
                    text: totalPings + ' 坪',
                  },
                },
                {
                  decoratedText: {
                    topLabel: '花色',
                    text: itemsLine || '（無）',
                    wrapText: true,
                  },
                },
                p.notes
                  ? {
                      decoratedText: {
                        topLabel: '備註',
                        text: p.notes,
                        wrapText: true,
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          ],
        },
      },
    ],
    // 純文字 fallback（Chat 通知列預覽）
    text:
      '📥 新詢價單 ' +
      (p.orderNumber || '') +
      ' — ' +
      (p.name || '') +
      '（' +
      totalPings +
      ' 坪）',
  };

  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json; charset=UTF-8',
    payload: JSON.stringify(card),
    muteHttpExceptions: true,
  });
}

// ---------- 回應輔助 ----------
function _jsonOk(data) {
  return ContentService.createTextOutput(
    JSON.stringify({ success: true, ...data })
  ).setMimeType(ContentService.MimeType.JSON);
}
function _jsonErr(msg) {
  return ContentService.createTextOutput(
    JSON.stringify({ success: false, error: msg })
  ).setMimeType(ContentService.MimeType.JSON);
}

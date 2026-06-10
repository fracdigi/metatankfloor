import { NextRequest, NextResponse } from "next/server";

// 每次請求都即時執行（不快取），確保訂單都會寫入試算表
export const dynamic = "force-dynamic";

// Google Apps Script Web App（doGet 會把 query string 依 data 工作表的表頭寫入一列）
// 可用環境變數 GOOGLE_SHEET_WEBHOOK_URL 覆寫
const SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbxaZkKMrGmlnEW4i_X82eVyV-67jfl3ZmqDjbxiGCZLtK0nW2u6pdu6LqTS_pqp5bN0/exec";

interface OrderItem {
  name: string;
  model: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 將購物車品項整理成單一儲存格可讀的文字
    const items: OrderItem[] = Array.isArray(body.items) ? body.items : [];
    const itemsText = items
      .map(
        (i) =>
          `${i.name}${i.model ? `（${i.model}）` : ""} x${i.quantity} = NT$${i.subtotal}`
      )
      .join("\n");

    // 攤平成 Apps Script doGet 可讀的參數（key 需對應試算表的表頭）
    const params: Record<string, string> = {
      orderNumber: body.orderNumber ?? "",
      submittedAt: body.submittedAt ?? "",
      name: body.name ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      region: body.region ?? "",
      floorSize: String(body.floorSize ?? ""),
      estimatedPings: String(body.estimatedPings ?? ""),
      constructionDate: body.constructionDate ?? "",
      selectedColor: body.selectedColor ?? "",
      notes: body.notes ?? "",
      itemCount: String(items.length),
      items: itemsText,
      totalPrice: String(body.totalPrice ?? ""),
    };

    const query = new URLSearchParams(params).toString();
    const url = `${SHEET_WEBHOOK_URL}?${query}`;

    // 在伺服器端送出 GET，避免瀏覽器 CORS / 重新導向問題
    const sheetRes = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });

    if (!sheetRes.ok) {
      console.error("Google Sheet webhook failed:", sheetRes.status, await sheetRes.text());
      return NextResponse.json(
        { success: false, error: "寫入試算表失敗" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "訂購單已記錄",
      orderNumber: body.orderNumber,
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json({ success: false, error: "處理失敗" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

// 每次請求都即時執行（不快取），確保訂單都會被送出
export const dynamic = "force-dynamic";

// Google Apps Script Web App URL（可用環境變數 GOOGLE_SHEET_WEBHOOK_URL 覆寫）
const SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbxaZkKMrGmlnEW4i_X82eVyV-67jfl3ZmqDjbxiGCZLtK0nW2u6pdu6LqTS_pqp5bN0/exec";

interface IncomingItem {
  name: string;
  model: string;
  colorCode?: string;
  pings: number; // 坪數（原 cart quantity）
  unitPrice: number;
  subtotal: number;
}

interface IncomingBody {
  orderNumber: string;
  submittedAt: string;
  name: string;
  phone: string;
  email?: string;
  region: string;
  constructionDate: string;
  notes?: string;
  items: IncomingItem[];
  totalPings: number;
  totalPrice: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<IncomingBody>;

    const payload = {
      orderNumber: body.orderNumber ?? "",
      submittedAt: body.submittedAt ?? new Date().toISOString(),
      name: body.name ?? "",
      phone: body.phone ?? "",
      email: body.email ?? "",
      region: body.region ?? "",
      constructionDate: body.constructionDate ?? "",
      notes: body.notes ?? "",
      items: Array.isArray(body.items) ? body.items : [],
      totalPings: Number(body.totalPings ?? 0),
      totalPrice: Number(body.totalPrice ?? 0),
    };

    const sheetRes = await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!sheetRes.ok) {
      console.error(
        "Apps Script webhook failed:",
        sheetRes.status,
        await sheetRes.text().catch(() => "")
      );
      return NextResponse.json(
        { success: false, error: "寫入試算表失敗" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "詢價單已送出",
      orderNumber: payload.orderNumber,
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { success: false, error: "處理失敗" },
      { status: 500 }
    );
  }
}

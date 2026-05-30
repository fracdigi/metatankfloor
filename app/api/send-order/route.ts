import { NextRequest, NextResponse } from "next/server";

// TODO: 之後可接 Resend 真實寄信
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("=== 新訂購單 ===");
    console.log(JSON.stringify(body, null, 2));
    console.log("=================");

    // 這裡之後可以呼叫 Resend 發信
    // if (process.env.RESEND_API_KEY) {
    //   await resend.emails.send({...})
    // }

    return NextResponse.json({ 
      success: true, 
      message: "訂購單已記錄",
      orderNumber: body.orderNumber 
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json({ success: false, error: "處理失敗" }, { status: 500 });
  }
}

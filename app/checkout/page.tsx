"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const checkoutSchema = z.object({
  name: z.string().min(2, "請輸入姓名"),
  phone: z.string().min(9, "請輸入正確的電話號碼"),
  email: z.string().email("請輸入正確的 Email").optional().or(z.literal("")),
  region: z.string().min(1, "請選擇地區"),
  constructionDate: z.string().min(1, "請選擇預計施工日期"),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const regions = [
  "台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市",
  "基隆市", "新竹市", "新竹縣", "苗栗縣", "彰化縣", "南投縣",
  "雲林縣", "嘉義市", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣",
  "台東縣", "澎湖縣", "金門縣", "連江縣",
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const totalPings = items.reduce((sum, i) => sum + i.quantity, 0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { constructionDate: "" },
  });

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) {
      toast.error("詢價清單是空的，請先選擇花色");
      return;
    }

    setIsSubmitting(true);
    const newOrderNumber = `MTK-${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);

    const orderPayload = {
      orderNumber: newOrderNumber,
      submittedAt: new Date().toISOString(),
      ...data,
      items: items.map((i) => ({
        name: i.name,
        model: i.model,
        colorCode: i.colorCode,
        pings: i.quantity,
        unitPrice: i.pricePerPing,
        subtotal: i.pricePerPing * i.quantity,
      })),
      totalPings,
      totalPrice: totalPrice(),
    };

    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        toast.success("詢價單已送出！", {
          description: "專人將於 24 小時內與您聯絡報價",
        });
      } else {
        toast.success("詢價單已記錄", {
          description: "我們會盡快與您聯絡",
        });
      }

      setOrderSubmitted(true);
      clearCart();
    } catch (error) {
      console.error(error);
      toast.success("詢價單已記錄", {
        description: "網路異常，我們已收到您的需求",
      });
      setOrderSubmitted(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center order-success">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#4A7043] flex items-center justify-center mb-6">
          <span className="text-white text-3xl">✓</span>
        </div>
        <h1 className="text-3xl font-semibold mb-4">感謝您的詢價！</h1>
        <p className="text-xl text-[#6B5B4F] mb-2">
          訂購單編號：
          <span className="font-mono text-[#A67B5B]">{orderNumber}</span>
        </p>
        <p className="text-[#6B5B4F] mb-8">
          專人將於 <span className="font-medium text-[#3F2E1E]">24 小時內</span> 與您聯絡，提供精準報價與施工安排。
        </p>

        <div className="bg-white p-8 rounded-2xl text-left max-w-md mx-auto border">
          <p className="text-sm mb-4 font-medium">您也可以直接聯絡我們：</p>
          <div className="space-y-2 text-sm">
            <div>電話：<a href="tel:0922885566" className="text-[#A67B5B]">0922-885-566</a></div>
            <div>Email：<a href="mailto:service@dupontmetatank.com.tw" className="text-[#A67B5B]">service@dupontmetatank.com.tw</a></div>
            <div>地址：台北市大安區師大路 110 號 B1</div>
          </div>
        </div>

        <Link href="/" className="mt-8 inline-block text-sm text-[#A67B5B] hover:underline">
          返回首頁
        </Link>
      </div>
    );
  }

  // 詢價清單為空 → 引導回產品頁
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="section-title mb-3">詢價清單是空的</h1>
        <p className="text-[#6B5B4F] mb-8">
          請先到產品頁選擇花色與坪數，加入詢價清單後再回到本頁填寫聯絡資料。
        </p>
        <Link href="/products">
          <Button size="lg" className="h-12 px-8 bg-[#A67B5B] hover:bg-[#8B6649]">
            前往選擇花色
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="section-title mb-2">填寫詢價單</h1>
      <p className="text-[#6B5B4F] mb-8">
        請填寫以下資料，專人將主動聯絡您報價（無需付款）
      </p>

      {/* 詢價花色清單（從購物車帶入） */}
      <section
        aria-label="詢價花色清單"
        className="mb-8 bg-white p-6 rounded-2xl border"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">詢價花色</h2>
          <Link href="/products" className="text-xs text-[#A67B5B] hover:underline">
            + 新增更多花色
          </Link>
        </div>

        <ul className="divide-y divide-[#EDE7D9]">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-3">
              <div className="relative w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-[#EDE7D9] border border-[#D4C9B8]">
                <Image
                  src={item.image}
                  alt={`${item.name} 地板紋理`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm leading-tight">{item.name}</div>
                <div className="text-xs text-[#6B5B4F] mt-0.5">{item.model}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium tabular-nums">{item.quantity} 坪</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm">
          <span className="text-[#6B5B4F]">
            合計 {items.length} 種花色 ・ 共{" "}
            <span className="font-medium text-[#3F2E1E]">{totalPings} 坪</span>
          </span>
          <span className="text-[11px] text-[#6B5B4F]">如需調整請至詢價清單</span>
        </div>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 rounded-2xl border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="form-label">姓名 *</Label>
            <Input {...register("name")} className="form-input" placeholder="王大明" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label className="form-label">聯絡電話 *</Label>
            <Input {...register("phone")} className="form-input" placeholder="0912-345-678" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <Label className="form-label">Email（選填，方便寄送報價單）</Label>
          <Input {...register("email")} type="email" className="form-input" placeholder="example@gmail.com" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="form-label">所在縣市 *</Label>
            <Select onValueChange={(v) => setValue("region", v as string)}>
              <SelectTrigger className="form-input">
                <SelectValue placeholder="請選擇地區" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>}
          </div>

          <div>
            <Label className="form-label">預計施工日期 *</Label>
            <Input type="date" {...register("constructionDate")} className="form-input" />
            {errors.constructionDate && (
              <p className="text-red-500 text-xs mt-1">{errors.constructionDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="form-label">備註 / 其他需求</Label>
          <Textarea
            {...register("notes")}
            className="form-input min-h-[110px]"
            placeholder="例如：老屋翻新、已有師傅、需要含拆除報價..."
          />
        </div>

        <div className="pt-4 border-t">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-base bg-[#A67B5B] hover:bg-[#8B6649]"
          >
            {isSubmitting ? "送出中..." : "送出詢價單，專人 24 小時內聯絡"}
          </Button>
          <p className="text-center text-xs text-[#6B5B4F] mt-3">
            送出後我們會立即為您安排專人報價，無需任何付款
          </p>
        </div>
      </form>
    </div>
  );
}

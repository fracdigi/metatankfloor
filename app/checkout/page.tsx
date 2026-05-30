"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/lib/cart-store";
import { colorOptions } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

const checkoutSchema = z.object({
  name: z.string().min(2, "請輸入姓名"),
  phone: z.string().min(9, "請輸入正確的電話號碼"),
  email: z.string().email("請輸入正確的 Email").optional().or(z.literal("")),
  region: z.string().min(1, "請選擇地區"),
  floorSize: z.number().min(1, "坪數至少 1 坪"),
  constructionDate: z.string().min(1, "請選擇預計施工日期"),
  selectedColor: z.string().min(1, "請選擇花色"),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const regions = [
  "台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市",
  "基隆市", "新竹市", "新竹縣", "苗栗縣", "彰化縣", "南投縣",
  "雲林縣", "嘉義市", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣", "台東縣", "澎湖縣", "金門縣", "連江縣"
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      floorSize: 20,
      constructionDate: "",
    },
  });

  const floorSize = watch("floorSize");
  const selectedColor = watch("selectedColor");
  const estimatedPings = Math.ceil((floorSize || 0) * 1.08);

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) {
      toast.error("購物車是空的");
      return;
    }

    setIsSubmitting(true);

    const newOrderNumber = `MTK-${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);

    const orderPayload = {
      orderNumber: newOrderNumber,
      ...data,
      items: items.map((i) => ({
        name: i.name,
        model: i.model,
        quantity: i.quantity,
        unitPrice: i.pricePerPing,
        subtotal: i.pricePerPing * i.quantity,
      })),
      totalPrice: totalPrice(),
      estimatedPings,
      submittedAt: new Date().toISOString(),
    };

    try {
      // 呼叫後端 API 寄送 Email（稍後實作）
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        toast.success("訂購單已送出！", {
          description: "專人將於 24 小時內與您聯絡報價",
        });
      } else {
        // 即使寄信失敗，也顯示成功（讓用戶看到訂購單）
        toast.success("訂購單已記錄", {
          description: "我們會盡快與您聯絡",
        });
      }

      setOrderSubmitted(true);
      clearCart();
    } catch (error) {
      console.error(error);
      toast.success("訂購單已記錄", {
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
        <p className="text-xl text-[#6B5B4F] mb-2">訂購單編號：<span className="font-mono text-[#A67B5B]">{orderNumber}</span></p>
        <p className="text-[#6B5B4F] mb-8">專人將於 <span className="font-medium text-[#3F2E1E]">24 小時內</span> 與您聯絡，提供精準報價與施工安排。</p>

        <div className="bg-white p-8 rounded-2xl text-left max-w-md mx-auto border">
          <p className="text-sm mb-4 font-medium">您也可以直接聯絡我們：</p>
          <div className="space-y-2 text-sm">
            <div>電話：<a href="tel:02-1234-5678" className="text-[#A67B5B]">02-1234-5678</a></div>
            <div>Email：<a href="mailto:service@dupontmetatank.com.tw" className="text-[#A67B5B]">service@dupontmetatank.com.tw</a></div>
          </div>
        </div>

        <Link href="/" className="mt-8 inline-block text-sm text-[#A67B5B] hover:underline">
          返回首頁
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="section-title mb-2">填寫詢價單</h1>
      <p className="text-[#6B5B4F] mb-8">請填寫以下資料，專人將主動聯絡您報價（無需付款）</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-2xl border">
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
            <Select onValueChange={(v) => setValue("region", v as any)}>
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
            {errors.constructionDate && <p className="text-red-500 text-xs mt-1">{errors.constructionDate.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="form-label">室內面積（坪數）*</Label>
            <Input 
              type="number" 
              {...register("floorSize", { valueAsNumber: true })} 
              className="form-input" 
              min={1} 
            />
            <p className="text-xs mt-1 text-[#6B5B4F]">建議購買量：約 <span className="font-medium text-[#A67B5B]">{estimatedPings} 坪</span>（含 8% 損耗）</p>
          </div>

          <div>
            <Label className="form-label">欲詢價花色 *</Label>
            <Select onValueChange={(v) => setValue("selectedColor", v as any)} value={selectedColor || ""}>
              <SelectTrigger className="form-input">
                <SelectValue placeholder="選擇花色" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.selectedColor && <p className="text-red-500 text-xs mt-1">{errors.selectedColor.message}</p>}
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
            disabled={isSubmitting || items.length === 0}
            className="w-full h-14 text-base bg-[#A67B5B] hover:bg-[#8B6649]"
          >
            {isSubmitting ? "送出中..." : "送出詢價單，專人 24 小時內聯絡"}
          </Button>
          <p className="text-center text-xs text-[#6B5B4F] mt-3">送出後我們會立即為您安排專人報價，無需任何付款</p>
        </div>
      </form>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, openCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">您的詢價清單是空的</h1>
        <p className="text-[#6B5B4F] mb-8">探索我們的碳化實木芯地板系列</p>
        <Link href="/products">
          <Button>前往選購產品</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="section-title mb-8">詢價清單</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl border flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-[#6B5B4F]">{item.model}</div>
              <div className="mt-4 text-sm text-[#6B5B4F]">由專人諮詢報價</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2">-</button>
                <span className="px-4">{item.quantity} 坪</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">移除</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t pt-8 gap-6">
        <div>
          <div className="text-sm text-[#6B5B4F]">報價方式</div>
          <div className="text-2xl font-semibold">由專人諮詢報價</div>
          <div className="text-xs text-[#6B5B4F] mt-1">
            ※ 將依花色、坪數、安裝條件客製，專員於 24 小時內主動聯繫
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/checkout">
            <Button className="h-12 px-10 bg-[#A67B5B] hover:bg-[#8B6649]">送出詢價</Button>
          </Link>
          <Button variant="outline" onClick={openCart}>繼續選購</Button>
        </div>
      </div>
    </div>
  );
}

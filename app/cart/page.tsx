"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, totalPrice, removeFromCart, updateQuantity, openCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">您的購物車是空的</h1>
        <p className="text-[#6B5B4F] mb-8">探索我們的碳化實木芯地板系列</p>
        <Link href="/products">
          <Button>前往選購產品</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="section-title mb-8">購物車</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl border flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-[#6B5B4F]">{item.model}</div>
              <div className="mt-4 text-sm">每坪 NT${item.pricePerPing.toLocaleString()}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2">-</button>
                <span className="px-4">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2">+</button>
              </div>
              <div className="w-28 text-right font-medium">
                NT${(item.pricePerPing * item.quantity).toLocaleString()}
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">移除</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t pt-8">
        <div>
          <div className="text-sm text-[#6B5B4F]">預估總金額</div>
          <div className="text-3xl font-semibold tabular-nums">NT${totalPrice().toLocaleString()}</div>
        </div>
        <div className="flex gap-3 mt-6 md:mt-0">
          <Link href="/checkout">
            <Button className="h-12 px-10 bg-[#A67B5B] hover:bg-[#8B6649]">去結帳</Button>
          </Link>
          <Button variant="outline" onClick={openCart}>繼續選購</Button>
        </div>
      </div>
    </div>
  );
}

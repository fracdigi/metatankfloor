"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

export default function CartSheet() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCartStore();

  const formatPrice = (price: number) => `NT$${price.toLocaleString()}`;

  const handleCheckout = () => {
    closeCart();
    // 稍後會導向 /checkout
    window.location.href = "/checkout";
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-md p-0 flex flex-col cart-sheet"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">購物車</SheetTitle>
            <SheetClose>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <p className="text-sm text-[#6B5B4F]">
            共 {totalItems()} 件商品
          </p>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#EDE7D9] flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-[#A67B5B]" />
              </div>
              <p className="text-lg font-medium mb-2">購物車是空的</p>
              <p className="text-sm text-[#6B5B4F] mb-6">探索我們的碳化實木芯地板系列</p>
              <SheetClose>
                <Link href="/products">
                  <Button variant="outline" className="border-[#A67B5B] text-[#A67B5B]">
                    前往產品頁
                  </Button>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-[#EDE7D9] pb-6 last:border-0 last:pb-0">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#EDE7D9] border border-[#D4C9B8]">
                    <Image
                      src={item.image}
                      alt={`${item.name} 地板紋理`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm leading-tight pr-2">{item.name}</p>
                        <p className="text-xs text-[#6B5B4F] mt-0.5">{item.model}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#6B5B4F] hover:text-[#B45353] p-1"
                        aria-label="移除商品"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-[#D4C9B8] rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-[#EDE7D9] rounded-l-md disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-sm tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-[#EDE7D9] rounded-r-md"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-medium tabular-nums">
                          {formatPrice(item.pricePerPing * item.quantity)}
                        </div>
                        <div className="text-[10px] text-[#6B5B4F]">
                          每坪 {formatPrice(item.pricePerPing)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="border-t bg-white p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#6B5B4F]">預估總金額</span>
              <span className="font-semibold text-lg tabular-nums tracking-tight">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <p className="text-xs text-[#6B5B4F] -mt-1">
              ※ 實際金額依最終坪數與施工條件計算，專人將於 24 小時內報價
            </p>

            <div className="space-y-2 pt-2">
              <Button
                onClick={handleCheckout}
                className="w-full h-12 bg-[#A67B5B] hover:bg-[#8B6649] text-white text-base"
              >
                去結帳
              </Button>
              <SheetClose>
                <Button variant="outline" className="w-full border-[#D4C9B8]">
                  繼續選購
                </Button>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

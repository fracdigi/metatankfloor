"use client";

import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, openCart } = useCartStore();

  const handleAdd = () => {
    addToCart(product);
    toast.success(`已加入詢價清單：${product.name}`, {
      description: "由專人諮詢報價",
      action: {
        label: "查看詢價清單",
        onClick: () => openCart(),
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={handleAdd}
        size="lg"
        className="h-14 flex-1 bg-[#A67B5B] hover:bg-[#8B6649] text-base"
      >
        加入詢價清單
      </Button>
      <Link href="/products" className="flex-1 sm:flex-none">
        <Button variant="outline" size="lg" className="w-full h-14 border-[#A67B5B] text-[#A67B5B]">
          返回產品列表
        </Button>
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  showAddButton?: boolean;
}

export default function ProductCard({ product, showAddButton = true }: ProductCardProps) {
  const { addToCart, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <Link href={`/product/${product.slug}`} className="group block">
      <motion.div 
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.23, 1.0, 0.32, 1] }}
        className="product-card h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] bg-[#EDE7D9] overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.name} 地板表面紋理`}
            fill
            className="object-cover product-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <div className="price-tag text-xs">
              由專人諮詢報價
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div>
            <div className="text-xs text-[#6B5B4F] mb-1 tracking-[1px]">{product.model}</div>
            <h3 className="font-semibold text-lg leading-snug text-[#3F2E1E] group-hover:text-[#A67B5B] transition-colors">
              {product.name}
            </h3>
          </div>

          <p className="mt-2 text-sm text-[#6B5B4F] line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="mt-4 pt-4 border-t flex items-center justify-between gap-3">
            <div className="text-xs text-[#6B5B4F]">
              {product.size}<br />
              {product.thickness}
            </div>

            {showAddButton && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-[#4A7043] hover:bg-[#3A5A35] text-white h-9 px-4 text-xs"
              >
                <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                加入詢價清單
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

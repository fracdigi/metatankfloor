"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/products", label: "產品" },
  { href: "/#features", label: "特色" },
  { href: "/blog", label: "部落格" },
  { href: "#contact", label: "聯絡我們" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { totalItems, openCart } = useCartStore();
  const cartCount = totalItems();

  // 避免 Zustand persist hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#D4C9B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - 置左 */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#D4C9B8]">
              <Image
                src="/LOGO-AuthorrizedLicensee-2.webp"
                alt="杜邦美達坦克 授權經銷商 Logo"
                fill
                sizes="44px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-xl tracking-tight text-[#3F2E1E]">
                杜邦美達坦克
              </div>
              <div className="text-[10px] text-[#6B5B4F] -mt-1">碳化實木芯地板</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={link.href.startsWith("/#") ? undefined : closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative h-11 w-11 rounded-full hover:bg-[#EDE7D9]"
              aria-label="開啟購物車"
            >
              <ShoppingCart className="h-5 w-5" />
              {isMounted && cartCount > 0 && (
                <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#A67B5B] text-[10px] font-medium text-white">
                  {cartCount > 9 ? "9+" : cartCount}
                </div>
              )}
            </Button>

            {/* Mobile Hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-11 w-11 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="切換選單"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden" onClick={closeMobileMenu}>
          <div
            className="mobile-menu-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="font-semibold text-lg">選單</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileMenu}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="px-4 py-3 text-base rounded-lg hover:bg-[#EDE7D9] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-[#D4C9B8]">
              <Button
                onClick={() => {
                  closeMobileMenu();
                  openCart();
                }}
                className="w-full bg-[#A67B5B] hover:bg-[#8B6649] text-white"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                購物車 {isMounted && cartCount > 0 && `(${cartCount})`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

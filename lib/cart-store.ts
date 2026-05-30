import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "./types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  // UI
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
  estimatedPings: (floorSize: number) => number; // 建議用量（坪數 × 1.1 安全係數）
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addToCart: (product, quantity = 1) => {
        const { items } = get();
        const existing = items.find((item) => item.id === product.id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity }],
          });
        }
      },

      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.pricePerPing * item.quantity,
          0
        );
      },

      estimatedPings: (floorSize: number) => {
        // 建議購買量 = 坪數 × 1.08（含損耗與切割）
        return Math.ceil(floorSize * 1.08);
      },
    }),
    {
      name: "dupont-metatank-cart",
      partialize: (state) => ({ items: state.items }), // 只持久化購物車內容
    }
  )
);

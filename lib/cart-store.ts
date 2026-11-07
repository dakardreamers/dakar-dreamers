import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string; slug: string; name: string; price_fcfa: number;
  image: string; size: string; color: string; qty: number;
};

type CartState = {
  items: CartItem[];
  add: (i: CartItem) => void;
  remove: (id: string, size: string, color: string) => void;
  setQty: (id: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => set((s) => {
        const key = (i: CartItem) => `${i.id}-${i.size}-${i.color}`;
        const found = s.items.find((i) => key(i) === key(item));
        return found
          ? { items: s.items.map((i) => key(i) === key(item) ? { ...i, qty: i.qty + item.qty } : i) }
          : { items: [...s.items, item] };
      }),
      remove: (id, size, color) => set((s) => ({
        items: s.items.filter((i) => !(i.id === id && i.size === size && i.color === color)),
      })),
      setQty: (id, size, color, qty) => set((s) => ({
        items: s.items.map((i) =>
          i.id === id && i.size === size && i.color === color ? { ...i, qty: Math.max(1, qty) } : i
        ),
      })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((t, i) => t + i.price_fcfa * i.qty, 0),
    }),
    { name: "dd-cart" }
  )
);
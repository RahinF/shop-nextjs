import { v4 as uuid } from "uuid";
import create from "zustand";
import { persist } from "zustand/middleware";
import ICartProduct from "../types/ICartProduct";

interface CartState {
  quantity: number;
  products: ICartProduct[];
  addToCart: (product: ICartProduct) => void;
  increaseQuantity: (uuid: string) => void;
  decreaseQuantity: (uuid: string) => void;
  removeFromCart: (uuid: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartState>(
    (set) => ({
      quantity: 0,
      products: [],
      addToCart: (product) => {
        set((state) => {
          const duplicateItem = state.products.find(
            (p) =>
              p.id === product.id &&
              p.base === product.base &&
              p.extras.length === product.extras.length &&
              p.extras.every((extra) => product.extras.includes(extra))
          );

          if (duplicateItem) {
            duplicateItem.quantity = duplicateItem.quantity! + 1;
            return {
              quantity: state.quantity + 1,
              products: [...state.products],
            };
          }

          return {
            quantity: state.quantity + 1,
            products: [
              ...state.products,
              { ...product, quantity: 1, uuid: uuid() },
            ],
          };
        });
      },

      increaseQuantity: (uuid) =>
        set((state) => {
          const itemFound = state.products.find(
            (product) => product.uuid === uuid
          );
          if (itemFound) {
            itemFound.quantity! += 1;
          }

          return {
            products: [...state.products],
            quantity: state.quantity + 1,
          };
        }),

        decreaseQuantity: (uuid) =>
        set((state) => {
          const itemFound = state.products.find(
            (product) => product.uuid === uuid
          );
          if (itemFound) {
            itemFound.quantity! -= 1;
          }

          return {
            products: [...state.products],
            quantity: state.quantity - 1,
          };
        }),

      removeFromCart: (uuid) =>
        set((state) => ({
          products: state.products.filter((product) => product.uuid !== uuid),
          quantity: state.quantity - 1,
        })),

      clearCart: () => set({ quantity: 0, products: [] }),
    }),
    { name: "cart" }
  )
);
export default useCart;

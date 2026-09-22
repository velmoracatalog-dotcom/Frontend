"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CatalogImage } from "@/components/ui/CatalogImage";
import { formatPKR } from "@/lib/format";
import { easeOutLuxury } from "@/lib/motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeCart,
  removeFromCart,
  updateQuantity,
} from "@/store/slices/cartSlice";
import { CloseIcon } from "@/components/icons";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            className="fixed inset-0 z-50 bg-ink/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
          />
          <motion.aside
            key="cart-panel"
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: easeOutLuxury }}
            aria-hidden={!isOpen}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-serif text-2xl tracking-wide">Your Cart</h2>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => dispatch(closeCart())}
                className="text-ink hover:text-bronze"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-sm leading-7 text-stone">
                  Your cart is empty. Discover something timeless.
                </p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-cream">
                        <CatalogImage
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-serif text-lg">{item.name}</p>
                        <p className="mt-1 text-sm text-stone">{formatPKR(item.price)}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-line">
                            <button
                              type="button"
                              className="px-2.5 py-1 text-sm"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity - 1,
                                  }),
                                )
                              }
                            >
                              −
                            </button>
                            <span className="min-w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              className="px-2.5 py-1 text-sm"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity + 1,
                                  }),
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="text-[11px] tracking-[0.16em] text-stone uppercase hover:text-ink"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="tracking-[0.16em] text-stone uppercase">Subtotal</span>
                <span className="font-medium">{formatPKR(total)}</span>
              </div>
              <button
                type="button"
                disabled={items.length === 0}
                className="btn-fill w-full bg-ink py-3 text-[11px] tracking-[0.22em] text-ivory uppercase disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Checkout</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

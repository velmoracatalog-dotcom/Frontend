import type { Order } from "./types";

export const ORDER_STEPS = [
  { id: "pending", label: "Placed", copy: "Your order is with the house." },
  { id: "confirmed", label: "Confirmed", copy: "The atelier has accepted it." },
  { id: "packed", label: "Packed", copy: "Your pieces are packed and ready." },
  { id: "shipped", label: "On the way", copy: "The courier has your order." },
  { id: "delivered", label: "Delivered", copy: "It has reached your door." },
] as const;

export type ProgressStatus = (typeof ORDER_STEPS)[number]["id"];

export function stepIndex(status: Order["status"]) {
  return ORDER_STEPS.findIndex((step) => step.id === status);
}

export function currentStepCopy(status: Order["status"]) {
  if (status === "cancelled") return "This order was cancelled.";
  const step = ORDER_STEPS.find((item) => item.id === status);
  return step?.copy ?? "Your order is with the house.";
}

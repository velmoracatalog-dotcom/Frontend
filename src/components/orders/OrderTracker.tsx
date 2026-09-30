"use client";

import type { Order } from "@/lib/types";
import { currentStepCopy, ORDER_STEPS, stepIndex } from "@/lib/orderSteps";

export function OrderTracker({
  status,
  onSelect,
}: {
  status: Order["status"];
  onSelect?: (status: Order["status"]) => void;
}) {
  if (status === "cancelled") {
    return (
      <div className="border border-line bg-cream/50 px-5 py-4">
        <p className="text-[11px] tracking-[0.18em] uppercase text-bronze">Cancelled</p>
        <p className="mt-2 text-sm leading-7 text-stone">{currentStepCopy(status)}</p>
      </div>
    );
  }

  const active = Math.max(0, stepIndex(status));

  return (
    <div>
      <p className="text-sm leading-7 text-stone">{currentStepCopy(status)}</p>
      <ol className="mt-6 flex items-start">
        {ORDER_STEPS.map((step, index) => {
          const done = index <= active;
          const current = index === active;
          return (
            <li key={step.id} className="flex flex-1 flex-col items-center text-center">
              <div className="flex w-full items-center">
                <span className={`h-px flex-1 ${index === 0 ? "bg-transparent" : done ? "bg-bronze" : "bg-line"}`} />
                <button
                  type="button"
                  disabled={!onSelect}
                  onClick={() => onSelect?.(step.id)}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[11px] tracking-[0.12em] ${
                    current
                      ? "border-ink bg-ink text-ivory"
                      : done
                        ? "border-bronze bg-bronze text-ivory"
                        : "border-line bg-ivory text-stone"
                  } ${onSelect ? "cursor-pointer" : "cursor-default"}`}
                >
                  {index + 1}
                </button>
                <span
                  className={`h-px flex-1 ${index === ORDER_STEPS.length - 1 ? "bg-transparent" : index < active ? "bg-bronze" : "bg-line"}`}
                />
              </div>
              <p className={`mt-3 text-[10px] tracking-[0.14em] uppercase md:text-[11px] ${current ? "text-ink" : "text-stone"}`}>
                {step.label}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

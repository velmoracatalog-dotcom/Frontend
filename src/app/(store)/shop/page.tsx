import { Suspense } from "react";
import { ShopView } from "./ShopView";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-stone">
          Opening the shop...
        </div>
      }
    >
      <ShopView />
    </Suspense>
  );
}

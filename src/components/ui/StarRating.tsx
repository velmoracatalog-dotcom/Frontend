import { StarIcon } from "@/components/icons";

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-bronze" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} className="h-3.5 w-3.5" filled={index < rating} />
      ))}
    </div>
  );
}

"use client";

import { useId } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import "swiper/css";

type Breakpoints = {
  sm?: number;
  md?: number;
  lg?: number;
};

export function SectionSlider({
  children,
  perView = 4,
  breakpoints,
}: {
  children: React.ReactNode[];
  perView?: number;
  breakpoints?: Breakpoints;
}) {
  const uid = useId().replace(/:/g, "");
  const prev = `slider-prev-${uid}`;
  const next = `slider-next-${uid}`;

  return (
    <div className="relative">
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous"
          className={`${prev} flex h-10 w-10 cursor-pointer items-center justify-center border border-line text-ink transition hover:border-ink hover:bg-ink hover:text-ivory disabled:cursor-default disabled:opacity-30 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-ink`}
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next"
          className={`${next} flex h-10 w-10 cursor-pointer items-center justify-center border border-line text-ink transition hover:border-ink hover:bg-ink hover:text-ivory disabled:cursor-default disabled:opacity-30 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-ink`}
        >
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: `.${prev}`, nextEl: `.${next}` }}
        watchOverflow
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: breakpoints?.sm ?? Math.min(2, perView) },
          768: { slidesPerView: breakpoints?.md ?? Math.min(3, perView) },
          1024: { slidesPerView: breakpoints?.lg ?? perView },
        }}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="!h-auto">
            {child}
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

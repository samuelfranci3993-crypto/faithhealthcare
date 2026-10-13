"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { ParentCategoryInfo } from "@/lib/medicines";
import { getCategoryInsightMap } from "@/lib/insights";

type CategoryGridProps = {
  categories: ParentCategoryInfo[];
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const router = useRouter();
  const navigatingRef = useRef(false);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const insightMap = useMemo(() => getCategoryInsightMap(), []);

  const handleCardClick = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
    name: string
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (navigatingRef.current) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    navigatingRef.current = true;
    setSelectedCat(name);

    window.setTimeout(() => {
      router.push(href);
    }, 180);
  };

  return (
    <div className="mt-8">
      {/* 1mg Circular "Shop by Health Concerns" Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat, index) => {
          const href = `/catalog?category=${encodeURIComponent(cat.name)}`;
          const guideSlug = insightMap[cat.name];
          const isSelected = selectedCat === cat.name;

          return (
            <div
              key={cat.name}
              data-cat-card={cat.name}
              className={`group relative flex flex-col items-center rounded-2xl border border-sky-100 bg-white p-4 text-center shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/5 ${
                isSelected ? "border-sky-500 ring-2 ring-sky-300" : ""
              }`}
            >
              <Link
                href={href}
                onClick={(e) => handleCardClick(e, href, cat.name)}
                className="flex flex-col items-center w-full"
              >
                {/* Circular Icon Container */}
                <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 via-sky-50 to-white text-sky-600 shadow-xs ring-4 ring-white group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                  {categoryIcon(cat.name)}
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white group-hover:bg-sky-600 group-hover:ring-2 group-hover:ring-white">
                    {cat.count}
                  </span>
                </div>

                {/* Category Name */}
                <h3 className="line-clamp-2 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {cat.name}
                </h3>

                <p className="mt-1 text-[11px] font-medium text-slate-500">
                  {cat.count} {cat.count === 1 ? "Product" : "Products"}
                </p>
              </Link>

              {guideSlug && (
                <Link
                  href={`/insights/${guideSlug}`}
                  className="mt-2.5 inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700 transition hover:bg-sky-100 hover:text-sky-900"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Export Guide</span>
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function categoryIcon(name: string): ReactNode {
  const key = name.toLowerCase();
  if (key.includes("ed medicine") || key.includes("erectile"))
    return <HeartPulseIcon />;
  if (key.includes("pain")) return <BoltIcon />;
  if (key.includes("steroid")) return <FlaskIcon />;
  if (key.includes("cancer")) return <ShieldIcon />;
  if (key.includes("diabet")) return <DropletIcon />;
  if (key.includes("antiviral") || key.includes("hiv")) return <VirusIcon />;
  if (key.includes("antibiotic") || key.includes("parasitic"))
    return <CapsuleIcon />;
  if (key.includes("anxiety") || key.includes("sleep")) return <MoonIcon />;
  if (key.includes("hypertens") || key.includes("cardiac"))
    return <ActivityIcon />;
  if (key.includes("weight")) return <ScaleIcon />;
  if (key.includes("skin")) return <SparkIcon />;
  if (key.includes("fertility") || key.includes("growth"))
    return <LeafIcon />;
  if (key.includes("thyroid")) return <AtomIcon />;
  if (key.includes("emetic")) return <WaveIcon />;
  return <PillIcon />;
}

function iconProps(children: ReactNode) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 transition-colors" aria-hidden>
      {children}
    </svg>
  );
}

function HeartPulseIcon() {
  return iconProps(
    <>
      <path
        d="M19.5 12.5c1.5-1.6 1.5-4.2-.2-5.8a3.9 3.9 0 00-5.3.3L12 9l-1.9-2a3.9 3.9 0 00-5.4-.2c-1.7 1.6-1.7 4.2-.1 5.8L12 20l7.5-7.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 13h3l2-3 2.5 5 2-3h3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

function BoltIcon() {
  return iconProps(
    <path
      d="M13 2L5 14h6l-1 8 9-13h-6l0-7z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

function FlaskIcon() {
  return iconProps(
    <path
      d="M9 3h6M10 3v5.2L5.8 18a2.8 2.8 0 002.5 4h7.4a2.8 2.8 0 002.5-4L14 8.2V3M8.5 14h7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function ShieldIcon() {
  return iconProps(
    <path
      d="M12 3l8 3.5v5.2c0 5-3.4 8.5-8 9.8-4.6-1.3-8-4.8-8-9.8V6.5L12 3z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

function DropletIcon() {
  return iconProps(
    <path
      d="M12 3s6 6.2 6 11a6 6 0 11-12 0c0-4.8 6-11 6-11z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

function VirusIcon() {
  return iconProps(
    <>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  );
}

function CapsuleIcon() {
  return iconProps(
    <path
      d="M8.5 15.5l7-7a3.5 3.5 0 015 5l-7 7a3.5 3.5 0 01-5-5zM10.2 10.2l3.6 3.6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

function MoonIcon() {
  return iconProps(
    <path
      d="M19 14.5A7.5 7.5 0 119.5 5a6 6 0 009.5 9.5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

function ActivityIcon() {
  return iconProps(
    <path
      d="M3 12h4l2.5-6 4 12L16 9h5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function ScaleIcon() {
  return iconProps(
    <path
      d="M12 4v16M7 8h10M6 8l-3 5a3 3 0 006 0L6 8zm12 0l-3 5a3 3 0 006 0l-3-5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function SparkIcon() {
  return iconProps(
    <path
      d="M12 3l1.2 5.2L18 9l-4 3.2L15.2 18 12 14.8 8.8 18 10 12.2 6 9l4.8-.8L12 3z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

function LeafIcon() {
  return iconProps(
    <path
      d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14zM5 19c4-4 7-7 10-10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function AtomIcon() {
  return iconProps(
    <>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(-60 12 12)"
      />
    </>
  );
}

function WaveIcon() {
  return iconProps(
    <path
      d="M3 14c2-3 4-3 6 0s4 3 6 0 4-3 6 0M3 9c2-3 4-3 6 0s4 3 6 0 4-3 6 0"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  );
}

function PillIcon() {
  return iconProps(
    <path
      d="M10 4h4a2 2 0 012 2v4H8V6a2 2 0 012-2zM8 10h8v8a2 2 0 01-2 2h-4a2 2 0 01-2-2v-8z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  );
}

"use client";

import Link from "next/link";
import type { ParentCategoryInfo } from "@/lib/medicines";
import type { Medicine } from "@/types/medicine";
import CategoryGrid from "./CategoryGrid";
import FeaturedCarousel from "./FeaturedCarousel";
import TrustBand from "./TrustBand";

type HomeSectionsProps = {
  categories: ParentCategoryInfo[];
  featured: Medicine[];
  total: number;
  insightCount: number;
};

const TOP_MANUFACTURERS = [
  { name: "Cipla", subtitle: "Respiratory & Anti-infectives", origin: "Mumbai, India" },
  { name: "Sun Pharma", subtitle: "Specialty & Chronic Care", origin: "Vadodara, India" },
  { name: "Dr. Reddy's", subtitle: "Generics & Oncology", origin: "Hyderabad, India" },
  { name: "Torrent Pharma", subtitle: "Cardiovascular & CNS", origin: "Ahmedabad, India" },
  { name: "Lupin", subtitle: "Anti-TB & Pediatrics", origin: "Mumbai, India" },
  { name: "Zydus", subtitle: "Vaccines & Therapeutics", origin: "Ahmedabad, India" },
  { name: "Abbott", subtitle: "Nutrition & Hospital Care", origin: "Mumbai / US" },
  { name: "Alkem Labs", subtitle: "Anti-infectives & Gastro", origin: "Mumbai, India" },
  { name: "Glenmark", subtitle: "Dermatology & Respiratory", origin: "Mumbai, India" },
  { name: "Mankind", subtitle: "Affordable Formulations", origin: "New Delhi, India" },
  { name: "Intas Pharma", subtitle: "Biosimilars & Oncology", origin: "Ahmedabad, India" },
  { name: "Macleods", subtitle: "Anti-retroviral & Anti-TB", origin: "Mumbai, India" },
];

export default function HomeSections({
  categories,
  featured,
  total,
  insightCount,
}: HomeSectionsProps) {
  return (
    <>
      {/* SECTION 1: 1mg-Style Shop by Health Concerns */}
      <section
        id="categories"
        className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-brand-light px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-brand">
                Therapeutic Areas
              </span>
              <span className="text-xs text-slate-500 font-medium">
                · {total} Active Products
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
              Shop by Health Concerns
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Browse top pharmaceutical formulations categorized by medical use and dosage form.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:border-brand hover:text-brand hover:bg-brand-light/30 transition-colors"
          >
            <span>See All Categories</span>
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <CategoryGrid categories={categories} />
      </section>

      {/* SECTION 2: 1mg-Style Featured Products Carousel */}
      <section className="border-y border-slate-200/80 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Trending in Export
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  · High-Demand Batches
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
                Top Selling Wholesale Medicines
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Popular international formulations with verified COA, export packaging, and fast dispatch.
              </p>
            </div>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-1 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-hover transition-colors"
            >
              <span>Explore All {total} Medicines</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <FeaturedCarousel medicines={featured} />
        </div>
      </section>

      {/* SECTION 3: 1mg Top Pharmaceutical Manufacturers */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/80 pb-4">
          <div>
            <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-700">
              Verified Supply Network
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
              Top Pharmaceutical Brands &amp; Manufacturers
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              We source directly from licensed, WHO-GMP certified Indian pharma corporations.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {TOP_MANUFACTURERS.map((m) => (
            <Link
              key={m.name}
              href={`/catalog?q=${encodeURIComponent(m.name)}`}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs hover:border-brand/40 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 font-extrabold text-xs text-slate-700 group-hover:bg-brand-light group-hover:text-brand transition-colors">
                  {m.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {m.origin}
                </span>
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors">
                  {m.name}
                </h4>
                <p className="line-clamp-1 text-[11px] text-slate-500">
                  {m.subtitle}
                </p>
              </div>
              <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] font-semibold text-brand">
                <span>View Products</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: 1mg Trust & Guarantees Band */}
      <TrustBand />

      {/* SECTION 5: Category Insights / Trade Guides */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/80 pb-4">
          <div>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-blue-700">
              Knowledge Base
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
              Export Insights &amp; Market Guides
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Comprehensive regulatory, dosage form, and wholesale trade documentation for international importers.
            </p>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:border-brand hover:text-brand hover:bg-brand-light/30 transition-colors"
          >
            <span>Read All {insightCount} Guides</span>
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import CatalogBrowser from "@/components/CatalogBrowser";
import {
  getAllMedicines,
  getParentCategories,
  getCategories,
} from "@/lib/medicines";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse Faith Health Care's pharmaceutical catalog — filter by category and dosage form, then enquire on WhatsApp.",
};

type CatalogPageProps = {
  searchParams?: { category?: string; form?: string; q?: string };
};

const CATEGORY_ALIASES: Record<string, string> = {
  "pain relief": "Pain Killers",
  "pain killer": "Pain Killers",
  "pain killers": "Pain Killers",
  "cancer care": "Anti Cancer",
  "anti cancer": "Anti Cancer",
  "cancer": "Anti Cancer",
  "skin care": "Skin Care",
  "dermatology": "Skin Care",
  "ed & men's health": "ED Medicines",
  "ed medicines": "ED Medicines",
  "cardiac & bp": "Cardiac",
  "cardiac": "Cardiac",
  "heart": "Cardiac",
  "diabetes": "Anti Diabetics",
  "anti diabetics": "Anti Diabetics",
  "sleeping": "Sleeping Pills",
  "sleeping pills": "Sleeping Pills",
};

function resolveParentCategory(rawCat: string | undefined, available: string[]): string {
  if (!rawCat) return "All";
  const decoded = decodeURIComponent(rawCat).trim();
  
  // Direct match
  const exact = available.find((c) => c.toLowerCase() === decoded.toLowerCase());
  if (exact) return exact;

  // Alias match
  const mapped = CATEGORY_ALIASES[decoded.toLowerCase()];
  if (mapped && available.includes(mapped)) return mapped;

  return "All";
}

export default function CatalogPage({ searchParams }: CatalogPageProps) {
  const medicines = getAllMedicines();
  const parentCategories = getParentCategories();
  const forms = getCategories();

  const initialParent = resolveParentCategory(searchParams?.category, parentCategories);

  const initialSubcategory =
    searchParams?.form && forms.some((f) => f.toLowerCase() === searchParams.form?.toLowerCase())
      ? forms.find((f) => f.toLowerCase() === searchParams.form?.toLowerCase()) || "All"
      : "All";

  const initialQuery = searchParams?.q ? decodeURIComponent(searchParams.q).trim() : "";

  return (
    <div className="catalog-page mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="catalog-hero max-w-3xl mb-4">
        <span className="inline-flex items-center rounded-md bg-brand-light px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-brand">
          Catalog &amp; Formulations
        </span>
        <h1 className="mt-1.5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Pharmaceutical Catalog
        </h1>
        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
          Browse verified Indian pharmaceutical formulations by therapeutic category or dosage form. Instant 1-tap WhatsApp wholesale export quotation on every product.
        </p>
      </header>

      <div className="mt-4">
        <CatalogBrowser
          medicines={medicines}
          parentCategories={parentCategories}
          initialParent={initialParent}
          initialSubcategory={initialSubcategory}
          initialQuery={initialQuery}
        />
      </div>
    </div>
  );
}

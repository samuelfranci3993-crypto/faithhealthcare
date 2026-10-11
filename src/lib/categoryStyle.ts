/** Shared color language + symbols for catalog / category UI */

export type AccentTone = {
  accent: string;
  wash: string;
  mist: string;
};

const TONES: AccentTone[] = [
  { accent: "#059669", wash: "rgba(5,150,105,0.12)", mist: "#ecfdf5" },
  { accent: "#0a192f", wash: "rgba(10,25,47,0.12)", mist: "#f1f5f9" },
  { accent: "#10b981", wash: "rgba(16,185,129,0.14)", mist: "#f0fdf4" },
  { accent: "#047857", wash: "rgba(4,120,87,0.12)", mist: "#e6f4ea" },
  { accent: "#0d9488", wash: "rgba(13,148,136,0.12)", mist: "#f0fdfa" },
  { accent: "#0369a1", wash: "rgba(3,105,161,0.12)", mist: "#f0f9ff" },
  { accent: "#059669", wash: "rgba(5,150,105,0.15)", mist: "#ecfdf5" },
  { accent: "#0f766e", wash: "rgba(15,118,110,0.12)", mist: "#f0fdfa" },
];

/** Stable dosage-form colors (not hashed) */
const FORM_TONES: Record<string, AccentTone> = {
  tablet: { accent: "#059669", wash: "rgba(5,150,105,0.12)", mist: "#ecfdf5" },
  capsule: { accent: "#0a192f", wash: "rgba(10,25,47,0.12)", mist: "#f1f5f9" },
  syringe: { accent: "#047857", wash: "rgba(4,120,87,0.12)", mist: "#e6f4ea" },
  tube: { accent: "#10b981", wash: "rgba(16,185,129,0.14)", mist: "#f0fdf4" },
  drop: { accent: "#0d9488", wash: "rgba(13,148,136,0.12)", mist: "#f0fdfa" },
  bottle: { accent: "#0369a1", wash: "rgba(3,105,161,0.12)", mist: "#f0f9ff" },
  inhaler: { accent: "#059669", wash: "rgba(5,150,105,0.12)", mist: "#ecfdf5" },
  jelly: { accent: "#0f766e", wash: "rgba(15,118,110,0.12)", mist: "#f0fdfa" },
};

export function toneForForm(form?: string | null): AccentTone {
  const glyph = dosageGlyph(form);
  return FORM_TONES[glyph] || TONES[0];
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function toneForCategory(name?: string | null): AccentTone {
  if (!name) return TONES[0];
  return TONES[hash(name) % TONES.length];
}

export function dosageGlyph(form?: string | null): string {
  const f = (form || "").toLowerCase();
  if (f.includes("inject")) return "syringe";
  if (f.includes("capsule")) return "capsule";
  if (f.includes("cream") || f.includes("gel")) return "tube";
  if (f.includes("drop")) return "drop";
  if (f.includes("syrup")) return "bottle";
  if (f.includes("inhal")) return "inhaler";
  if (f.includes("jelly")) return "jelly";
  return "tablet";
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Normalize strings for search: lowercase, remove diacritics, transliterate basic Cyrillic -> Latin
export function normalizeForSearch(s: string) {
  if (!s) return "";
  // lowercase
  let out = s.toLowerCase();
  // normalize and remove diacritics
  out = out.normalize("NFKD").replace(/\p{Diacritic}/gu, "");

  // Basic Cyrillic -> Latin transliteration map (covers common Russian/Uzbek Cyrillic letters)
  const map: Record<string, string> = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
    // Uzbek Cyrillic specifics
    'ғ':'g`','қ':'q','ў':'o`','ҳ':'h','ӣ':'i'
  };

  // Replace Cyrillic letters with Latin approximations
  out = out.replace(/./g, (ch) => map[ch] ?? ch);

  // remove anything not alphanumeric or space
  out = out.replace(/[^a-z0-9\s\-]/g, '');

  // collapse whitespace
  out = out.replace(/\s+/g, ' ').trim();
  return out;
}

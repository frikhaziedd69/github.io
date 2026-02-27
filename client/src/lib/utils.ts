import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Arabic numerals to English numerals
// This handles the case where users type with Arabic keyboard
export function normalizeArabicNumerals(input: string): string {
  const arabicToEnglish: Record<string, string> = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
  };

  return input.replace(/[٠-٩]/g, (digit) => arabicToEnglish[digit]);
}

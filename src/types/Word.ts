import { WordVariant } from "./WordVariant";

export interface Word {
  French: string;
  Arabic: string;
  LiteralArabic: string;
  Tags: string[];
  Details: string;
  Variants: WordVariant[];
}
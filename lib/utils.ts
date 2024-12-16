import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type ClassArray = ClassValue[];
type ClassDictionary = { [key: string]: any };
type ClassValue = string | number | boolean | ClassArray | ClassDictionary | null | undefined;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

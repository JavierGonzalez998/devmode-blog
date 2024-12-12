import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function replaceAccent(texto: string): string {
  const mapaTildes: { [key: string]: string } = {
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u',
      'Á': 'A',
      'É': 'E',
      'Í': 'I',
      'Ó': 'O',
      'Ú': 'U'
  };

  // Reemplazar vocales con tilde por vocales sin tilde
  return texto.replace(/[áéíóúÁÉÍÓÚ]/g, (letra) => mapaTildes[letra] || letra);
}
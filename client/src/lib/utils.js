import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Standard shadcn helper for combining class names.
// clsx handles conditional/array inputs; tailwind-merge resolves conflicts
// so e.g. cn('p-2', condition && 'p-4') becomes 'p-4' rather than both.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

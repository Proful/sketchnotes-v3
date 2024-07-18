import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hslToHex(h: number, s: number, l: number): string {
  // Convert HSL to RGB
  s /= 100
  l /= 100

  let c = (1 - Math.abs(2 * l - 1)) * s
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  let m = l - c / 2
  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  // Convert RGB to HEX
  const toHex = (n: number): string => {
    const hex = n.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function getTailwindRgbValue(tailwindClass: string): string {
  // Create a temporary element
  const tempElement = document.createElement("div")

  // Apply the Tailwind CSS class
  tempElement.className = tailwindClass

  // Append the element to the body (required to apply styles)
  document.body.appendChild(tempElement)

  // Get the computed styles of the element
  const computedStyle = getComputedStyle(tempElement)

  // Extract the background color value
  const backgroundColor = computedStyle.backgroundColor

  // Remove the temporary element from the document
  document.body.removeChild(tempElement)

  return backgroundColor
}

import { DEFAULT_TEXT_UNDERLINE_OFFSET } from "@/lib/constants"

import { useApplyStyleText } from "./useApplyStyleText"

export const useLexColor = () => {
  const { applyStyleText } = useApplyStyleText()

  const color = (value: string, cb?: (sel: boolean) => void) =>
    applyStyleText({ color: value }, cb)

  const decorationColor = (value: string) =>
    applyStyleText({
      "text-decoration-thickness": "2px",
      "text-decoration-color": value,
      "text-decoration": "underline",
      "text-underline-offset": DEFAULT_TEXT_UNDERLINE_OFFSET,
    })

  const backgroundColor = (value: string, cb?: (sel: boolean) => void) =>
    applyStyleText({ "background-color": value }, cb)

  const highlight = (value: string) => {
    if (value === "reset") {
      applyStyleText({
        "background-color": "transparent",
        color: "#ddeeff",
        padding: "0px",
        "border-radius": "0px",
      })
    } else {
      applyStyleText({
        "background-color": value,
        color: "#0a0300",
        padding: "4px",
        "border-radius": "5px",
      })
    }
  }

  const wavy = () => applyStyleText({ "text-decoration": "underline wavy" })

  return { color, decorationColor, backgroundColor, highlight, wavy }
}
//
// const addAlpha = (color: string) => {
//   const r = parseInt(color.substring(1, 3), 16)
//   const g = parseInt(color.substring(3, 5), 16)
//   const b = parseInt(color.substring(5, 7), 16)
//
//   return `rgba(${r},${g},${b},0.5)`
// }

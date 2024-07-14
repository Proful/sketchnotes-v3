import { useEffect } from "react"

import { Action } from "@/lib/types"

import { useLexBlockActions } from "./hooks/useLexBlockActions"
import { useLexCode } from "./hooks/useLexCode"
import { useLexColor } from "./hooks/useLexColor"
import { useLexInlineActions } from "./hooks/useLexInlineActions"
import { useLexKlass } from "./hooks/useLexKlass"

export default function LexToolbar({
  action,
  id,
  selectedId,
}: {
  action: Action | null
  id: number
  selectedId: number | null
}) {
  const { bold, italic, underline, strikethrough } = useLexInlineActions()
  const { h1, h2, h3, q } = useLexBlockActions()
  // const { highlight, color, decorationColor, backgroundColor } = useLexColor()
  const { addKlass } = useLexKlass()
  const { code, addCodeKlass } = useLexCode()

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) return
    if (action.name === "BOLD") {
      bold()
    } else if (action.name === "ITALIC") {
      italic()
    } else if (action.name === "UNDERLINE") {
      underline()
    } else if (action.name === "STRIKETHROUGH") {
      strikethrough()
    } else if (action.name === "H1") {
      h1()
    } else if (action.name === "H2") {
      h2()
    } else if (action.name === "H3") {
      h3()
    } else if (action.name === "QUOTE") {
      q()
    } else if (action.name === "CODE") {
      const lang = action.value as string
      code(lang)
    } else if (action.name === "COLOR") {
      addKlass(action.value! as string)
      // color(action.value! as string)
    } else if (action.name === "BACKGROUND-COLOR") {
      addKlass(action.value! as string)
      // backgroundColor(action.value! as string)
    } else if (action.name === "DECORATION-COLOR") {
      const decoration = `decoration-2 ${action.value} underline underline-offset-4`
      addKlass(decoration)
      // decorationColor(action.value! as string)
    } else if (action.name === "HIGHLIGHT") {
      let highlight = `bg-transparent text-white p-0 rounded-none`
      if (action.value) {
        highlight = `${action.value} text-black p-2 rounded`
      }
      addKlass(highlight)
      // highlight(action.value! as string)
    } else if (action.name === "TEXT-GRADIENT") {
      addKlass(`${action.value} bg-gradient-to-r bg-clip-text text-transparent`)
    } else if (action.name === "LEX-CODE-HIGHLIGHT") {
      addCodeKlass("bg-slate-600")
    }
  }, [action?.seed])
  return <></>
}

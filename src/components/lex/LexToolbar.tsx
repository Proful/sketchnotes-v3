import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $setBlocksType } from "@lexical/selection"
import {
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  RangeSelection,
} from "lexical"

import { Action } from "@/lib/types"
import {
  $createCodeNode,
  $isCodeHighlightNode,
} from "@/components/lex/nodes/lexical-code"

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
  const { highlight, color, decorationColor, backgroundColor } = useLexColor()
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
      color(action.value! as string)
    } else if (action.name === "BACKGROUND-COLOR") {
      backgroundColor(action.value! as string)
    } else if (action.name === "DECORATION-COLOR") {
      decorationColor(action.value! as string)
    } else if (action.name === "HIGHLIGHT") {
      highlight(action.value! as string)
    } else if (action.name === "TEXT-GRADIENT") {
      addKlass(`${action.value} bg-gradient-to-r bg-clip-text text-transparent`)
    } else if (action.name === "LEX-CODE-HIGHLIGHT") {
      addCodeKlass("bg-slate-600")
    }
  }, [action?.seed])
  return <></>
}
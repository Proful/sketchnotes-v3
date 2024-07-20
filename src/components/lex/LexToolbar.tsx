import { useEffect } from "react"

import useStore from "../Store"
import { useLexCode } from "./hooks/useLexCode"
import { useLexColor } from "./hooks/useLexColor"
import { useLexKlass } from "./hooks/useLexKlass"

export default function LexToolbar({ id }: { id: number }) {
  const { highlight, color, decorationColor, backgroundColor } = useLexColor()
  const { addKlass } = useLexKlass()
  const { code } = useLexCode()

  const selectedId = useStore((state) => state.selectedId)
  const lexes = useStore((state) => state.lexes)
  const selectedActionType = useStore((state) => state.selectedActionType)
  const seed = useStore((state) => state.seed)
  useEffect(() => {
    if (!selectedActionType || !seed) return
    if (id !== selectedId) return
    const lex = lexes[selectedId!]

    if (!selectedId || !lex) return
    if (selectedActionType === "codeLanguage") {
      code(lex.codeLanguage!)
    } else if (selectedActionType === "color") {
      color(lex.color!)
    } else if (selectedActionType === "backgroundColor") {
      backgroundColor(lex.backgroundColor!)
    } else if (selectedActionType === "decorationColor") {
      decorationColor(lex.decorationColor!)
    } else if (selectedActionType === "highlightColor") {
      highlight(lex.highlightColor!)
    } else if (selectedActionType === "textGradient") {
      addKlass(
        `${lex.textGradient!} bg-gradient-to-r bg-clip-text text-transparent`
      )
    }
  }, [seed])
  return <></>
}

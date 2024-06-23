import * as React from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $insertNodes, $isRangeSelection } from "lexical"

import { $createKlassNode } from "../nodes/lexical-klass"

export const useLexKlass = () => {
  const [editor] = useLexicalComposerContext()

  const addKlass = React.useCallback(
    (klass: string) => {
      editor.update(() => {
        const selection = $getSelection()
        if (
          $isRangeSelection(selection) &&
          selection.getTextContent().length > 0
        ) {
          const node = $createKlassNode(selection.getTextContent(), klass)
          $insertNodes([node])
        }
      })
    },
    [editor]
  )

  return { addKlass }
}

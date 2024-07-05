import * as React from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $setBlocksType } from "@lexical/selection"
import { $getSelection, $isRangeSelection, RangeSelection } from "lexical"

import {
  $createCodeNode,
  $isCodeHighlightNode,
} from "@/components/lex/nodes/lexical-code"

export const useLexCode = () => {
  const [editor] = useLexicalComposerContext()

  const code = React.useCallback(
    (lang: string) => {
      editor.update(() => {
        // selectAll(editor)
        let selection = $getSelection()

        if (!selection) {
          return
        }

        if ($isRangeSelection(selection)) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode(lang.toLowerCase()))
          } else {
            const textContent = selection.getTextContent()
            const codeNode = $createCodeNode(lang.toLowerCase())
            selection.insertNodes([codeNode])
            selection = $getSelection()
            if ($isRangeSelection(selection))
              selection.insertRawText(textContent)
          }
        }
      })
    },
    [editor]
  )

  const addCodeKlass = React.useCallback(
    (klass: string) => {
      editor.update(() => {
        const selection = $getSelection() as RangeSelection

        if (selection) {
          const startKey = selection.anchor.getNode()
          const endKey = selection.focus.getNode()

          const nodes = startKey.getNodesBetween(endKey)
          nodes.forEach((node) => {
            if ($isCodeHighlightNode(node)) {
              node.setHighlightClass(klass)
            }
          })
        }
      })
    },
    [editor]
  )

  return { code, addCodeKlass }
}

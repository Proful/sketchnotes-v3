import * as React from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  $setSelection,
} from "lexical"

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
          // Get the key of the new node
          const newNodeKey = node.getKey()

          // Create a new selection that selects the new node
          const newSelection = $createRangeSelection()
          newSelection.anchor.set(newNodeKey, 0, "element")
          newSelection.focus.set(
            newNodeKey,
            node.getTextContentSize(),
            "element"
          )

          // Apply the new selection
          $setSelection(newSelection)
        }
      })
    },
    [editor]
  )

  return { addKlass }
}

import * as React from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $patchStyleText } from "@lexical/selection"
import { $getSelection, $isRangeSelection, RangeSelection } from "lexical"

export const useApplyStyleText = () => {
  const [editor] = useLexicalComposerContext()

  const applyStyleText = React.useCallback(
    (styles: { [key: string]: string }, cb?: (sel: boolean) => void) => {
      editor.update(() => {
        const selection = $getSelection()
        let isSelected = false
        if (
          $isRangeSelection(selection) &&
          selection.getTextContent().length > 0
        ) {
          isSelected = true
          $patchStyleText(selection as RangeSelection, styles)
        }
        if (cb) cb(isSelected)
      })
    },
    [editor]
  )

  return { applyStyleText }
}

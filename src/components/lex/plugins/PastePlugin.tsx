import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  PASTE_COMMAND,
} from "lexical"

export default function PastePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const unregisterPaste = editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        const clipboardData = event.clipboardData
        if (!clipboardData) return false

        const text = clipboardData.getData("text/plain")

        if (text) {
          event.preventDefault()

          editor.update(() => {
            const root = $getRoot()
            const lines = text.split("\n")
            root.clear()

            lines.forEach((line, index) => {
              if (index > 0) {
                root.append($createParagraphNode())
              }
              root.append($createTextNode(line))
            })
          })
        }

        return true
      },
      0
    )

    return () => {
      unregisterPaste()
    }
  }, [editor])

  return null
}

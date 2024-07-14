import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { FORMAT_TEXT_COMMAND, TextFormatType } from "lexical"

export const useLexInlineActions = () => {
  const [editor] = useLexicalComposerContext()

  const formatTextCommand = (format: string) =>
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format as TextFormatType)

  const bold = () => formatTextCommand("bold")

  const italic = () => formatTextCommand("italic")

  const underline = () => formatTextCommand("underline")

  const strikethrough = () => {
    // formatTextCommand("strikethrough")
    console.log("strikethrough")
  }

  const highlight = () => formatTextCommand("highlight")

  return { bold, italic, underline, strikethrough, highlight }
}

// import { useEffect } from "react"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"

// import { useCursorPresence } from "./hooks/useCursorPresence"
// import {
//   CodeHighlightNode,
//   CodeNode,
// } from "@/components/lex/nodes/lexical-code"

import LexEditorTheme from "./LexEditorTheme"
import LexToolbar from "./LexToolbar"
// import { AnnotationNode } from "./nodes/lexical-annotation"
import { KlassNode } from "./nodes/lexical-klass"

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error)
}

export default function LexTextarea({
  id,
  onFocusChange,
}: {
  id: number
  onFocusChange: (isFocus: boolean) => void
}) {
  const initialConfig = {
    namespace: "LexEditorThemeA",
    theme: LexEditorTheme,
    nodes: [KlassNode, HeadingNode, QuoteNode],
    onError,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            onFocus={() => onFocusChange(true)}
            onBlur={() => onFocusChange(false)}
            spellCheck={false}
            className="caret-pink-400 p-2"
          />
        }
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />

      {/* <PastePlugin /> */}
      <LexToolbar id={id} />
    </LexicalComposer>
  )
}

import DevToolsPlugin from "@lexical-devtools/react"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"

import { Action } from "@/lib/types"
import {
  CodeHighlightNode,
  CodeNode,
} from "@/components/lex/nodes/lexical-code"

import LexEditorTheme from "./LexEditorTheme"
import LexToolbar from "./LexToolbar"
import { KlassNode } from "./nodes/lexical-klass"
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin"
import PastePlugin from "./plugins/PastePlugin"

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error)
}

export default function LexTextarea({
  action,
  id,
  selectedId,
}: {
  action: Action | null
  id: number
  selectedId: number | null
}) {
  const initialConfig = {
    namespace: "LexEditorTheme",
    theme: LexEditorTheme,
    nodes: [CodeNode, CodeHighlightNode, KlassNode, HeadingNode, QuoteNode],
    onError,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <CodeHighlightPlugin />
      <DevToolsPlugin />

      {/* <PastePlugin /> */}
      <LexToolbar action={action} id={id} selectedId={selectedId} />
    </LexicalComposer>
  )
}

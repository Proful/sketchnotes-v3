import DevToolsPlugin from "@lexical-devtools/react"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"

import {
  CodeHighlightNode,
  CodeNode,
} from "@/components/lex/nodes/lexical-code"

import LexEditorTheme from "./LexEditorTheme"
import LexToolbar from "./LexToolbar"
import { AnnotationNode } from "./nodes/lexical-annotation"
import { KlassNode } from "./nodes/lexical-klass"
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin"

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error)
}

export default function LexTextarea({ id }: { id: number }) {
  const initialConfig = {
    namespace: "LexEditorTheme",
    theme: LexEditorTheme,
    nodes: [
      CodeNode,
      CodeHighlightNode,
      KlassNode,
      HeadingNode,
      QuoteNode,
      AnnotationNode,
    ],
    onError,
  }

  return (
    // @ts-ignore
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable spellCheck={false} />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <CodeHighlightPlugin />
      <DevToolsPlugin />

      {/* <PastePlugin /> */}
      <LexToolbar id={id} />
    </LexicalComposer>
  )
}

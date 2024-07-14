import React, { useEffect, useState } from "react"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import {
  AnnotationHandler,
  highlight,
  HighlightedCode,
  InlineAnnotation,
  InnerLine,
  Pre,
  RawCode,
} from "codehike/code"
import { $getRoot, EditorState } from "lexical"
import Draggable from "react-draggable"

import { Action, ContainerType } from "@/lib/types"
import LexEditorTheme from "@/components/lex/LexEditorTheme"

import ErrorBoundary from "../ErrorBoundary"
import HikeContainerTheme from "./HikeContainerTheme"

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error)
}

export default function HikeContainer({
  action,
  id,
  selectedId,
  onSelect,
}: {
  action: Action | null
  id: number
  selectedId: number | null
  onSelect: (id: number, containerType: ContainerType) => void
}) {
  const nodeRef = React.useRef(null)
  const [editorState, setEditorState] = useState<EditorState | null>(null)
  const [codeContent, setCodeContent] = useState<string | null>(null)
  const [togglePreview, setTogglePreview] = useState(false)

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) {
      return
    }
    if (action?.name === "HIKE-PREVIEW") {
      editorState!.read(() => {
        const root = $getRoot()
        const content = root.getTextContent()
        const upd = content
          .split("\n")
          .filter((l) => l.length !== 0)
          .join("\n")
        setCodeContent(upd)
        setTogglePreview(!togglePreview)
      })
    }
  }, [action?.seed])

  useEffect(() => {
    onSelect(id, "HIKE")
  }, [])

  const initialConfig = {
    namespace: "LexEditorTheme",
    theme: LexEditorTheme,
    nodes: [],
    onError,
  }

  const lexDisplay = togglePreview ? "none" : "block"
  const hikeDisplay = togglePreview ? "block" : "none"

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        onClick={(e) => {
          onSelect(id, "HIKE")
          e.stopPropagation()
        }}
        onDoubleClick={() => setTogglePreview(!togglePreview)}
      >
        <div
          className="w-fit p-2 absolute top-0 "
          style={{ display: lexDisplay }}
        >
          <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin onChange={setEditorState} />
          </LexicalComposer>
        </div>
        <div className="w-fit absolute top-0 " style={{ display: hikeDisplay }}>
          {codeContent && (
            <Code
              codeblock={{
                value: codeContent!,
                lang: "typescript",
                meta: "",
              }}
            />
          )}
        </div>
      </div>
    </Draggable>
  )
}

function Code({ codeblock }: { codeblock: RawCode }) {
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null)

  useEffect(() => {
    const highlightCode = async () => {
      let highlightedCode = null
      try {
        highlightedCode = await highlight(codeblock, "github-dark")
      } catch (error) {
        console.log(error)
      }
      setHighlighted(highlightedCode)
    }

    highlightCode()
  }, [codeblock])

  if (!highlighted) {
    return null
  }

  return (
    <ErrorBoundary fallback={<h1>Oops! There was an error.</h1>}>
      <HikeContainerTheme>
        <Pre
          className="m-0 py-8 leading-loose rounded-lg bg-hike"
          code={highlighted!}
          handlers={[borderHandler, neonHandler, bgHandler, mark, callout]}
        />
      </HikeContainerTheme>
    </ErrorBoundary>
  )
}

const borderHandler: AnnotationHandler = {
  name: "border",
  Inline: ({ annotation, children }) => {
    const borderColor = annotation.query || "yellow"
    return <span style={{ border: "1px solid", borderColor }}>{children}</span>
  },
}
const bgHandler: AnnotationHandler = {
  name: "bg",
  Inline: ({ annotation, children }) => {
    //@ts-ignore
    const val =
      //@ts-ignore
      children?.props?.lineContent?.filter((l: any) => l?.value?.length > 0)[0]!
        .style?.color || "#7DD3FC"
    const background = `${val}1A`
    const padding = ".125rem 0.1875rem"
    return (
      <span className="rounded" style={{ background, padding }}>
        {children}
      </span>
    )
  },
}
const neonHandler: AnnotationHandler = {
  name: "neon",
  Inline: ({ annotation, children }) => {
    const background = annotation.query || "#2d26"
    const padding = ".125rem 0.1875rem"
    return (
      <span
        style={{ padding }}
        className="border-2 rounded border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
      >
        {children}
      </span>
    )
  },
}

// !mark(1:2)
const mark: AnnotationHandler = {
  name: "mark",
  AnnotatedLine: ({ annotation, ...props }) => (
    <InnerLine merge={props} data-mark={true} />
  ),
  Line: (props) => {
    //@ts-ignore
    const dataMark = !!props["data-mark"]
    const query = props.annotation?.query || "#3b82f6"
    return (
      <InnerLine
        merge={props}
        className={`px-8 border-l-4 border-transparent data-[mark]:border-blue-500 data-[mark]:bg-secondary`}
        style={{ borderColor: dataMark ? query : "" }}
      />
    )
  },
}

// !callout[/amet/] This is a callout
const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    }
  },
  Block: ({ annotation, children }) => {
    const { column } = annotation.data
    return (
      <>
        {children}
        <div
          style={{ minWidth: `${column + 4}ch` }}
          className="w-fit border border-blue-600 bg-hike border-current rounded px-2 relative -ml-[1ch] mt-1 whitespace-break-spaces"
        >
          <div
            style={{ left: `${column + 1}ch` }}
            className="absolute border-l border-t border-current border-blue-600 w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-hike"
          />
          {annotation.query}
        </div>
      </>
    )
  },
}

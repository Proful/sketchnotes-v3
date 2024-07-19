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
import {
  $getRoot,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  EditorState,
} from "lexical"
import Draggable from "react-draggable"

import { DEFAULT_CODE_LANGUAGE } from "@/lib/constants"
import { Action, ContainerType } from "@/lib/types"
import LexEditorTheme from "@/components/lex/LexEditorTheme"
import { AnnotationPlugin } from "@/components/lex/plugins/AnnotationPlugin"

import ErrorBoundary from "../ErrorBoundary"
import { AnnotationNode } from "../lex/nodes/lexical-annotation"

// import { CopyButton } from "./CopyButton"
// import HikeContainerTheme from "./HikeContainerTheme"

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
  const [lang, setLang] = useState(DEFAULT_CODE_LANGUAGE)

  const [selectionPosition, setSelectionPosition] = useState<{
    start: number
    end: number
  } | null>(null)
  useEffect(() => {
    if (!action) return
    if (id !== selectedId) {
      return
    }
    if (action?.name === "HIKE-PREVIEW") {
      setLang(action.value as string)
      editorState!.read(() => {
        const root = $getRoot()

        //!important
        //This took me lots of time to debug.
        //ParagraphNode inconsistently adding new line if used getTextContent
        const nodes = root.getChildren()
        let data = []
        for (const node of nodes) {
          if ($isParagraphNode(node)) {
            data.push(node.getTextContent())
          }
        }
        setCodeContent(data.join("\n"))
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
    nodes: [AnnotationNode],
    onError,
  }

  const lexDisplay = togglePreview ? "none" : "block"
  const hikeDisplay = togglePreview ? "block" : "none"
  const handleChange = (editorState: EditorState) => {
    setEditorState(editorState)
    editorState.read(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const anchorOffset = selection.anchor.offset
        const focusOffset = selection.focus.offset

        const start = Math.min(anchorOffset, focusOffset) + 1
        const end = Math.max(anchorOffset, focusOffset)

        setSelectionPosition({ start, end })
      } else {
        setSelectionPosition(null)
      }
    })
  }

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
          {selectionPosition && (
            <div>
              {selectionPosition.start}:{selectionPosition.end}
            </div>
          )}
          <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <AnnotationPlugin id={id} selectedId={selectedId} />
            <OnChangePlugin onChange={handleChange} />
          </LexicalComposer>
        </div>
        <div className="w-fit absolute top-0 " style={{ display: hikeDisplay }}>
          <div className="w-full h-full p-4 rounded-lg absolute z-10 left-10 hidden">
            <div className="flex space-x-2 rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          {codeContent && (
            <Code
              codeblock={{
                value: codeContent!,
                lang: lang.toLowerCase(),
                meta: "",
              }}
            />
          )}
        </div>
      </div>
    </Draggable>
  )
}

export function Code({ codeblock }: { codeblock: RawCode }) {
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
      {/* <HikeContainerTheme> */}
      <Pre
        className=" bg-hike rounded "
        code={highlighted!}
        handlers={[
          borderHandler,
          neonHandler,
          bgHandler,
          underline,
          mark,
          callout,
        ]}
      />
      {/* </HikeContainerTheme> */}
    </ErrorBoundary>
  )
}

//!border[1:7]
const borderHandler: AnnotationHandler = {
  name: "border",
  Inline: ({ annotation, children }) => {
    const borderColor = annotation.query || "yellow"
    return <span style={{ border: "1px solid", borderColor }}>{children}</span>
  },
}

//!bg[1:4]
const bgHandler: AnnotationHandler = {
  name: "bg",
  //@ts-ignore
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

//!decoration[1:4]
const underline: AnnotationHandler = {
  name: "underline",
  //@ts-ignore
  Inline: ({ annotation, children }) => {
    return (
      <span className="underline decoration-2 underline-offset-4 decoration-solid decoration-sky-500">
        {children}
      </span>
    )
  },
}

//!neon[1:4]
const neonHandler: AnnotationHandler = {
  name: "neon",
  //@ts-ignore
  Inline: ({ annotation, children }) => {
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
          style={{ minWidth: `${column}ch` }}
          className="w-fit border border-blue-600 bg-hike border-current rounded px-2 relative -ml-[1ch] mt-1 whitespace-break-spaces"
        >
          <div
            style={{ left: `${column + 4}ch` }}
            className="absolute border-l border-t border-current border-blue-600 w-2 h-2 rotate-45 -translate-y-1/2 -top-[1px] bg-hike"
          />
          {annotation.query}
        </div>
      </>
    )
  },
}

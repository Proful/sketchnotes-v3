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

import {
  DEFAULT_CODE_FONT,
  DEFAULT_CODE_LANGUAGE,
  DEFAULT_CODE_THEME,
} from "@/lib/constants"
import LexEditorTheme from "@/components/lex/LexEditorTheme"
import { AnnotationPlugin } from "@/components/lex/plugins/AnnotationPlugin"

import ErrorBoundary from "../ErrorBoundary"
import { AnnotationNode } from "../lex/nodes/lexical-annotation"
// import Move from "../Move"
import useStore from "../Store"

// import { CopyButton } from "./CopyButton"
// import HikeContainerTheme from "./HikeContainerTheme"

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error)
}

export default function HikeContainer({ id }: { id: number }) {
  const [disableDrag, setDisableDrag] = useState(false)
  const nodeRef = React.useRef(null)
  const [editorState, setEditorState] = useState<EditorState | null>(null)
  const [codeContent, setCodeContent] = useState<string | null>(null)
  const [togglePreview, setTogglePreview] = useState(false)
  const [lang, setLang] = useState(DEFAULT_CODE_LANGUAGE)

  const [selectionPosition, setSelectionPosition] = useState<{
    start: number
    end: number
  } | null>(null)

  const selectedId = useStore((state) => state.selectedId)
  const hikes = useStore((state) => state.hikes)
  const selectedActionType = useStore((state) => state.selectedActionType)
  const seed = useStore((state) => state.seed)
  const setSelectedId = useStore((state) => state.setSelectedId)
  const setSelectedContainerType = useStore(
    (state) => state.setSelectedContainerType
  )

  useEffect(() => {
    if (!selectedActionType || !seed || !selectedId) return
    if (id !== selectedId) return
    const hike = hikes[selectedId!]

    if (!hike) return
    if (id !== selectedId) {
      return
    }
    if (selectedActionType === "preview") {
      setLang(hike.codeLanguage!)
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
  }, [seed])

  useEffect(() => {
    setSelectedContainerType("HIKE")
    setSelectedId(id)
  }, [])

  const [_target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (id === selectedId) {
      if (nodeRef?.current) {
        setTarget(nodeRef?.current)
      }
    } else {
      setTarget(null)
    }
  }, [selectedId])

  const initialConfig = {
    namespace: "LexEditorTheme",
    theme: LexEditorTheme,
    nodes: [AnnotationNode],
    onError,
  }

  const hike = hikes[id!]

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

  const isSelected = selectedId === id
  const style = {
    outlineWidth: isSelected ? "5px" : "none",
    outlineColor: isSelected ? "-webkit-focus-ring-color" : "none",
    outlineStyle: isSelected ? "auto" : "none",
  }

  return (
    <Draggable nodeRef={nodeRef} disabled={disableDrag}>
      <div
        ref={nodeRef}
        onClick={(e) => {
          setSelectedContainerType("HIKE")
          setSelectedId(id)
          e.stopPropagation()
        }}
        onDoubleClick={() => setTogglePreview(!togglePreview)}
        className="w-fit h-fit -z-10 relative hover:border-blue-300"
        style={style}
      >
        <div
          className="min-w-[400px] p-2 absolute top-0 "
          style={{ display: lexDisplay }}
        >
          {selectionPosition && (
            <div>
              {selectionPosition.start}:{selectionPosition.end}
            </div>
          )}
          <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  onFocus={() => setDisableDrag(true)}
                  onBlur={() => setDisableDrag(false)}
                  spellCheck={false}
                  className="caret-pink-400 p-2"
                />
              }
              placeholder={<div>Enter some text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <AnnotationPlugin id={id} selectedId={selectedId} />
            <OnChangePlugin onChange={handleChange} />
          </LexicalComposer>
        </div>
        <div style={{ display: hikeDisplay }}>
          <div
            className={`inline-block bg-gradient-to-r ${hike.gradient}`}
            style={{ padding: hike.outerPadding + "px" }}
          >
            <CodeContainer codeContent={codeContent!} lang={lang} id={id} />
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export function CodeContainer({
  codeContent,
  lang,
  id,
}: {
  codeContent: string
  lang: string
  id: number
}) {
  const hikes = useStore((state) => state.hikes)
  const hike = hikes[id]

  const style = {
    padding: hike?.padding + "px",
  }
  return (
    <div
      style={style}
      className={`inline-block ${hike?.backgroundColor || ""} ${hike?.borderRadius || ""} hover:outline hover:outline-blue-500`}
    >
      {/* <div className="w-full h-full p-4 rounded-lg absolute z-10 left-10 hidden"> */}
      {/*   <div className="flex space-x-2 rounded-lg"> */}
      {/*     <div className="w-3 h-3 bg-red-500 rounded-full"></div> */}
      {/*     <div className="w-3 h-3 bg-yellow-500 rounded-full"></div> */}
      {/*     <div className="w-3 h-3 bg-green-500 rounded-full"></div> */}
      {/*   </div> */}
      {/* </div> */}
      {codeContent && (
        <Code
          fontFamily={hike?.font}
          theme={hike?.theme || DEFAULT_CODE_THEME}
          codeblock={{
            value: codeContent!,
            lang: lang.toLowerCase(),
            meta: "",
          }}
        />
      )}
    </div>
  )
}

export function Code({
  codeblock,
  theme,
  fontFamily,
}: {
  codeblock: RawCode
  theme?: string
  fontFamily?: string
}) {
  const [highlighted, setHighlighted] = useState<HighlightedCode | null>(null)

  useEffect(() => {
    const highlightCode = async () => {
      let highlightedCode = null
      try {
        highlightedCode = await highlight(
          codeblock,
          (theme as any) || "github-dark"
        )
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
        style={{ fontFamily: fontFamily || DEFAULT_CODE_FONT }}
        code={highlighted!}
        handlers={[
          borderHandler,
          neonHandler,
          glowHandler,
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

//!glow[1:4]
const glowHandler: AnnotationHandler = {
  name: "glow",
  //@ts-ignore
  Inline: ({ annotation, children }) => {
    return (
      <span className="">
        <span className="absolute border bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text box-content font-extrabold text-transparent text-center select-none">
          {children}
        </span>
        <span className="relative top-0 bg-gradient-to-r from-blue-500 via-teal-500 to-pink-500 bg-clip-text font-extrabold text-transparent text-center select-auto">
          {children}
        </span>
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
        className={`border-l-4 border-transparent data-[mark]:border-blue-500 data-[mark]:bg-secondary`}
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

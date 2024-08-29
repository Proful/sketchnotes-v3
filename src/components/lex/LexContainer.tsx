import React, { useEffect, useState } from "react"
import Draggable from "react-draggable"

import useStore from "../Store"
import LexTextarea from "./LexTextarea"

function LexContainer({ id }: { id: number }) {
  const [disableDrag, setDisableDrag] = useState(false)
  const lexes = useStore((state) => state.lexes)
  const setSelectedId = useStore((state) => state.setSelectedId)
  const setSelectedContainerType = useStore(
    (state) => state.setSelectedContainerType
  )

  const nodeRef = React.useRef(null)
  const lex = lexes[id]
  if (!lex) {
    return
  }

  useEffect(() => {
    setSelectedContainerType("LEX")
    setSelectedId(id)
  }, [])

  let borderKey = "border"
  const dir = lex.borderDirection
  if (dir === "ALL") {
    borderKey = "border"
  } else if (dir === "TOP") {
    borderKey = "borderTop"
  } else if (dir === "BOTTOM") {
    borderKey = "borderBottom"
  } else if (dir === "LEFT") {
    borderKey = "borderLeft"
  } else if (dir === "RIGHT") {
    borderKey = "borderRight"
  }

  let borderCSS = {
    [`${borderKey}Width`]: `${lex.borderWidth}px`,
    [`${borderKey}Style`]: `${lex.borderStyle}`,
  }

  let { paddingTop, paddingBottom, paddingLeft, paddingRight } = lex || {}

  if (lex.padding) {
    paddingTop = lex.padding
    paddingBottom = lex.padding
    paddingLeft = lex.padding
    paddingRight = lex.padding
  }

  const style = {
    fontFamily: lex.fontFamily,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    ...borderCSS,
  }

  return (
    <Draggable nodeRef={nodeRef} disabled={disableDrag}>
      <div
        style={style}
        ref={nodeRef}
        className={` w-fit z-40 p-2 absolute top-0 text-${lex.fontSize} font-${lex.fontWeight} leading-${lex.lineHeight} ${lex.borderRadius} ${lex.boxShadow} ${lex.boxColor} ${lex.borderColor} selection:bg-gray-400/20 hover:outline-blue-500 hover:outline hover:outline-1`}
        onClick={(e) => {
          setSelectedContainerType("LEX")
          setSelectedId(id)
          e.stopPropagation()
        }}
        onResize={console.log}
      >
        <LexTextarea id={id} onFocusChange={setDisableDrag} />
      </div>
    </Draggable>
  )
}

export default LexContainer

import React, { useEffect } from "react"
import Draggable from "react-draggable"

import useStore from "../Store"
import LexTextarea from "./LexTextarea"

function LexContainer({ id }: { id: number }) {
  const lexes = useStore((state) => state.lexes)
  const setSelectedId = useStore((state) => state.setSelectedId)
  // const selectedId = useStore((state) => state.selectedId)
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

  const style = {
    fontFamily: lex.fontFamily,
    paddingTop: lex.paddingTop,
    paddingBottom: lex.paddingBottom,
    paddingLeft: lex.paddingLeft,
    paddingRight: lex.paddingRight,
    padding: lex.padding,
    // backgroundColor: lex.lexBackgroundColor,
    ...borderCSS,
  }

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        style={style}
        ref={nodeRef}
        className={`w-fit z-20 p-2 absolute top-0 text-${lex.fontSize} font-${lex.fontWeight} leading-${lex.lineHeight} ${lex.borderRadius} ${lex.boxShadow} ${lex.backgroundColor} ${lex.borderColor}`}
        onClick={(e) => {
          setSelectedContainerType("LEX")
          setSelectedId(id)
          e.stopPropagation()
        }}
      >
        <LexTextarea id={id} />
      </div>
    </Draggable>
  )
}

export default LexContainer

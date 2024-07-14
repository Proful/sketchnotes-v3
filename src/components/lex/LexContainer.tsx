import React, { useEffect, useState } from "react"
import Draggable from "react-draggable"

import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_DIRECTION,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_STYLE,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_BOX_SHADOW,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_LEX_PADDING,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_TAILWIND_COLOR,
} from "@/lib/constants"
import { Action, ContainerStyle, ContainerType } from "@/lib/types"

import LexTextarea from "./LexTextarea"

function LexContainer({
  id,
  selectedId,
  action,
  onSelect,
}: {
  id: number
  selectedId: number | null
  action: Action | null
  onSelect: (id: number, containerType: ContainerType) => void
}) {
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    fontSize: DEFAULT_FONT_SIZE,
    fontWeight: DEFAULT_FONT_WEIGHT,
    fontFamily: DEFAULT_FONT_FAMILY,
    lineHeight: DEFAULT_LINE_HEIGHT,
    borderWidth: DEFAULT_BORDER_WIDTH,
    borderRadius: DEFAULT_BORDER_RADIUS,
    borderStyle: DEFAULT_BORDER_STYLE,
    borderColor: DEFAULT_BORDER_COLOR,
    borderDirection: DEFAULT_BORDER_DIRECTION,
    paddingTop: DEFAULT_LEX_PADDING,
    paddingBottom: DEFAULT_LEX_PADDING,
    paddingLeft: DEFAULT_LEX_PADDING,
    paddingRight: DEFAULT_LEX_PADDING,
    padding: DEFAULT_LEX_PADDING,
    boxShadow: DEFAULT_BOX_SHADOW,
    lexBackgroundColor: DEFAULT_TAILWIND_COLOR,
  })
  const nodeRef = React.useRef(null)
  useEffect(() => {
    if (!action) return
    if (id !== selectedId) return
    if (action?.name === "FONT-SIZE") {
      setContainerStyle({
        ...containerStyle,
        fontSize: action.value! as string,
      })
    } else if (action?.name === "FONT-FAMILY") {
      setContainerStyle({
        ...containerStyle,
        fontFamily: action.value! as string,
      })
    } else if (action?.name === "FONT-WEIGHT") {
      setContainerStyle({
        ...containerStyle,
        fontWeight: action.value! as string,
      })
    } else if (action?.name === "LINE-HEIGHT") {
      setContainerStyle({
        ...containerStyle,
        lineHeight: action.value! as string,
      })
    } else if (action?.name === "BORDER-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        borderWidth: action.value! as number,
      })
    } else if (action?.name === "BORDER-RADIUS") {
      setContainerStyle({
        ...containerStyle,
        borderRadius: action.value! as string,
      })
    } else if (action?.name === "BORDER-STYLE") {
      setContainerStyle({
        ...containerStyle,
        borderStyle: action.value! as string,
      })
    } else if (action?.name === "BORDER-DIRECTION") {
      setContainerStyle({
        ...containerStyle,
        borderDirection: action.value! as
          | "ALL"
          | "TOP"
          | "BOTTOM"
          | "LEFT"
          | "RIGHT",
      })
    } else if (action?.name === "BORDER-COLOR") {
      console.log(action)
      setContainerStyle({
        ...containerStyle,
        borderColor: action.value! as string,
      })
    } else if (action?.name === "BOX-SHADOW") {
      setContainerStyle({
        ...containerStyle,
        boxShadow: action.value! as string,
      })
    } else if (action?.name === "LEX-PADDING-TOP") {
      setContainerStyle({
        ...containerStyle,
        paddingTop: action.value! as number,
      })
    } else if (action?.name === "LEX-PADDING-BOTTOM") {
      setContainerStyle({
        ...containerStyle,
        paddingBottom: action.value! as number,
      })
    } else if (action?.name === "LEX-PADDING-LEFT") {
      setContainerStyle({
        ...containerStyle,
        paddingLeft: action.value! as number,
      })
    } else if (action?.name === "LEX-PADDING-RIGHT") {
      setContainerStyle({
        ...containerStyle,
        paddingRight: action.value! as number,
      })
    } else if (action?.name === "LEX-PADDING") {
      setContainerStyle({
        ...containerStyle,
        padding: action.value! as number,
      })
    } else if (action?.name === "LEX-BACKGROUND-COLOR") {
      setContainerStyle({
        ...containerStyle,
        lexBackgroundColor: action.value! as string,
      })
    }
  }, [action?.seed])

  useEffect(() => {
    onSelect(id, "LEX")
  }, [])

  let borderKey = "border"
  const dir = containerStyle.borderDirection
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
    [`${borderKey}Width`]: `${containerStyle.borderWidth}px`,
    [`${borderKey}Style`]: `${containerStyle.borderStyle}`,
  }

  const style = {
    fontFamily: containerStyle.fontFamily,
    paddingTop: containerStyle.paddingTop,
    paddingBottom: containerStyle.paddingBottom,
    paddingLeft: containerStyle.paddingLeft,
    paddingRight: containerStyle.paddingRight,
    padding: containerStyle.padding,
    // backgroundColor: containerStyle.lexBackgroundColor,
    ...borderCSS,
  }

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        style={style}
        ref={nodeRef}
        className={`w-fit z-20 p-2 absolute top-0 text-${containerStyle.fontSize} font-${containerStyle.fontWeight} leading-${containerStyle.lineHeight} ${containerStyle.borderRadius} ${containerStyle.boxShadow} ${containerStyle.lexBackgroundColor} ${containerStyle.borderColor}`}
        onClick={(e) => {
          onSelect(id, "LEX")
          e.stopPropagation()
        }}
      >
        <LexTextarea action={action} id={id} selectedId={selectedId} />
      </div>
    </Draggable>
  )
}

export default LexContainer

import React, { useEffect, useState } from "react"
import Draggable from "react-draggable"

import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_STYLE,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
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
    fontFamily: DEFAULT_FONT_FAMILY,
    borderWidth: DEFAULT_BORDER_WIDTH,
    borderRadius: DEFAULT_BORDER_RADIUS,
    borderStyle: DEFAULT_BORDER_STYLE,
    borderColor: DEFAULT_BORDER_COLOR,
  })
  const nodeRef = React.useRef(null)
  useEffect(() => {
    if (!action) return
    if (id !== selectedId) return
    if (action?.name === "FONT-SIZE") {
      setContainerStyle({
        ...containerStyle,
        fontSize: action.value! as number,
      })
    } else if (action?.name === "FONT-FAMILY") {
      setContainerStyle({
        ...containerStyle,
        fontFamily: action.value! as string,
      })
    } else if (action?.name === "BORDER-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        borderWidth: action.value! as number,
      })
    } else if (action?.name === "BORDER-RADIUS") {
      setContainerStyle({
        ...containerStyle,
        borderRadius: action.value! as number,
      })
    } else if (action?.name === "BORDER-STYLE") {
      setContainerStyle({
        ...containerStyle,
        borderStyle: action.value! as string,
      })
    } else if (action?.name === "BORDER-COLOR") {
      setContainerStyle({
        ...containerStyle,
        borderColor: action.value! as string,
      })
    }
  }, [action?.seed])
  const style = {
    fontSize: containerStyle.fontSize,
    fontFamily: containerStyle.fontFamily,
    borderWidth: containerStyle.borderWidth,
    borderRadius: containerStyle.borderRadius,
    borderStyle: containerStyle.borderStyle,
    borderColor: containerStyle.borderColor,
  }
  return (
    <Draggable nodeRef={nodeRef}>
      <div
        style={style}
        ref={nodeRef}
        className="w-fit p-2 absolute top-0"
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

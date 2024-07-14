// eslint-disable-next-line import/no-namespace
import React, { useEffect, useState } from "react"
import * as Octicons from "@/vendor/octicons_react"
import Draggable from "react-draggable"

import {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_ROTATE,
  DEFAULT_ICON_SIZE,
} from "@/lib/constants"
import { Action, ContainerStyle, ContainerType } from "@/lib/types"

// eslint-disable-next-line no-unused-vars
const { ...iconsByName } = Octicons

export function IconContainer({
  name,
  id,
  selectedId,
  action,
  onSelect,
}: {
  name: string
  id: number
  selectedId: number | null
  action: Action | null
  onSelect: (id: number, containerType: ContainerType) => void
}) {
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    iconSize: DEFAULT_ICON_SIZE,
    iconColor: DEFAULT_ICON_COLOR,
    iconRotate: DEFAULT_ICON_ROTATE,
  })
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    if (id === selectedId) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [id, selectedId])

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) {
      return
    }
    if (action?.name === "ICON-SIZE") {
      setContainerStyle({
        ...containerStyle,
        iconSize: action.value! as number,
      })
    } else if (action.name === "COLOR") {
      setContainerStyle({
        ...containerStyle,
        iconColor: action.value! as string,
      })
    } else if (action.name === "ICON-ROTATE") {
      setContainerStyle({
        ...containerStyle,
        iconRotate: action.value! as number,
      })
    }
  }, [action?.seed])

  const nodeRef = React.useRef(null)
  //@ts-ignore
  const Icon = iconsByName[name]

  const style = {
    outlineWidth: isSelected ? "5px" : "none",
    outlineColor: isSelected ? "-webkit-focus-ring-color" : "none",
    outlineStyle: isSelected ? "auto" : "none",
  }
  return (
    <Draggable nodeRef={nodeRef} onStart={() => setIsSelected(true)}>
      <div
        ref={nodeRef}
        className="w-fit absolute top-0 z-10"
        onClick={(e) => {
          onSelect(id, "ICON")
          e.stopPropagation()
        }}
        style={style}
      >
        <Icon
          size={containerStyle.iconSize}
          className={containerStyle.iconColor}
          verticalAlign="middle"
          transform={`rotate(${containerStyle.iconRotate}deg)`}
        />
      </div>
    </Draggable>
  )
}

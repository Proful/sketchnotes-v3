// eslint-disable-next-line import/no-namespace
import React from "react"
import * as Octicons from "@/vendor/octicons_react"
import Draggable from "react-draggable"

import useStore from "../Store"

// eslint-disable-next-line no-unused-vars
const { ...iconsByName } = Octicons

export function IconContainer({ id }: { id: number }) {
  const icons = useStore((state) => state.icons)
  const setSelectedId = useStore((state) => state.setSelectedId)
  const selectedId = useStore((state) => state.selectedId)
  const setSelectedContainerType = useStore(
    (state) => state.setSelectedContainerType
  )

  const nodeRef = React.useRef(null)
  const icon = icons[id]
  if (!icon) {
    return
  }
  //@ts-ignore
  const Icon = iconsByName[icon.name]

  const isSelected = selectedId === id
  const style = {
    outlineWidth: isSelected ? "5px" : "none",
    outlineColor: isSelected ? "-webkit-focus-ring-color" : "none",
    outlineStyle: isSelected ? "auto" : "none",
  }

  const select = (e: any) => {
    setSelectedId(id)
    setSelectedContainerType("ICON")
    e.stopPropagation()
  }
  return (
    <Draggable nodeRef={nodeRef} onStart={select}>
      <div
        ref={nodeRef}
        className="w-fit absolute top-0 z-10"
        onClick={select}
        style={style}
      >
        <Icon
          size={icon.iconSize}
          className={icon.iconColor}
          verticalAlign="middle"
          transform={`rotate(${icon.iconRotate}deg)`}
        />
      </div>
    </Draggable>
  )
}

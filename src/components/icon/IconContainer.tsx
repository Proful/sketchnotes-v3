// eslint-disable-next-line import/no-namespace
import React, { useEffect, useState } from "react"
import * as Octicons from "@/vendor/octicons_react"

import Move from "../Move"
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
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (id === selectedId) {
      if (nodeRef?.current) {
        setTarget(nodeRef?.current)
      }
    } else {
      setTarget(null)
    }
  }, [selectedId])

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

  const handleSelect = (e: any) => {
    setSelectedId(id)
    setSelectedContainerType("ICON")
    e.stopPropagation()
  }
  return (
    <>
      <Move target={target!} />
      <div
        ref={nodeRef}
        className="w-fit absolute top-4 right-72 z-10"
        onClick={handleSelect}
        style={style}
      >
        <Icon
          size={icon.iconSize}
          className={icon.iconColor}
          verticalAlign="middle"
          transform={`scale(${icon.flipHorizontal ? -1 : 1},${icon.flipVertical ? -1 : 1})`}
        />
      </div>
    </>
  )
}

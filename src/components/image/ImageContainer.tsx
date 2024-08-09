import { useEffect, useRef, useState } from "react"

import Move from "../Move"
import useStore from "../Store"

export function ImageContainer({ id }: { id: number }) {
  const images = useStore((state) => state.images)
  const setSelectedId = useStore((state) => state.setSelectedId)
  const selectedId = useStore((state) => state.selectedId)
  const setSelectedContainerType = useStore(
    (state) => state.setSelectedContainerType
  )
  const image = images[id]
  if (!image) {
    return
  }
  const nodeRef = useRef(null)
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
  const isSelected = selectedId === id
  const style = {
    outlineWidth: isSelected ? "5px" : "none",
    outlineColor: isSelected ? "-webkit-focus-ring-color" : "none",
    outlineStyle: isSelected ? "auto" : "none",
  }

  const handleSelect = (e: any) => {
    setSelectedId(id)
    setSelectedContainerType("IMAGE")
    e.stopPropagation()
  }

  return (
    <>
      <Move target={target!} />
      <div
        ref={nodeRef}
        className="w-fit absolute top-64 z-10"
        onClick={handleSelect}
        style={style}
      >
        <img
          src={image.data}
          alt="Pasted content"
          className="max-w-[600px] h-auto w-fit"
        />
      </div>
    </>
  )
}

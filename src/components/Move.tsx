import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable"

import useStore from "./Store"

export default function Move({ target }: { target: HTMLElement }) {
  const updateIconProperty = useStore((state) => state.updateIconProperty)
  const selectedId = useStore((state) => state.selectedId)
  return (
    <Moveable
      target={target}
      container={null}
      origin={true}
      /* Resize event edges */
      edge={false}
      /* draggable */
      draggable={true}
      throttleDrag={0}
      onDrag={({ target, transform }: OnDrag) => {
        target!.style.transform = transform
      }}
      /* resizable*/
      keepRatio={true}
      /* Only one of resizable, scalable, warpable can be used. */
      resizable={true}
      throttleResize={0}
      onResize={({ target, width, height, delta }: OnResize) => {
        updateIconProperty(selectedId!, "iconSize", width)
        delta[0] && (target!.style.width = `${width}px`)
        delta[1] && (target!.style.height = `${height}px`)
      }}
      /* rotatable */
      rotatable={true}
      throttleRotate={0}
      onRotate={({ target, transform }: OnRotate) => {
        target!.style.transform = transform
      }}
    ></Moveable>
  )
}

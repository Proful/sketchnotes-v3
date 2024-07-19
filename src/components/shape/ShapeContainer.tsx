import { useEffect, useRef, useState } from "react"
import { getArrow } from "perfect-arrows"
import Draggable from "react-draggable"
import rough from "roughjs"

import useStore, { Shape } from "../Store"

export function ShapeContainer({ id }: { id: number }) {
  const shapes = useStore((state) => state.shapes)
  const setSelectedId = useStore((state) => state.setSelectedId)
  const selectedId = useStore((state) => state.selectedId)
  const setSelectedContainerType = useStore(
    (state) => state.setSelectedContainerType
  )
  const nodeRef = useRef(null)

  const shape = shapes[id]
  if (!shape) {
    return
  }

  const isSelected = selectedId === id
  const style = {
    outlineWidth: isSelected ? "5px" : "none",
    outlineColor: isSelected ? "-webkit-focus-ring-color" : "none",
    outlineStyle: isSelected ? "auto" : "none",
  }

  const innerStyle = {
    transform: `rotate(${shape.shapeRotate}deg)`,
  }
  let shapeComponent = <></>
  if (shape.name === "RECT") {
    shapeComponent = <Rect shape={shape} />
  } else if (shape.name.startsWith("ROUGH-")) {
    shapeComponent = <RoughShape shape={shape} />
  } else if (shape.name === "LINE") {
    shapeComponent = <Line shape={shape} />
  } else if (shape.name === "LINE-CIRCLE") {
    shapeComponent = <LineCircle shape={shape} />
  } else if (shape.name === "LINE-LINE") {
    shapeComponent = <LineLine shape={shape} />
  } else if (shape.name === "LINE-LINE-V2") {
    shapeComponent = <LineLineV2 shape={shape} />
  } else if (shape.name === "ARROW") {
    shapeComponent = <Arrow shape={shape} />
  }

  const select = (e: any) => {
    setSelectedId(id)
    setSelectedContainerType("SHAPE")
    e.stopPropagation()
  }

  return (
    <>
      <Draggable nodeRef={nodeRef} onStart={select}>
        <div
          ref={nodeRef}
          className="w-fit absolute top-20 z-10"
          onClick={select}
          style={style}
        >
          <div style={innerStyle}>{shapeComponent}</div>
        </div>
      </Draggable>
    </>
  )
}

export function Line({ shape }: { shape: Shape }) {
  return (
    <svg
      width={shape.lineWidth}
      height={shape.borderWidth! + 2}
      xmlns="http://www.w3.org/2000/svg"
      className={shape.borderColor}
    >
      <line
        strokeWidth={shape.borderWidth}
        x1={0}
        y1={1}
        x2={shape.lineWidth}
        y2={1}
      />
    </svg>
  )
}

export function LineCircle({ shape }: { shape: Shape }) {
  const r = 3
  return (
    <svg
      width={shape.lineWidth! + 4 * r}
      height={shape.borderWidth! + 40}
      xmlns="http://www.w3.org/2000/svg"
      className={`${shape.borderColor} ${shape.borderColor?.replace("stroke", "fill")}`}
    >
      <circle cx={5} cy={6} r={r} />
      <line
        strokeWidth={shape.borderWidth}
        x1={2 * r}
        y1={6}
        x2={shape.lineWidth}
        y2={6}
      />
      <circle cx={r + shape.lineWidth!} cy={6} r={r} />
    </svg>
  )
}
export function LineLine({ shape }: { shape: Shape }) {
  return (
    <svg
      width={shape.line2Width! + 4}
      height={shape.lineWidth! + 4}
      xmlns="http://www.w3.org/2000/svg"
      className={`${shape.borderColor}`}
    >
      <line
        strokeWidth={shape.borderWidth}
        x1={0}
        y1={1}
        x2={shape.line2Width}
        y2={1}
      />
      <line
        strokeWidth={shape.borderWidth}
        x1={shape.line2Width! / 2}
        y1={1}
        x2={shape.line2Width! / 2}
        y2={shape.lineWidth}
      />
    </svg>
  )
}
export function LineLineV2({ shape }: { shape: Shape }) {
  //line2Width: short line
  //lineWidth: long line
  const { lineWidth: lw, line2Width: l2w } = shape
  const points = {
    /*     (1,1)
     *          ┼
     *          l2w
     *          │
     *   (1,l2w)└───────lw─────── (lw,l2w)
     */
    "TOP-LEFT": [
      [1, 1, 1, l2w],
      [1, l2w, lw, l2w],
    ],
    "TOP-RIGHT": [
      [lw, 1, lw, l2w],
      [1, l2w, lw, l2w],
    ],
    "BOTTOM-LEFT": [
      [1, 1, 1, l2w],
      [1, 1, lw, 1],
    ],
    "BOTTOM-RIGHT": [
      [lw, 1, lw, l2w],
      [1, 1, lw, 1],
    ],
  }
  const DIRECTION = shape.line2Direction!

  return (
    <svg
      width={shape.lineWidth! + 4}
      height={shape.line2Width! + 4}
      xmlns="http://www.w3.org/2000/svg"
      className={`${shape.borderColor}`}
    >
      <line
        strokeWidth={shape.borderWidth}
        x1={points[DIRECTION][0][0]}
        y1={points[DIRECTION][0][1]}
        x2={points[DIRECTION][0][2]}
        y2={points[DIRECTION][0][3]}
      />
      <line
        strokeWidth={shape.borderWidth}
        x1={points[DIRECTION][1][0]}
        y1={points[DIRECTION][1][1]}
        x2={points[DIRECTION][1][2]}
        y2={points[DIRECTION][1][3]}
      />
    </svg>
  )
}

export function Rect({ shape }: { shape: Shape }) {
  return (
    <svg
      width={shape.rectWidth}
      height={shape.rectHeight}
      xmlns="http://www.w3.org/2000/svg"
      className={`${shape.borderColor} ${shape.shapeFill} ${shape.borderRadius}`}
    >
      <rect
        x="0"
        y="0"
        width={shape.rectWidth}
        height={shape.rectHeight}
        strokeWidth={shape.borderWidth}
      />
    </svg>
  )
}

export function Arrow({ shape }: { shape: Shape }) {
  const { arrowWidth: w, arrowHeight: h } = shape

  const arrow = getArrow(0, 0, w! - 50, h! - 50, {
    bow: shape.arrowBow,
    stretch: shape.arrowStretch,
    stretchMin: shape.arrowMinStretch,
    stretchMax: shape.arrowMaxStretch,
    padStart: shape.arrowPadStart,
    padEnd: shape.arrowPadEnd,
    flip: shape.arrowFlip,
    straights: shape.arrowStraights,
  })

  const [sx, sy, cx, cy, ex, ey, ae] = arrow
  const endAngleAsDegrees = ae * (180 / Math.PI)
  const aw = shape.arrowHeadSize

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: w, height: h }}
      className={`${shape.borderColor} ${shape.borderColor?.replace("stroke", "fill")}`}
      strokeWidth={shape.borderWidth}
    >
      <path d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`} fill="none" />
      <polygon
        points={`0,${-aw!} ${2 * aw!},0, 0,${aw!}`}
        transform={`translate(${ex},${ey}) rotate(${endAngleAsDegrees})`}
      />
    </svg>
  )
}
export function RoughShape({ shape }: { shape: Shape }) {
  const svgRef = useRef(null)

  useEffect(() => {
    console.log("shape changed")
    doit()
  }, [shape])

  function doit() {
    if (svgRef && svgRef.current) {
      const svg = svgRef.current! as SVGSVGElement

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild)
      }
      const rc = rough.svg(svg)
      let node
      const { rectWidth: w, rectHeight: h, name: shapeType } = shape
      if (!w || !h) return
      if (shapeType === "ROUGH-RECT") {
        node = rc.rectangle(0, 0, w!, h!, shape.roughOptions) // x, y, width, height
      } else if (shapeType === "ROUGH-CIRCLE") {
        const cx = w! / 2,
          cy = h! / 2,
          d = w! / 2
        node = rc.circle(cx, cy, d, shape.roughOptions)
      } else if (shapeType === "ROUGH-ELLIPSE") {
        const cx = w! / 2,
          cy = h! / 2
        node = rc.ellipse(cx, cy, w, h, shape.roughOptions)
      } else if (shapeType === "ROUGH-LINE") {
        node = rc.line(0, h / 2, w, h / 2, shape.roughOptions)
      }
      if (node) {
        svg.appendChild(node)
      }
    }
  }
  useEffect(() => {
    doit()
  }, [])

  return (
    <svg
      width={shape.rectWidth}
      height={shape.rectHeight}
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
    ></svg>
  )
}

export const ResizableRectangle: React.FC = () => {
  const [rectSize, setRectSize] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 30,
  })
  const svgRef = useRef<SVGSVGElement | null>(null)
  const resizingCorner = useRef<string | null>(null)

  const onMouseMove = (event: MouseEvent) => {
    if (svgRef.current && resizingCorner.current) {
      const rect = svgRef.current.getBoundingClientRect()
      const offsetX = event.clientX - rect.left
      const offsetY = event.clientY - rect.top

      switch (resizingCorner.current) {
        case "topLeft":
          setRectSize((prev) => ({
            width: prev.width + prev.x - offsetX,
            height: prev.height + prev.y - offsetY,
            x: offsetX,
            y: offsetY,
          }))
          break
        case "topRight":
          setRectSize((prev) => ({
            width: offsetX - prev.x,
            height: prev.height + prev.y - offsetY,
            x: prev.x,
            y: offsetY,
          }))
          break
        case "bottomLeft":
          setRectSize((prev) => ({
            width: prev.width + prev.x - offsetX,
            height: offsetY - prev.y,
            x: offsetX,
            y: prev.y,
          }))
          break
        case "bottomRight":
          setRectSize((prev) => ({
            width: offsetX - prev.x,
            height: offsetY - prev.y,
            x: prev.x,
            y: prev.y,
          }))
          break
      }
    }
  }

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
    resizingCorner.current = null
  }

  const onMouseDown = (corner: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    resizingCorner.current = corner
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      width={rectSize.width + 20}
      height={rectSize.height + 20}
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-white transparent"
    >
      <rect
        x={rectSize.x}
        y={rectSize.y}
        width={rectSize.width}
        height={rectSize.height}
        strokeWidth="1"
        stroke="black"
        fill="transparent"
      />
      <rect
        x={rectSize.x - 5}
        y={rectSize.y - 5}
        width="10"
        height="10"
        fill="blue"
        onMouseDown={onMouseDown("topLeft")}
      />
      <rect
        x={rectSize.x + rectSize.width - 5}
        y={rectSize.y - 5}
        width="10"
        height="10"
        fill="blue"
        onMouseDown={onMouseDown("topRight")}
      />
      <rect
        x={rectSize.x - 5}
        y={rectSize.y + rectSize.height - 5}
        width="10"
        height="10"
        fill="blue"
        onMouseDown={onMouseDown("bottomLeft")}
      />
      <rect
        x={rectSize.x + rectSize.width - 5}
        y={rectSize.y + rectSize.height - 5}
        width="10"
        height="10"
        fill="blue"
        onMouseDown={onMouseDown("bottomRight")}
      />
    </svg>
  )
}

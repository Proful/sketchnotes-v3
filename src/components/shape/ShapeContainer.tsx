import { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"

import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_LINE_WIDTH,
  DEFAULT_LINE2_WIDTH,
  DEFAULT_RECT_HEIGHT,
  DEFAULT_RECT_WIDTH,
  DEFAULT_SHAPE_FILL,
  DEFAULT_SHAPE_ROTATE,
} from "@/lib/constants"
import { Action, ContainerStyle, ContainerType, ShapeType } from "@/lib/types"

export function ShapeContainer({
  name,
  id,
  selectedId,
  action,
  onSelect,
}: {
  name: ShapeType
  id: number
  selectedId: number | null
  action: Action | null
  onSelect: (id: number, containerType: ContainerType) => void
}) {
  const nodeRef = useRef(null)
  const [isSelected, setIsSelected] = useState(false)
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    shapeRotate: DEFAULT_SHAPE_ROTATE,
  })

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
    if (action.name === "SHAPE-ROTATE") {
      setContainerStyle({
        ...containerStyle,
        shapeRotate: action.value as number,
      })
    }
  }, [action?.seed])
  const style = {
    outlineWidth: isSelected ? "5px" : "none",
    outlineColor: isSelected ? "-webkit-focus-ring-color" : "none",
    outlineStyle: isSelected ? "auto" : "none",
  }

  const innerStyle = {
    transform: `rotate(${containerStyle.shapeRotate}deg)`,
  }
  let shape = <></>
  if (name === "RECT") {
    shape = <Rect action={action} id={id} selectedId={selectedId} />
  } else if (name === "LINE") {
    shape = <Line action={action} id={id} selectedId={selectedId} />
  } else if (name === "LINE-CIRCLE") {
    shape = <LineCircle action={action} id={id} selectedId={selectedId} />
  } else if (name === "LINE-LINE") {
    shape = <LineLine action={action} id={id} selectedId={selectedId} />
  } else if (name === "LINE-LINE-V2") {
    shape = <LineLineV2 action={action} id={id} selectedId={selectedId} />
  }
  return (
    <>
      <Draggable nodeRef={nodeRef} onStart={() => setIsSelected(true)}>
        <div
          ref={nodeRef}
          className="w-fit absolute top-20 z-10"
          onClick={(e) => {
            onSelect(id, "SHAPE")
            e.stopPropagation()
          }}
          style={style}
        >
          <div style={innerStyle}>{shape}</div>
        </div>
      </Draggable>
    </>
  )
}

export function Line({
  id,
  selectedId,
  action,
}: {
  id: number
  selectedId: number | null
  action: Action | null
}) {
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    borderColor: DEFAULT_BORDER_COLOR,
    borderWidth: DEFAULT_BORDER_WIDTH,
    lineWidth: DEFAULT_LINE_WIDTH,
  })

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) return
    if (action.name === "BORDER-COLOR") {
      setContainerStyle({
        ...containerStyle,
        borderColor: action.value! as string,
      })
    } else if (action.name === "BORDER-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        borderWidth: action.value! as number,
      })
    } else if (action.name === "LINE-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        lineWidth: action.value! as number,
      })
    }
  }, [action?.seed])
  return (
    <svg
      width={containerStyle.lineWidth}
      height={containerStyle.borderWidth! + 2}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        strokeWidth={containerStyle.borderWidth}
        stroke={containerStyle.borderColor}
        x1={0}
        y1={1}
        x2={containerStyle.lineWidth}
        y2={1}
      />
    </svg>
  )
}

export function LineCircle({
  id,
  selectedId,
  action,
}: {
  id: number
  selectedId: number | null
  action: Action | null
}) {
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    borderColor: DEFAULT_BORDER_COLOR,
    borderWidth: DEFAULT_BORDER_WIDTH,
    lineWidth: DEFAULT_LINE_WIDTH,
  })

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) {
      return
    }
    if (action.name === "BORDER-COLOR") {
      setContainerStyle({
        ...containerStyle,
        borderColor: action.value! as string,
      })
    } else if (action.name === "BORDER-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        borderWidth: action.value! as number,
      })
    } else if (action.name === "LINE-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        lineWidth: action.value! as number,
      })
    }
  }, [action?.seed])
  const r = 3
  return (
    <svg
      width={containerStyle.lineWidth! + 4 * r}
      height={containerStyle.borderWidth! + 40}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={5} cy={6} r={r} fill={containerStyle.borderColor} />
      <line
        strokeWidth={containerStyle.borderWidth}
        stroke={containerStyle.borderColor}
        x1={2 * r}
        y1={6}
        x2={containerStyle.lineWidth}
        y2={6}
      />
      <circle
        cx={r + containerStyle.lineWidth!}
        cy={6}
        r={r}
        fill={containerStyle.borderColor}
      />
    </svg>
  )
}
export function LineLine({
  id,
  selectedId,
  action,
}: {
  id: number
  selectedId: number | null
  action: Action | null
}) {
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    borderColor: DEFAULT_BORDER_COLOR,
    borderWidth: DEFAULT_BORDER_WIDTH,
    lineWidth: DEFAULT_LINE_WIDTH,
    line2Width: DEFAULT_LINE2_WIDTH,
  })

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) {
      return
    }
    if (action.name === "BORDER-COLOR") {
      setContainerStyle({
        ...containerStyle,
        borderColor: action.value! as string,
      })
    } else if (action.name === "BORDER-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        borderWidth: action.value! as number,
      })
    } else if (action.name === "LINE-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        lineWidth: action.value! as number,
      })
    } else if (action.name === "LINE2-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        line2Width: action.value! as number,
      })
    }
  }, [action?.seed])
  return (
    <svg
      width={containerStyle.line2Width! + 4}
      height={containerStyle.lineWidth! + 4}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        strokeWidth={containerStyle.borderWidth}
        stroke={containerStyle.borderColor}
        x1={0}
        y1={1}
        x2={containerStyle.line2Width}
        y2={1}
      />
      <line
        strokeWidth={containerStyle.borderWidth}
        stroke={containerStyle.borderColor}
        x1={containerStyle.line2Width! / 2}
        y1={1}
        x2={containerStyle.line2Width! / 2}
        y2={containerStyle.lineWidth}
      />
    </svg>
  )
}
export function LineLineV2({
  id,
  selectedId,
  action,
}: {
  id: number
  selectedId: number | null
  action: Action | null
}) {
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    borderColor: DEFAULT_BORDER_COLOR,
    borderWidth: DEFAULT_BORDER_WIDTH,
    lineWidth: DEFAULT_LINE_WIDTH,
    line2Width: DEFAULT_LINE2_WIDTH,
  })

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) {
      return
    }
    if (action.name === "BORDER-COLOR") {
      setContainerStyle({
        ...containerStyle,
        borderColor: action.value! as string,
      })
    } else if (action.name === "BORDER-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        borderWidth: action.value! as number,
      })
    } else if (action.name === "LINE-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        lineWidth: action.value! as number,
      })
    } else if (action.name === "LINE2-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        line2Width: action.value! as number,
      })
    }
  }, [action?.seed])

  //line2Width: short line
  //lineWidth: long line
  const { lineWidth: lw, line2Width: l2w } = containerStyle
  const points = {
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
  const DIRECTION = "BOTTOM-LEFT"
  return (
    <svg
      width={containerStyle.lineWidth! + 4}
      height={containerStyle.line2Width! + 4}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        strokeWidth={containerStyle.borderWidth}
        stroke={containerStyle.borderColor}
        x1={points[DIRECTION][0][0]}
        y1={points[DIRECTION][0][1]}
        x2={points[DIRECTION][0][2]}
        y2={points[DIRECTION][0][3]}
      />
      <line
        strokeWidth={containerStyle.borderWidth}
        stroke={containerStyle.borderColor}
        x1={points[DIRECTION][1][0]}
        y1={points[DIRECTION][1][1]}
        x2={points[DIRECTION][1][2]}
        y2={points[DIRECTION][1][3]}
      />
    </svg>
  )
}

export function Rect({
  id,
  selectedId,
  action,
}: {
  id: number
  selectedId: number | null
  action: Action | null
}) {
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    borderColor: DEFAULT_BORDER_COLOR,
    borderWidth: DEFAULT_BORDER_WIDTH,
    borderRadius: DEFAULT_BORDER_RADIUS,
    rectWidth: DEFAULT_RECT_WIDTH,
    rectHeight: DEFAULT_RECT_HEIGHT,
    shapeFill: DEFAULT_SHAPE_FILL,
  })

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) return
    if (action.name === "BORDER-COLOR") {
      setContainerStyle({
        ...containerStyle,
        borderColor: action.value! as string,
      })
    } else if (action.name === "BORDER-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        borderWidth: action.value! as number,
      })
    } else if (action.name === "BORDER-RADIUS") {
      setContainerStyle({
        ...containerStyle,
        borderRadius: action.value! as number,
      })
    } else if (action.name === "RECT-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        rectWidth: action.value! as number,
      })
    } else if (action.name === "RECT-HEIGHT") {
      setContainerStyle({
        ...containerStyle,
        rectHeight: action.value! as number,
      })
    } else if (action.name === "SHAPE-FILL") {
      setContainerStyle({
        ...containerStyle,
        shapeFill: action.value! as string,
      })
    }
  }, [action?.seed])

  return (
    <svg
      width={containerStyle.rectWidth}
      height={containerStyle.rectHeight}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width={containerStyle.rectWidth}
        height={containerStyle.rectHeight}
        fill={
          containerStyle.shapeFill === "#000000"
            ? "transparent"
            : containerStyle.shapeFill
        }
        stroke={containerStyle?.borderColor}
        stroke-width={containerStyle.borderWidth}
        rx={containerStyle.borderRadius}
        ry={containerStyle.borderRadius}
      />
    </svg>
  )
}

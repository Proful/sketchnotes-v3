import { useEffect, useRef, useState } from "react"
import { getArrow } from "perfect-arrows"
import Draggable from "react-draggable"
import rough from "roughjs"

import {
  DEFAULT_ARROW_BOW,
  DEFAULT_ARROW_FLIP,
  DEFAULT_ARROW_HEAD_SIZE,
  DEFAULT_ARROW_HEIGHT,
  DEFAULT_ARROW_MAX_STRETCH,
  DEFAULT_ARROW_MIN_STRETCH,
  DEFAULT_ARROW_PAD_END,
  DEFAULT_ARROW_PAD_START,
  DEFAULT_ARROW_STRAIGHTS,
  DEFAULT_ARROW_STRETCH,
  DEFAULT_ARROW_WIDTH,
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_LINE_WIDTH,
  DEFAULT_LINE2_DIRECTION,
  DEFAULT_LINE2_WIDTH,
  DEFAULT_RECT_HEIGHT,
  DEFAULT_RECT_WIDTH,
  DEFAULT_ROUGH_OPTIONS,
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
  } else if (name.startsWith("ROUGH-")) {
    shape = (
      <RoughShape
        action={action}
        id={id}
        selectedId={selectedId}
        shapeType={name}
      />
    )
  } else if (name === "LINE") {
    shape = <Line action={action} id={id} selectedId={selectedId} />
  } else if (name === "LINE-CIRCLE") {
    shape = <LineCircle action={action} id={id} selectedId={selectedId} />
  } else if (name === "LINE-LINE") {
    shape = <LineLine action={action} id={id} selectedId={selectedId} />
  } else if (name === "LINE-LINE-V2") {
    shape = <LineLineV2 action={action} id={id} selectedId={selectedId} />
  } else if (name === "ARROW") {
    shape = <Arrow action={action} id={id} selectedId={selectedId} />
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
      className={containerStyle.borderColor}
    >
      <line
        strokeWidth={containerStyle.borderWidth}
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
      className={`${containerStyle.borderColor} ${containerStyle.borderColor?.replace("stroke", "fill")}`}
    >
      <circle cx={5} cy={6} r={r} />
      <line
        strokeWidth={containerStyle.borderWidth}
        x1={2 * r}
        y1={6}
        x2={containerStyle.lineWidth}
        y2={6}
      />
      <circle cx={r + containerStyle.lineWidth!} cy={6} r={r} />
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
      className={`${containerStyle.borderColor}`}
    >
      <line
        strokeWidth={containerStyle.borderWidth}
        x1={0}
        y1={1}
        x2={containerStyle.line2Width}
        y2={1}
      />
      <line
        strokeWidth={containerStyle.borderWidth}
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
    line2Direction: DEFAULT_LINE2_DIRECTION,
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
    } else if (action.name === "LINE2-DIRECTION") {
      setContainerStyle({
        ...containerStyle,
        line2Direction: action.value! as any,
      })
    }
  }, [action?.seed])

  //line2Width: short line
  //lineWidth: long line
  const { lineWidth: lw, line2Width: l2w } = containerStyle
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
  const DIRECTION = containerStyle.line2Direction!

  return (
    <svg
      width={containerStyle.lineWidth! + 4}
      height={containerStyle.line2Width! + 4}
      xmlns="http://www.w3.org/2000/svg"
      className={`${containerStyle.borderColor}`}
    >
      <line
        strokeWidth={containerStyle.borderWidth}
        x1={points[DIRECTION][0][0]}
        y1={points[DIRECTION][0][1]}
        x2={points[DIRECTION][0][2]}
        y2={points[DIRECTION][0][3]}
      />
      <line
        strokeWidth={containerStyle.borderWidth}
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
        borderRadius: action.value! as string,
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
      className={`${containerStyle.borderColor} ${containerStyle.shapeFill}`}
    >
      <rect
        x="0"
        y="0"
        width={containerStyle.rectWidth}
        height={containerStyle.rectHeight}
        stroke-width={containerStyle.borderWidth}
        rx={containerStyle.borderRadius}
        ry={containerStyle.borderRadius}
      />
    </svg>
  )
}

export function Arrow({
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
    shapeFill: DEFAULT_SHAPE_FILL,
    arrowHeadSize: DEFAULT_ARROW_HEAD_SIZE,
    arrowHeight: DEFAULT_ARROW_HEIGHT,
    arrowWidth: DEFAULT_ARROW_WIDTH,
    arrowBow: DEFAULT_ARROW_BOW,
    arrowStretch: DEFAULT_ARROW_STRETCH,
    arrowMinStretch: DEFAULT_ARROW_MIN_STRETCH,
    arrowMaxStretch: DEFAULT_ARROW_MAX_STRETCH,
    arrowPadStart: DEFAULT_ARROW_PAD_START,
    arrowPadEnd: DEFAULT_ARROW_PAD_END,
    arrowFlip: DEFAULT_ARROW_FLIP,
    arrowStraights: DEFAULT_ARROW_STRAIGHTS,
  })

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) return
    if (action.name === "ARROW-BOW") {
      setContainerStyle({
        ...containerStyle,
        arrowBow: action.value! as number,
      })
    } else if (action.name === "ARROW-HEAD-SIZE") {
      setContainerStyle({
        ...containerStyle,
        arrowHeadSize: action.value! as number,
      })
    } else if (action.name === "ARROW-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        arrowWidth: action.value! as number,
      })
    } else if (action.name === "ARROW-HEIGHT") {
      setContainerStyle({
        ...containerStyle,
        arrowHeight: action.value! as number,
      })
    } else if (action.name === "BORDER-COLOR") {
      setContainerStyle({
        ...containerStyle,
        borderColor: action.value! as string,
      })
    } else if (action.name === "BORDER-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        borderWidth: action.value! as number,
      })
    } else if (action.name === "ARROW-STRETCH") {
      setContainerStyle({
        ...containerStyle,
        arrowStretch: action.value! as number,
      })
    } else if (action.name === "SHAPE-FILL") {
      setContainerStyle({
        ...containerStyle,
        shapeFill: action.value! as string,
      })
    } else if (action.name === "ARROW-MIN-STRETCH") {
      setContainerStyle({
        ...containerStyle,
        arrowMinStretch: action.value! as number,
      })
    } else if (action.name === "ARROW-MAX-STRETCH") {
      setContainerStyle({
        ...containerStyle,
        arrowMaxStretch: action.value! as number,
      })
    } else if (action.name === "ARROW-PAD-START") {
      setContainerStyle({
        ...containerStyle,
        arrowPadStart: action.value! as number,
      })
    } else if (action.name === "ARROW-PAD-END") {
      setContainerStyle({
        ...containerStyle,
        arrowPadEnd: action.value! as number,
      })
    } else if (action.name === "ARROW-FLIP") {
      setContainerStyle({
        ...containerStyle,
        arrowFlip: action.value! as boolean,
      })
    } else if (action.name === "ARROW-STRAIGHTS") {
      setContainerStyle({
        ...containerStyle,
        arrowStraights: action.value! as boolean,
      })
    }
  }, [action?.seed])

  const { arrowWidth: w, arrowHeight: h } = containerStyle

  const arrow = getArrow(0, 0, w! - 50, h! - 50, {
    bow: containerStyle.arrowBow,
    stretch: containerStyle.arrowStretch,
    stretchMin: containerStyle.arrowMinStretch,
    stretchMax: containerStyle.arrowMaxStretch,
    padStart: containerStyle.arrowPadStart,
    padEnd: containerStyle.arrowPadEnd,
    flip: containerStyle.arrowFlip,
    straights: containerStyle.arrowStraights,
  })

  const [sx, sy, cx, cy, ex, ey, ae] = arrow
  const endAngleAsDegrees = ae * (180 / Math.PI)
  const aw = containerStyle.arrowHeadSize
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: w, height: h }}
      className={`${containerStyle.borderColor} ${containerStyle.shapeFill}`}
      strokeWidth={containerStyle.borderWidth}
    >
      <path d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`} fill="none" />
      <polygon
        points={`0,${-aw!} ${2 * aw!},0, 0,${aw!}`}
        transform={`translate(${ex},${ey}) rotate(${endAngleAsDegrees})`}
      />
    </svg>
  )
}
export function RoughShape({
  id,
  selectedId,
  shapeType,
  action,
}: {
  id: number
  selectedId: number | null
  shapeType: ShapeType
  action: Action | null
}) {
  const svgRef = useRef(null)
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    rectWidth: DEFAULT_RECT_WIDTH,
    rectHeight: DEFAULT_RECT_HEIGHT,
    roughOptions: DEFAULT_ROUGH_OPTIONS,
  })

  useEffect(() => {
    if (!action) return
    if (id !== selectedId) return
    if (action.name === "RECT-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        rectWidth: action.value! as number,
      })
    } else if (action.name === "RECT-HEIGHT") {
      setContainerStyle({
        ...containerStyle,
        rectHeight: action.value! as number,
      })
    } else if (action.name === "ROUGH-MAX-RANDOMNESS-OFFSET") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          maxRandomnessOffset: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-ROUGHNESS") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          roughness: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-BOWING") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          bowing: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-STROKE") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          stroke: action.value! as string,
        },
      })
    } else if (action.name === "ROUGH-STROKE-WIDTH") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          strokeWidth: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-CURVE-TIGHTNESS") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          curveTightness: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-CURVE-FITTING") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          curveFitting: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-CURVE-STEP-COUNT") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          curveStepCount: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-FILL") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          fill: action.value! as string,
        },
      })
    } else if (action.name === "ROUGH-FILL-STYLE") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          fillStyle: action.value! as string,
        },
      })
    } else if (action.name === "ROUGH-FILL-WEIGHT") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          fillWeight: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-HACHURE-ANGLE") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          hachureAngle: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-HACHURE-GAP") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          hachureGap: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-DASH-OFFSET") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          dashOffset: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-DASH-GAP") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          dashGap: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-ZIGZAG-OFFSET") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          zigzagOffset: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-SEED") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          seed: action.value! as number,
        },
      })
    } else if (action.name === "ROUGH-DISABLE-MULTI-STROKE") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          disableMultiStroke: action.value! as boolean,
        },
      })
    } else if (action.name === "ROUGH-DISABLE-MULTI-STROKE-FILL") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          disableMultiStrokeFill: action.value! as boolean,
        },
      })
    } else if (action.name === "ROUGH-PRESERVE-VERTICES") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          preserveVertices: action.value! as boolean,
        },
      })
    } else if (action.name === "ROUGH-FILL-SHAPE-ROUGHNESS-GAIN") {
      setContainerStyle({
        ...containerStyle,
        roughOptions: {
          ...containerStyle.roughOptions,
          fillShapeRoughnessGain: action.value! as number,
        },
      })
    }
  }, [action?.seed])

  useEffect(() => {
    console.log("containerStyle changed")
    doit()
  }, [containerStyle])

  function doit() {
    if (svgRef && svgRef.current) {
      const svg = svgRef.current! as SVGSVGElement

      while (svg.firstChild) {
        svg.removeChild(svg.firstChild)
      }
      const rc = rough.svg(svg)
      let node
      const { rectWidth: w, rectHeight: h } = containerStyle
      if (!w || !h) return
      if (shapeType === "ROUGH-RECT") {
        node = rc.rectangle(0, 0, w!, h!, containerStyle.roughOptions) // x, y, width, height
      } else if (shapeType === "ROUGH-CIRCLE") {
        const cx = w! / 2,
          cy = h! / 2,
          d = w! / 2
        node = rc.circle(cx, cy, d, containerStyle.roughOptions)
      } else if (shapeType === "ROUGH-ELLIPSE") {
        const cx = w! / 2,
          cy = h! / 2
        node = rc.ellipse(cx, cy, w, h, containerStyle.roughOptions)
      } else if (shapeType === "ROUGH-LINE") {
        node = rc.line(0, h / 2, w, h / 2, containerStyle.roughOptions)
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
      width={containerStyle.rectWidth}
      height={containerStyle.rectHeight}
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
    ></svg>
  )
}

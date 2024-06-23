import { useState } from "react"

import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_LINE_WIDTH,
  DEFAULT_LINE2_WIDTH,
  DEFAULT_RECT_HEIGHT,
  DEFAULT_RECT_WIDTH,
  DEFAULT_SHAPE_ROTATE,
} from "@/lib/constants"
import { Action, ShapeType } from "@/lib/types"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type ShapeOptionsProps = {
  shapeType: ShapeType
  onAction: (action: Action) => void
}
export default function ShapeOptions({
  shapeType,
  onAction,
}: ShapeOptionsProps) {
  if (shapeType === "RECT") {
    return <RectOptions onAction={onAction} />
  } else if (shapeType === "LINE") {
    return <LineOptions onAction={onAction} />
  } else if (shapeType === "LINE-CIRCLE") {
    return <LineCircleOptions onAction={onAction} />
  } else if (shapeType === "LINE-LINE") {
    return <LineLineOptions onAction={onAction} />
  } else if (shapeType === "LINE-LINE-V2") {
    return <LineLineV2Options onAction={onAction} />
  } else if (shapeType === "ELLIPSE") {
    return <EllipseOptions onAction={onAction} />
  } else if (shapeType === "POLYGON") {
    return <PolygonOptions onAction={onAction} />
  } else {
    return <></>
  }
}

type RectOptionsProps = {
  onAction: (action: Action) => void
}
function RectOptions({ onAction }: RectOptionsProps) {
  const [borderWidth, setBorderWidth] = useState(DEFAULT_BORDER_WIDTH)
  const [borderRadius, setBorderRadius] = useState(DEFAULT_BORDER_RADIUS)
  const [rectWidth, setRectWidth] = useState(DEFAULT_RECT_WIDTH)
  const [rectHeight, setRectHeight] = useState(DEFAULT_RECT_HEIGHT)
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  onChange={(e) => {
                    onAction({
                      name: "BORDER-COLOR",
                      seed: Math.random(),
                      value: e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  onChange={(e) => {
                    onAction({
                      name: "SHAPE-FILL",
                      seed: Math.random(),
                      value: e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Fill Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={borderWidth}
                  onChange={(e) => {
                    setBorderWidth(+e.target.value)
                    onAction({
                      name: "BORDER-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={borderRadius}
                  onChange={(e) => {
                    setBorderRadius(+e.target.value)
                    onAction({
                      name: "BORDER-RADIUS",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Radius</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={rectWidth}
                  onChange={(e) => {
                    setRectWidth(+e.target.value)
                    onAction({
                      name: "RECT-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Rect Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={rectHeight}
                  onChange={(e) => {
                    setRectHeight(+e.target.value)
                    onAction({
                      name: "RECT-HEIGHT",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Rect Height</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </>
  )
}
function LineOptions({ onAction }: { onAction: (action: Action) => void }) {
  const [borderWidth, setBorderWidth] = useState(DEFAULT_BORDER_WIDTH)
  const [lineWidth, setLineWidth] = useState(DEFAULT_LINE_WIDTH)
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  onChange={(e) => {
                    onAction({
                      name: "BORDER-COLOR",
                      seed: Math.random(),
                      value: e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={borderWidth}
                  onChange={(e) => {
                    setBorderWidth(+e.target.value)
                    onAction({
                      name: "BORDER-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={lineWidth}
                  onChange={(e) => {
                    setLineWidth(+e.target.value)
                    onAction({
                      name: "LINE-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Rect Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </>
  )
}
function LineCircleOptions({
  onAction,
}: {
  onAction: (action: Action) => void
}) {
  const [borderWidth, setBorderWidth] = useState(DEFAULT_BORDER_WIDTH)
  const [lineWidth, setLineWidth] = useState(DEFAULT_LINE_WIDTH)
  const [shapeRotate, setShapeRotate] = useState(DEFAULT_SHAPE_ROTATE)
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  onChange={(e) => {
                    onAction({
                      name: "BORDER-COLOR",
                      seed: Math.random(),
                      value: e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={borderWidth}
                  onChange={(e) => {
                    setBorderWidth(+e.target.value)
                    onAction({
                      name: "BORDER-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={lineWidth}
                  onChange={(e) => {
                    setLineWidth(+e.target.value)
                    onAction({
                      name: "LINE-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Line Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={shapeRotate}
                  onChange={(e) => {
                    setShapeRotate(+e.target.value)
                    onAction({
                      name: "SHAPE-ROTATE",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Shape Rotate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </>
  )
}
function LineLineOptions({ onAction }: { onAction: (action: Action) => void }) {
  const [borderWidth, setBorderWidth] = useState(DEFAULT_BORDER_WIDTH)
  const [lineWidth, setLineWidth] = useState(DEFAULT_LINE_WIDTH)
  const [line2Width, setLine2Width] = useState(DEFAULT_LINE2_WIDTH)
  const [shapeRotate, setShapeRotate] = useState(DEFAULT_SHAPE_ROTATE)
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  onChange={(e) => {
                    onAction({
                      name: "BORDER-COLOR",
                      seed: Math.random(),
                      value: e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={borderWidth}
                  onChange={(e) => {
                    setBorderWidth(+e.target.value)
                    onAction({
                      name: "BORDER-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={shapeRotate}
                  onChange={(e) => {
                    setShapeRotate(+e.target.value)
                    onAction({
                      name: "SHAPE-ROTATE",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Shape Rotate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={lineWidth}
                  onChange={(e) => {
                    setLineWidth(+e.target.value)
                    onAction({
                      name: "LINE-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Line Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={line2Width}
                  onChange={(e) => {
                    setLine2Width(+e.target.value)
                    onAction({
                      name: "LINE2-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Line2 Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </>
  )
}
function LineLineV2Options({
  onAction,
}: {
  onAction: (action: Action) => void
}) {
  const [borderWidth, setBorderWidth] = useState(DEFAULT_BORDER_WIDTH)
  const [lineWidth, setLineWidth] = useState(DEFAULT_LINE_WIDTH)
  const [line2Width, setLine2Width] = useState(DEFAULT_LINE2_WIDTH)
  const [shapeRotate, setShapeRotate] = useState(DEFAULT_SHAPE_ROTATE)
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  onChange={(e) => {
                    onAction({
                      name: "BORDER-COLOR",
                      seed: Math.random(),
                      value: e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={borderWidth}
                  onChange={(e) => {
                    setBorderWidth(+e.target.value)
                    onAction({
                      name: "BORDER-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={shapeRotate}
                  onChange={(e) => {
                    setShapeRotate(+e.target.value)
                    onAction({
                      name: "SHAPE-ROTATE",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Shape Rotate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={lineWidth}
                  onChange={(e) => {
                    setLineWidth(+e.target.value)
                    onAction({
                      name: "LINE-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Line Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={line2Width}
                  onChange={(e) => {
                    setLine2Width(+e.target.value)
                    onAction({
                      name: "LINE2-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Line2 Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </>
  )
}
//@ts-ignore
function EllipseOptions({ onAction }: { onAction: (action: Action) => void }) {
  return <></>
}
//@ts-ignore
function PolygonOptions({ onAction }: { onAction: (action: Action) => void }) {
  return <></>
}

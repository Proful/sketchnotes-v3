import { useState } from "react"

import {
  ALLOWED_LINE2_DIRECTION,
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
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_LINE_WIDTH,
  DEFAULT_LINE2_WIDTH,
  DEFAULT_RECT_HEIGHT,
  DEFAULT_RECT_WIDTH,
  DEFAULT_SHAPE_ROTATE,
} from "@/lib/constants"
import { Action, ShapeType } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import RoughjsOptions from "./RoughjsOptions"

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
  } else if (
    shapeType === "ROUGH-RECT" ||
    shapeType === "ROUGH-LINE" ||
    shapeType === "ROUGH-CIRCLE" ||
    shapeType === "ROUGH-ELLIPSE"
  ) {
    return <RoughRectOptions onAction={onAction} />
  } else if (shapeType === "LINE") {
    return <LineOptions onAction={onAction} />
  } else if (shapeType === "LINE-CIRCLE") {
    return <LineCircleOptions onAction={onAction} />
  } else if (shapeType === "LINE-LINE") {
    return <LineLineOptions onAction={onAction} />
  } else if (shapeType === "LINE-LINE-V2") {
    return <LineLineV2Options onAction={onAction} />
  } else if (shapeType === "ARROW") {
    return <ArrowOptions onAction={onAction} />
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
  const [borderRadius] = useState(DEFAULT_BORDER_RADIUS)
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
                    // setBorderRadius(+e.target.value)
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
function RoughRectOptions({ onAction }: RectOptionsProps) {
  const [rectWidth, setRectWidth] = useState(DEFAULT_RECT_WIDTH)
  const [rectHeight, setRectHeight] = useState(DEFAULT_RECT_HEIGHT)
  return (
    <>
      <ul>
        <RoughjsOptions onAction={onAction} />

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
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              onAction({
                name: "LINE2-DIRECTION",
                value: v,
                seed: Math.random(),
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Direction" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_LINE2_DIRECTION.map((dir) => (
                <SelectItem value={dir} key={dir}>
                  {dir}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>
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
function ArrowOptions({ onAction }: { onAction: (action: Action) => void }) {
  const [shapeRotate, setShapeRotate] = useState(DEFAULT_SHAPE_ROTATE)
  const [arrowHeadSize, setArrowHeadSize] = useState(DEFAULT_ARROW_HEAD_SIZE)
  const [arrowHeight, setArrowHeight] = useState(DEFAULT_ARROW_HEIGHT)
  const [arrowWidth, setArrowWidth] = useState(DEFAULT_ARROW_WIDTH)
  const [arrowBow, setArrowBow] = useState(DEFAULT_ARROW_BOW)
  const [arrowStretch, setArrowStretch] = useState(DEFAULT_ARROW_STRETCH)
  const [arrowMinStretch, setArrowMinStretch] = useState(
    DEFAULT_ARROW_MIN_STRETCH
  )
  const [arrowMaxStretch, setArrowMaxStretch] = useState(
    DEFAULT_ARROW_MAX_STRETCH
  )
  const [arrowPadStart, setArrowPadStart] = useState(DEFAULT_ARROW_PAD_START)
  const [arrowPadEnd, setArrowPadEnd] = useState(DEFAULT_ARROW_PAD_END)
  const [arrowFlip, setArrowFlip] = useState(DEFAULT_ARROW_FLIP)
  const [arrowStraights, setArrowStraights] = useState(DEFAULT_ARROW_STRAIGHTS)
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={arrowHeight}
                  onChange={(e) => {
                    setArrowHeight(+e.target.value)
                    onAction({
                      name: "ARROW-HEIGHT",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrow Height</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={arrowWidth}
                  onChange={(e) => {
                    setArrowWidth(+e.target.value)
                    onAction({
                      name: "ARROW-WIDTH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrow Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={arrowHeadSize}
                  onChange={(e) => {
                    setArrowHeadSize(+e.target.value)
                    onAction({
                      name: "ARROW-HEAD-SIZE",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrow Head Size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  onChange={(e) =>
                    onAction({
                      name: "BORDER-COLOR",
                      value: e.target.value,
                      seed: Math.random(),
                    })
                  }
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
                  onChange={(e) =>
                    onAction({
                      name: "SHAPE-FILL",
                      value: e.target.value,
                      seed: Math.random(),
                    })
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Color</p>
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
                  min={-1}
                  max={1}
                  step={0.1}
                  className="w-16 inline"
                  value={arrowBow}
                  onChange={(e) => {
                    setArrowBow(+e.target.value)
                    onAction({
                      name: "ARROW-BOW",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrow Bow</p>
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
                  value={arrowStretch}
                  min={-1}
                  max={1}
                  step={0.1}
                  onChange={(e) => {
                    setArrowStretch(+e.target.value)
                    onAction({
                      name: "ARROW-STRETCH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrow Stretch</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={arrowMinStretch}
                  min={0}
                  max={420}
                  step={1}
                  onChange={(e) => {
                    setArrowMinStretch(+e.target.value)
                    onAction({
                      name: "ARROW-MIN-STRETCH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrow Min Stretch</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  min={0}
                  max={420}
                  step={1}
                  value={arrowMaxStretch}
                  onChange={(e) => {
                    setArrowMaxStretch(+e.target.value)
                    onAction({
                      name: "ARROW-MAX-STRETCH",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrow Max Stretch</p>
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
                  value={arrowPadStart}
                  onChange={(e) => {
                    setArrowPadStart(+e.target.value)
                    onAction({
                      name: "ARROW-PAD-START",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrow Pad Start</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={arrowPadEnd}
                  onChange={(e) => {
                    setArrowPadEnd(+e.target.value)
                    onAction({
                      name: "ARROW-PAD-END",
                      value: +e.target.value,
                      seed: Math.random(),
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Arrow Pad End</p>
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
          <Checkbox
            id="flip"
            checked={arrowFlip}
            onCheckedChange={() => {
              onAction({
                name: "ARROW-FLIP",
                value: !arrowFlip,
                seed: Math.random(),
              })
              setArrowFlip(!arrowFlip)
            }}
          />
          <label
            htmlFor="flip"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Flip
          </label>
        </li>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <Checkbox
            id="straights"
            checked={arrowStraights}
            onCheckedChange={() => {
              onAction({
                name: "ARROW-STRAIGHTS",
                value: !arrowStraights,
                seed: Math.random(),
              })
              setArrowStraights(!arrowStraights)
            }}
          />
          <label
            htmlFor="flip"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Straights
          </label>
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

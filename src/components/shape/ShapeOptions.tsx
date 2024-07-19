import {
  ALLOWED_BORDER_RADIUS,
  ALLOWED_LINE2_DIRECTION,
  TAILWIND_COLORS,
} from "@/lib/constants"
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

import ColorPicker from "../ColorPicker"
import useStore from "../Store"

// import RoughjsOptions from "./RoughjsOptions"

export default function ShapeOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const shapes = useStore((state) => state.shapes)
  const shape = shapes[selectedId!]

  if (!selectedId || !shape) return

  if (shape.name === "RECT") {
    return <RectOptions />
  } else if (
    shape.name === "ROUGH-RECT" ||
    shape.name === "ROUGH-LINE" ||
    shape.name === "ROUGH-CIRCLE" ||
    shape.name === "ROUGH-ELLIPSE"
  ) {
    return <RoughRectOptions />
  } else if (shape.name === "LINE") {
    return <LineOptions />
  } else if (shape.name === "LINE-CIRCLE") {
    return <LineCircleOptions />
  } else if (shape.name === "LINE-LINE") {
    return <LineLineOptions />
  } else if (shape.name === "LINE-LINE-V2") {
    return <LineLineV2Options />
  } else if (shape.name === "ARROW") {
    return <ArrowOptions />
  } else if (shape.name === "ELLIPSE") {
    return <EllipseOptions />
  } else if (shape.name === "POLYGON") {
    return <PolygonOptions />
  } else {
    return <></>
  }
}

function RectOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const shapes = useStore((state) => state.shapes)
  const updateShapeProperty = useStore((state) => state.updateShapeProperty)
  const shape = shapes[selectedId!]

  if (!selectedId || !shape) return
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <ColorPicker
            label="border"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              updateShapeProperty(
                selectedId,
                "borderColor",
                c.replace("bg", "stroke")
              )
            }
          />

          <ColorPicker
            label="fill"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              updateShapeProperty(
                selectedId,
                "shapeFill",
                c.replace("bg", "fill")
              )
            }
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={shape.borderWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "borderWidth",
                      Number(e.target.value)
                    )
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Border Width</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              updateShapeProperty(selectedId, "borderRadius", v)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Border Radius" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_BORDER_RADIUS.map((br) => (
                <SelectItem value={br} key={br}>
                  {br}
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
                  type="number"
                  className="w-16 inline"
                  value={shape.rectWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "rectWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.rectHeight}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "rectHeight",
                      Number(e.target.value)
                    )
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

function RoughRectOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const shapes = useStore((state) => state.shapes)
  const updateShapeProperty = useStore((state) => state.updateShapeProperty)
  const shape = shapes[selectedId!]

  if (!selectedId || !shape) return
  return (
    <>
      <ul>
        {/* <RoughjsOptions /> */}

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={shape.rectWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "rectWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.rectHeight}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "rectHeight",
                      Number(e.target.value)
                    )
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

function LineOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const shapes = useStore((state) => state.shapes)
  const updateShapeProperty = useStore((state) => state.updateShapeProperty)
  const shape = shapes[selectedId!]

  if (!selectedId || !shape) return
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <ColorPicker
            label="color"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              updateShapeProperty(
                selectedId,
                "borderColor",
                c.replace("bg", "stroke")
              )
            }
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={shape.borderWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "borderWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.lineWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "lineWidth",
                      Number(e.target.value)
                    )
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

function LineCircleOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const shapes = useStore((state) => state.shapes)
  const updateShapeProperty = useStore((state) => state.updateShapeProperty)
  const shape = shapes[selectedId!]

  if (!selectedId || !shape) return
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <ColorPicker
            label="color"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              updateShapeProperty(
                selectedId,
                "borderColor",
                c.replace("bg", "stroke")
              )
            }
          />
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={shape.borderWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "borderWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.lineWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "lineWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.shapeRotate}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "shapeRotate",
                      Number(e.target.value)
                    )
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

function LineLineOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const shapes = useStore((state) => state.shapes)
  const updateShapeProperty = useStore((state) => state.updateShapeProperty)
  const shape = shapes[selectedId!]

  if (!selectedId || !shape) return
  return (
    <>
      <ul>
        <li className="p-1 hover:bg-blue-700 space-x-2">
          <ColorPicker
            label="color"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              updateShapeProperty(
                selectedId,
                "borderColor",
                c.replace("bg", "stroke")
              )
            }
          />
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={shape.borderWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "borderWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.shapeRotate}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "shapeRotate",
                      Number(e.target.value)
                    )
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
                  value={shape.lineWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "lineWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.line2Width}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "line2Width",
                      Number(e.target.value)
                    )
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

function LineLineV2Options() {
  const selectedId = useStore((state) => state.selectedId)
  const shapes = useStore((state) => state.shapes)
  const updateShapeProperty = useStore((state) => state.updateShapeProperty)
  const shape = shapes[selectedId!]

  if (!selectedId || !shape) return
  return (
    <>
      <ul>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              updateShapeProperty(selectedId, "line2Direction", v)
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
          <ColorPicker
            label="color"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              updateShapeProperty(
                selectedId,
                "borderColor",
                c.replace("bg", "stroke")
              )
            }
          />
        </li>

        <li className="p-1 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={shape.borderWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "borderWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.shapeRotate}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "shapeRotate",
                      Number(e.target.value)
                    )
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
                  value={shape.lineWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "lineWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.line2Width}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "line2Width",
                      Number(e.target.value)
                    )
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

function ArrowOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const shapes = useStore((state) => state.shapes)
  const updateShapeProperty = useStore((state) => state.updateShapeProperty)
  const shape = shapes[selectedId!]

  if (!selectedId || !shape) return
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
                  value={shape.arrowHeight}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "arrowHeight",
                      Number(e.target.value)
                    )
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
                  value={shape.arrowWidth}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "arrowWidth",
                      Number(e.target.value)
                    )
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
                  value={shape.arrowHeadSize}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "arrowHeadSize",
                      Number(e.target.value)
                    )
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
          <ColorPicker
            label="border color"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              updateShapeProperty(
                selectedId,
                "borderColor",
                c.replace("bg", "stroke")
              )
            }
          />
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
                  value={shape.arrowBow}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "arrowBow",
                      Number(e.target.value)
                    )
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
                  value={shape.arrowStretch}
                  min={-1}
                  max={1}
                  step={0.1}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "arrowStretch",
                      Number(e.target.value)
                    )
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
                  value={shape.arrowMinStretch}
                  min={0}
                  max={420}
                  step={1}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "arrowMinStretch",
                      Number(e.target.value)
                    )
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
                  value={shape.arrowMaxStretch}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "arrowMaxStretch",
                      Number(e.target.value)
                    )
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
                  value={shape.arrowPadStart}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "arrowPadStart",
                      Number(e.target.value)
                    )
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
                  value={shape.arrowPadEnd}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "arrowPadEnd",
                      Number(e.target.value)
                    )
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
                  value={shape.shapeRotate}
                  onChange={(e) => {
                    updateShapeProperty(
                      selectedId,
                      "shapeRotate",
                      Number(e.target.value)
                    )
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
            checked={shape.arrowFlip}
            onCheckedChange={() => {
              updateShapeProperty(selectedId, "arrowFlip", !shape.arrowFlip)
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
            checked={shape.arrowStraights}
            onCheckedChange={() => {
              updateShapeProperty(
                selectedId,
                "arrowStraights",
                !shape.arrowStraights
              )
            }}
          />
          <label
            htmlFor="straights"
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
function EllipseOptions() {
  return <></>
}
//@ts-ignore
function PolygonOptions() {
  return <></>
}

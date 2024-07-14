import { useState } from "react"

import {
  ALLOWED_BORDER_DIRECTION,
  ALLOWED_BORDER_RADIUS,
  ALLOWED_BORDER_STYLE,
  ALLOWED_BOX_SHADOW,
  ALLOWED_CODE_LANGUAGE,
  ALLOWED_FONT_FAMILY,
  ALLOWED_FONT_SIZE,
  ALLOWED_FONT_WEIGHT,
  ALLOWED_LINE_HEIGHT,
  ALLOWED_TEXT_GRADIENT,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_LEX_PADDING,
  TAILWIND_COLORS,
} from "@/lib/constants"
import { Action, ActionType } from "@/lib/types"
import { hslToHex } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { Slider } from "../ui/slider"

type LexOptionsProps = {
  onAction: (action: Action) => void
}
export default function LexOptions({ onAction }: LexOptionsProps) {
  const [padding, setPadding] = useState(DEFAULT_LEX_PADDING)
  const [paddingTop, setPaddingTop] = useState(DEFAULT_LEX_PADDING)
  const [paddingBottom, setPaddingBottom] = useState(DEFAULT_LEX_PADDING)
  const [paddingLeft, setPaddingLeft] = useState(DEFAULT_LEX_PADDING)
  const [paddingRight, setPaddingRight] = useState(DEFAULT_LEX_PADDING)
  const [borderWidth, setBorderWidth] = useState(DEFAULT_BORDER_WIDTH)
  const handleAction = ({
    name,
    value,
  }: {
    name: ActionType
    value?: string | number
  }) => {
    onAction({
      name: name,
      seed: Math.random(),
      value,
    })
  }
  return (
    <>
      <ul>
        <li className="p-2 hover:bg-blue-700">
          <Select
            onValueChange={(v) => {
              handleAction({ name: "CODE", value: v })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_CODE_LANGUAGE.map((lang) => (
                <SelectItem value={lang} key={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              handleAction({
                name: "FONT-FAMILY",
                value: v,
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_FONT_FAMILY.map((font) => (
                <SelectItem value={font} key={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              handleAction({
                name: "FONT-SIZE",
                value: v,
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Font Size" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_FONT_SIZE.map((font) => (
                <SelectItem value={font} key={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>

        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              handleAction({
                name: "FONT-WEIGHT",
                value: v,
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Font Weight" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_FONT_WEIGHT.map((font) => (
                <SelectItem value={font} key={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>

        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              handleAction({
                name: "LINE-HEIGHT",
                value: v,
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Line Height" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_LINE_HEIGHT.map((lw) => (
                <SelectItem value={lw} key={lw}>
                  {lw}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>

        <li className="p-2 hover:bg-blue-700 space-x-2">
          <ColorPicker
            label="color"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              handleAction({
                name: "COLOR",
                value: c.replace("bg", "text"),
              })
            }
          />
          <ColorPicker
            label="bg"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              handleAction({
                name: "BACKGROUND-COLOR",
                value: c,
              })
            }
          />

          <ColorPicker
            label="decoration"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              handleAction({
                name: "DECORATION-COLOR",
                value: c.replace("bg", "decoration"),
              })
            }
          />
        </li>

        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <ColorPicker
            label="box bg"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              handleAction({
                name: "LEX-BACKGROUND-COLOR",
                value: c,
              })
            }
          />
          <ColorPicker
            label="highlight"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              handleAction({
                name: "HIGHLIGHT",
                value: c,
              })
            }
          />
        </li>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              handleAction({
                name: "BORDER-DIRECTION",
                value: v,
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Border Direction" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_BORDER_DIRECTION.map((dir) => (
                <SelectItem value={dir} key={dir}>
                  {dir}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>

        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              handleAction({
                name: "BORDER-STYLE",
                value: v,
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Border" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_BORDER_STYLE.map((border) => (
                <SelectItem value={border} key={border}>
                  {border}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={borderWidth}
                  onChange={(e) => {
                    setBorderWidth(+e.target.value)
                    handleAction({
                      name: "BORDER-WIDTH",
                      value: +e.target.value,
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

        <li className="p-2 hover:bg-blue-700 space-x-2">
          <ColorPicker
            label="Border"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              handleAction({
                name: "BORDER-COLOR",
                value: c.replace("bg", "border"),
              })
            }
          />
        </li>

        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              handleAction({
                name: "BORDER-RADIUS",
                value: v,
              })
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

        <li className="p-2 hover:bg-blue-700 space-x-2">
          <Button onClick={() => handleAction({ name: "BOLD" })}>B</Button>
          <Button onClick={() => handleAction({ name: "ITALIC" })}>I</Button>
          <Button onClick={() => handleAction({ name: "UNDERLINE" })}>U</Button>
          <Button onClick={() => handleAction({ name: "STRIKETHROUGH" })}>
            S
          </Button>
        </li>

        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              handleAction({ name: "TEXT-GRADIENT", value: v })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Text Gradient" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_TEXT_GRADIENT.map((txtGr) => (
                <SelectItem value={txtGr.value} key={txtGr.name}>
                  {txtGr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={paddingTop}
                  onChange={(e) => {
                    setPaddingTop(+e.target.value)
                    handleAction({
                      name: "LEX-PADDING-TOP",
                      value: +e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Padding Top</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={paddingBottom}
                  onChange={(e) => {
                    setPaddingBottom(+e.target.value)
                    handleAction({
                      name: "LEX-PADDING-BOTTOM",
                      value: +e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Padding Bottom</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={paddingLeft}
                  onChange={(e) => {
                    setPaddingLeft(+e.target.value)
                    handleAction({
                      name: "LEX-PADDING-LEFT",
                      value: +e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Padding Left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={paddingRight}
                  onChange={(e) => {
                    setPaddingRight(+e.target.value)
                    handleAction({
                      name: "LEX-PADDING-RIGHT",
                      value: +e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Padding Right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={padding}
                  onChange={(e) => {
                    setPadding(+e.target.value)
                    handleAction({
                      name: "LEX-PADDING",
                      value: +e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Padding</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li className="p-2 hover:bg-blue-700">
          <Select
            onValueChange={(v) => {
              handleAction({ name: "BOX-SHADOW", value: v })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Box Shadow" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_BOX_SHADOW.map((boxShadow) => (
                <SelectItem value={boxShadow} key={boxShadow}>
                  {boxShadow}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>
      </ul>
    </>
  )
}

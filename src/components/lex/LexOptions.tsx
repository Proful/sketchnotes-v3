import { useState } from "react"

import {
  ALLOWED_BORDER_STYLE,
  ALLOWED_CODE_LANGUAGE,
  ALLOWED_FONT_FAMILY,
  ALLOWED_TEXT_GRADIENT,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_FONT_SIZE,
} from "@/lib/constants"
import { Action, ActionType } from "@/lib/types"
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

type LexOptionsProps = {
  onAction: (action: Action) => void
}
export default function LexOptions({ onAction }: LexOptionsProps) {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE)
  const [borderWidth, setBorderWidth] = useState(DEFAULT_BORDER_WIDTH)
  const [borderRadius, setBorderRadius] = useState(DEFAULT_BORDER_RADIUS)
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={fontSize}
                  onChange={(e) => {
                    setFontSize(+e.target.value)
                    handleAction({
                      name: "FONT-SIZE",
                      value: +e.target.value,
                    })
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Font Size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                  type="color"
                  className="w-12 inline"
                  title="Border color"
                  onChange={(e) =>
                    handleAction({
                      name: "BORDER-COLOR",
                      value: e.target.value,
                    })
                  }
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={borderRadius}
                  onChange={(e) => {
                    setBorderRadius(+e.target.value)
                    handleAction({
                      name: "BORDER-RADIUS",
                      value: +e.target.value,
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
        <li className="p-2 hover:bg-blue-700 space-x-2">
          <Button onClick={() => handleAction({ name: "H1" })}>H1</Button>
          <Button onClick={() => handleAction({ name: "H2" })}>H2</Button>
          <Button onClick={() => handleAction({ name: "H3" })}>H3</Button>
          <Button onClick={() => handleAction({ name: "QUOTE" })}>Q</Button>
        </li>
        <li className="p-2 hover:bg-blue-700 space-x-2">
          <Button onClick={() => handleAction({ name: "BOLD" })}>B</Button>
          <Button onClick={() => handleAction({ name: "ITALIC" })}>I</Button>
          <Button onClick={() => handleAction({ name: "UNDERLINE" })}>U</Button>
          <Button onClick={() => handleAction({ name: "STRIKETHROUGH" })}>
            S
          </Button>
        </li>
        <li className="p-2 hover:bg-blue-700 space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  title="Color"
                  onChange={(e) =>
                    handleAction({ name: "COLOR", value: e.target.value })
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  title="Background color"
                  onChange={(e) =>
                    handleAction({
                      name: "BACKGROUND-COLOR",
                      value: e.target.value,
                    })
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Background Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  title="Decoration color"
                  onChange={(e) =>
                    handleAction({
                      name: "DECORATION-COLOR",
                      value: e.target.value,
                    })
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Decoration Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  title="Highlight"
                  onChange={(e) =>
                    handleAction({
                      name: "HIGHLIGHT",
                      value: e.target.value,
                    })
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Highlight</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
      </ul>
    </>
  )
}

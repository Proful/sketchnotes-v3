import {
  BaselineIcon,
  BoxSelectIcon,
  CaseSensitiveIcon,
  CaseUpperIcon,
  Dice4,
  TypeIcon,
} from "lucide-react"

import {
  ALLOWED_BORDER_DIRECTION,
  ALLOWED_BORDER_RADIUS,
  ALLOWED_BORDER_STYLE,
  ALLOWED_FONT_FAMILY,
  ALLOWED_FONT_SIZE,
  ALLOWED_FONT_WEIGHT,
  ALLOWED_LINE_HEIGHT,
  TAILWIND_COLORS,
} from "@/lib/constants"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import GradientPicker from "../GradientPicker"
// import GradientPicker from "../GradientPicker"
// import ShadowPicker from "../ShadowPicker"
import useStore from "../Store"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

// import { Slider } from "../ui/slider"

export default function LexOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const lexes = useStore((state) => state.lexes)
  const updateLexProperty = useStore((state) => state.updateLexProperty)
  const lex = lexes[selectedId!]

  if (!selectedId || !lex) return

  return (
    <>
      <ul>
        <li className="p-2 flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <CaseUpperIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <ul>
                <li className="p-2 flex space-x-2 items-center">
                  <span className="w-1/3 text-muted-foreground">Font</span>
                  <Select
                    value={lex.fontFamily}
                    onValueChange={(v) => {
                      updateLexProperty(selectedId, "fontFamily", v)
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

                <li className="p-2 flex space-x-2 items-center">
                  <span className="w-1/3 text-muted-foreground">Size</span>
                  <Select
                    value={lex.fontSize}
                    onValueChange={(v) => {
                      updateLexProperty(selectedId, "fontSize", v)
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

                <li className="p-2 flex space-x-2 items-center">
                  <span className="w-1/3 text-muted-foreground">Weight</span>
                  <Select
                    value={lex.fontWeight}
                    onValueChange={(v) => {
                      updateLexProperty(selectedId, "fontWeight", v)
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

                <li className="p-2 flex space-x-2 items-center">
                  <span className="w-1/3 text-muted-foreground">
                    Line Height
                  </span>
                  <Select
                    value={lex.lineHeight}
                    onValueChange={(v) => {
                      updateLexProperty(selectedId, "lineHeight", v)
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
              </ul>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <BoxSelectIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <ul>
                <li className="p-2 flex space-x-2 items-center">
                  <span className="w-1/3 text-muted-foreground">Direction</span>
                  <Select
                    value={lex.borderDirection}
                    onValueChange={(v) => {
                      updateLexProperty(selectedId, "borderDirection", v)
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

                <li className="p-2 flex space-x-2 items-center">
                  <span className="w-1/3 text-muted-foreground">Style</span>
                  <Select
                    value={lex.borderStyle}
                    onValueChange={(v) => {
                      updateLexProperty(selectedId, "borderStyle", v)
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
                </li>
                <li className="p-2 flex space-x-2 items-center">
                  <span className="w-1/3 text-muted-foreground">Width</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Input
                          type="number"
                          className="w-16 inline"
                          value={lex.borderWidth}
                          onChange={(e) => {
                            updateLexProperty(
                              selectedId,
                              "borderWidth",
                              +e.target.value
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
                <li className="p-2 space-x-2 items-center">
                  <span className="w-1/3 text-muted-foreground">Color</span>
                  <span className="w-2/3">
                    <ColorPicker
                      label="Border"
                      colors={TAILWIND_COLORS}
                      onColorSelect={(c) =>
                        updateLexProperty(
                          selectedId,
                          "borderColor",
                          c.replace("bg", "border")
                        )
                      }
                    />
                  </span>
                </li>

                <li className="p-2 flex space-x-2 items-center">
                  <span className="w-1/3 text-muted-foreground">Radius</span>
                  <Select
                    value={lex.borderRadius}
                    onValueChange={(v) => {
                      updateLexProperty(selectedId, "borderRadius", v)
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
              </ul>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <Dice4 />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <ul>
                <li className="p-2 flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Input
                          type="number"
                          className="w-16 inline"
                          value={lex.paddingTop}
                          onChange={(e) => {
                            updateLexProperty(
                              selectedId,
                              "paddingTop",
                              +e.target.value
                            )
                            updateLexProperty(selectedId, "padding", 0)
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
                          value={lex.paddingBottom}
                          onChange={(e) => {
                            updateLexProperty(
                              selectedId,
                              "paddingBottom",
                              +e.target.value
                            )
                            updateLexProperty(selectedId, "padding", 0)
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Padding Bottom</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="p-2 flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Input
                          type="number"
                          className="w-16 inline"
                          value={lex.paddingLeft}
                          onChange={(e) => {
                            updateLexProperty(
                              selectedId,
                              "paddingLeft",
                              +e.target.value
                            )
                            updateLexProperty(selectedId, "padding", 0)
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
                          value={lex.paddingRight}
                          onChange={(e) => {
                            updateLexProperty(
                              selectedId,
                              "paddingRight",
                              +e.target.value
                            )
                            updateLexProperty(selectedId, "padding", 0)
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
                          value={lex.padding}
                          onChange={(e) => {
                            updateLexProperty(
                              selectedId,
                              "padding",
                              +e.target.value
                            )
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Padding</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
          <ColorPicker
            label={
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill={"rgba(142, 164, 215,0.7)"} />
              </svg>
            }
            colors={TAILWIND_COLORS}
            onColorSelect={(c) => updateLexProperty(selectedId, "boxColor", c!)}
          />
        </li>
        <Separator />
        <li className="p-2 space-x-2">
          <ColorPicker
            label={<TypeIcon />}
            colors={TAILWIND_COLORS}
            onColorSelect={(_c, rgba) => {
              updateLexProperty(selectedId, "color", rgba!)
            }}
          />
          <ColorPicker
            label={
              <TypeIcon
                style={{ backgroundColor: "rgba(142, 164, 215,0.5)" }}
              />
            }
            colors={TAILWIND_COLORS}
            onColorSelect={(_c, rgba) =>
              updateLexProperty(selectedId, "backgroundColor", rgba!)
            }
          />

          <ColorPicker
            label={<BaselineIcon />}
            colors={TAILWIND_COLORS}
            onColorSelect={(_c, rgba) =>
              updateLexProperty(selectedId, "decorationColor", rgba!)
            }
          />
          <ColorPicker
            label={
              <CaseSensitiveIcon
                className="text-black rounded p-1"
                style={{ backgroundColor: "rgb(142, 164, 215)" }}
              />
            }
            colors={TAILWIND_COLORS}
            onColorSelect={(_c, rgba) =>
              updateLexProperty(selectedId, "highlightColor", rgba!)
            }
          />
        </li>

        <li className="p-2 flex space-x-2">
          <GradientPicker
            label={
              <span className="px-[1px] font-extrabold tracking-widest from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-gradient-to-r bg-clip-text text-transparent">
                Aa
              </span>
            }
            onGradientSelect={(v) => {
              updateLexProperty(selectedId, "textGradient", v)
            }}
          />
        </li>
      </ul>
    </>
  )
}

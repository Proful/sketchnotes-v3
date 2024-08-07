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
  DEFAULT_CODE_LANGUAGE,
  TAILWIND_COLORS,
} from "@/lib/constants"
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
          <Select
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
        <li className="p-2 flex space-x-2">
          <Select
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

        <li className="p-2 flex space-x-2">
          <Select
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

        <li className="p-2 flex space-x-2">
          <Select
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

        <li className="p-2 space-x-2">
          <ColorPicker
            label="color"
            colors={TAILWIND_COLORS}
            onColorSelect={(_c, rgba) => {
              updateLexProperty(selectedId, "color", rgba!)
            }}
          />
          <ColorPicker
            label="bg"
            colors={TAILWIND_COLORS}
            onColorSelect={(_c, rgba) =>
              updateLexProperty(selectedId, "backgroundColor", rgba!)
            }
          />

          <ColorPicker
            label="decoration"
            colors={TAILWIND_COLORS}
            onColorSelect={(_c, rgba) =>
              updateLexProperty(selectedId, "decorationColor", rgba!)
            }
          />
        </li>

        <li className="p-2 flex space-x-2">
          <ColorPicker
            label="box bg"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) => updateLexProperty(selectedId, "boxColor", c!)}
          />
          <ColorPicker
            label="highlight"
            colors={TAILWIND_COLORS}
            onColorSelect={(_c, rgba) =>
              updateLexProperty(selectedId, "highlightColor", rgba!)
            }
          />
        </li>
        <li className="p-2 flex space-x-2">
          <Select
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

        <li className="p-2 flex space-x-2">
          <Select
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

        <li className="p-2 space-x-2">
          <ColorPicker
            label="Border"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              updateLexProperty(selectedId, "borderColor", c)
            }
          />
        </li>

        <li className="p-2 flex space-x-2">
          <Select
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

        <li className="p-2 flex space-x-2">
          <Select
            onValueChange={(v) => {
              updateLexProperty(selectedId, "textGradient", v)
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
        <li className="p-2 flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={lex.paddingTop}
                  onChange={(e) => {
                    updateLexProperty(selectedId, "paddingTop", +e.target.value)
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
                    updateLexProperty(selectedId, "padding", +e.target.value)
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Padding</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li className="p-2">
          <Select
            onValueChange={(v) => {
              updateLexProperty(selectedId, "boxShadow", v)
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
        <li className="p-2">
          <Select
            value={lex.codeLanguage || DEFAULT_CODE_LANGUAGE}
            onValueChange={(v) => {
              updateLexProperty(selectedId, "codeLanguage", v)
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
      </ul>
    </>
  )
}

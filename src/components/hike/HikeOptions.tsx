import {
  ALLOWED_BORDER_RADIUS,
  ALLOWED_CODE_LANGUAGE,
  TAILWIND_COLORS,
} from "@/lib/constants"
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

import ColorPicker from "../ColorPicker"
import useStore from "../Store"
import { Button } from "../ui/button"
import { Slider } from "../ui/slider"
import { CopyButton } from "./CopyButton"
import { Code } from "./HikeContainer"

const calloutCode = `!callout[/amet/] This is a callout`
const markCode = `!mark(1:2)`
const neonCode = `!neon[1:5]`
const glowCode = `!glow[1:5]`
const bgCode = `!bg[1:3]`
const borderCode = `!border[1:7]`
const underlineCode = `!underline[1:16]`

export default function HikeOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const hikes = useStore((state) => state.hikes)
  const updateHikeProperty = useStore((state) => state.updateHikeProperty)
  const hike = hikes[selectedId!]

  if (!selectedId || !hike) return

  return (
    <>
      <ul>
        <li className="p-2 hover:bg-blue-700">
          <Button
            onClick={() =>
              updateHikeProperty(selectedId, "preview", !hike.preview)
            }
          >
            Preview
          </Button>
        </li>
        <li className="p-2 hover:bg-blue-700">
          <Select
            onValueChange={(v) => {
              updateHikeProperty(selectedId, "codeLanguage", v)
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
        <li className="p-2 hover:bg-blue-700">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Annotations</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px]">
              <CodeAnnotationPreview text={calloutCode} />
              <CodeAnnotationPreview text={markCode} />
              <CodeAnnotationPreview text={neonCode} />
              <CodeAnnotationPreview text={glowCode} />
              <CodeAnnotationPreview text={bgCode} />
              <CodeAnnotationPreview text={borderCode} />
              <CodeAnnotationPreview text={underlineCode} />
            </PopoverContent>
          </Popover>
        </li>
        <li className="p-2 hover:bg-blue-700">
          <ColorPicker
            label="bg"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) =>
              updateHikeProperty(selectedId, "backgroundColor", c)
            }
          />
        </li>

        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <span className="text-gray-100">Padding</span>
          <Slider
            defaultValue={[0]}
            min={0}
            max={40}
            step={2}
            onValueChange={(v) => {
              updateHikeProperty(selectedId, "padding", v[0])
            }}
          />
        </li>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              updateHikeProperty(selectedId, "borderRadius", v)
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
    </>
  )
}

function CodeAnnotationPreview({ text }: { text: string }) {
  return (
    <div className="relative mb-2">
      <CopyButton text={`//${text}`} />
      <Code
        codeblock={{
          value: `//${text}
${text}`,
          lang: "javascript",
          meta: "",
        }}
      />
    </div>
  )
}

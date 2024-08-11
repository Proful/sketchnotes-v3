import { ALLOWED_BORDER_RADIUS, DEFAULT_FRAME_PADDING } from "@/lib/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import GradientPicker from "../GradientPicker"
import useStore from "../Store"
import { Slider } from "../ui/slider"

export default function ImageOptions() {
  const updateImageProperty = useStore((state) => state.updateImageProperty)
  const images = useStore((state) => state.images)
  const selectedId = useStore((state) => state.selectedId)
  const image = images[selectedId!]

  if (!selectedId || !image) return
  return (
    <>
      <ul>
        <li className="p-1 space-x-2">
          <GradientPicker
            onGradientSelect={(gradient) => {
              console.log(gradient)
              updateImageProperty(selectedId, "gradient", gradient)
            }}
          />
        </li>
        <li className="p-2  flex space-x-2">
          <span>Padding</span>
          <Slider
            defaultValue={[DEFAULT_FRAME_PADDING]}
            value={[image.padding!]}
            min={0}
            max={35}
            step={1}
            onValueChange={(v) => {
              updateImageProperty(selectedId, "padding", v[0])
            }}
          />
        </li>

        <li className="p-2 flex space-x-2">
          <Select
            onValueChange={(v) => {
              updateImageProperty(selectedId, "borderRadius", v)
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

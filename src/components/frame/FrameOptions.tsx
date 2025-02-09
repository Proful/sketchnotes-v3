import {
  ALLOWED_BORDER_RADIUS,
  DEFAULT_FRAME_PADDING,
  TAILWIND_COLORS,
} from "@/lib/constants"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import ColorPicker from "../ColorPicker"
import GradientPicker from "../GradientPicker"
import useStore from "../Store"
import { Input } from "../ui/input"
import { Slider } from "../ui/slider"

export default function FrameOptions() {
  const updateFrameProperty = useStore((state) => state.updateFrameProperty)
  const frame = useStore((state) => state.frame)

  if (!frame) {
    return
  }
  return (
    <>
      <ul>
        <li className="p-1 space-x-2">
          <GradientPicker
            onGradientSelect={(gradient) =>
              updateFrameProperty("frameGradient", gradient)
            }
          />
        </li>
        <li className="p-2  flex space-x-2 items-center">
          <Checkbox
            id="3dots"
            checked={frame.enable3dots}
            onCheckedChange={() => {
              updateFrameProperty("enable3dots", !frame.enable3dots)
            }}
          />
          <label
            htmlFor="3dots"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            3 dots
          </label>
        </li>
        {/* <li className="p-2  flex space-x-2"> */}
        {/*   <Select */}
        {/*     onValueChange={(v) => { */}
        {/*       const [w, h] = v.split("x").map(Number) */}
        {/*       updateFrameProperty("frameResolution", { w, h }) */}
        {/*     }} */}
        {/*   > */}
        {/*     <SelectTrigger className="w-[180px]"> */}
        {/*       <SelectValue placeholder="Frame Resolution" /> */}
        {/*     </SelectTrigger> */}
        {/*     <SelectContent> */}
        {/*       {ALLOWED_FRAME_RESOLUTION.map((fr) => ( */}
        {/*         <SelectItem value={fr} key={fr}> */}
        {/*           {fr} */}
        {/*         </SelectItem> */}
        {/*       ))} */}
        {/*     </SelectContent> */}
        {/*   </Select> */}
        {/* </li> */}
        <li className="p-2  flex place-items-center space-x-2">
          <span>Zoom</span>
          <Input
            type="number"
            className="w-16 inline"
            value={frame.scale}
            min={-1}
            max={4}
            step={0.1}
            onChange={(e) => {
              updateFrameProperty("scale", +e.target.value)
            }}
          />
        </li>

        <li className="p-2 place-items-center flex space-x-2">
          <span>Padding</span>
          <Slider
            defaultValue={[DEFAULT_FRAME_PADDING]}
            value={[frame.padding!]}
            min={0}
            max={35}
            step={1}
            onValueChange={(v) => {
              updateFrameProperty("padding", v[0])
            }}
          />
        </li>

        <li className="p-2 flex space-x-2">
          <Select
            onValueChange={(v) => {
              updateFrameProperty("borderRadius", v)
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
        <li className="p-1 space-x-2">
          <ColorPicker
            label="bg"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) => updateFrameProperty("backgroundColor", c)}
          />
        </li>
      </ul>
    </>
  )
}

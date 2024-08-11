import { TAILWIND_COLORS } from "@/lib/constants"

import ColorPicker from "../ColorPicker"
import useStore from "../Store"
import { Checkbox } from "../ui/checkbox"

export default function IconOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const icons = useStore((state) => state.icons)
  const updateIconProperty = useStore((state) => state.updateIconProperty)
  const icon = icons[selectedId!]

  if (!selectedId || !icon) return
  return (
    <>
      <ul>
        <li className="p-2 space-x-2">
          <ColorPicker
            label="color"
            colors={TAILWIND_COLORS}
            onColorSelect={(c) => {
              updateIconProperty(
                selectedId,
                "iconColor",
                c.replace("bg", "fill")
              )
            }}
          />
        </li>
        <li className="p-2 space-x-2">
          <Checkbox
            id="flipHorizontal"
            checked={icon.flipHorizontal}
            onCheckedChange={() => {
              updateIconProperty(
                selectedId,
                "flipHorizontal",
                !icon.flipHorizontal
              )
            }}
          />
          <label
            htmlFor="flipHorizontal"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Flip Horizontal
          </label>
        </li>
        <li className="p-2 space-x-2">
          <Checkbox
            id="flipVertical"
            checked={icon.flipVertical}
            onCheckedChange={() => {
              updateIconProperty(selectedId, "flipVertical", !icon.flipVertical)
            }}
          />
          <label
            htmlFor="flipVertical"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Flip Vertical
          </label>
        </li>
      </ul>
    </>
  )
}

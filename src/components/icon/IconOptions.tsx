import { TAILWIND_COLORS } from "@/lib/constants"

import ColorPicker from "../ColorPicker"
import useStore from "../Store"

export default function IconOptions() {
  const selectedId = useStore((state) => state.selectedId)
  const icons = useStore((state) => state.icons)
  const updateIconProperty = useStore((state) => state.updateIconProperty)
  const icon = icons[selectedId!]

  if (!selectedId || !icon) return
  return (
    <>
      <ul>
        <li className="p-2 hover:bg-blue-700 space-x-2">
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
      </ul>
    </>
  )
}

import { TAILWIND_COLORS } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
        <li className="p-2 hover:bg-blue-700">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={icon.iconSize}
                  onChange={(e) => {
                    updateIconProperty(
                      selectedId,
                      "iconSize",
                      Number(e.target.value)
                    )
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Icon Size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="number"
                  className="w-16 inline"
                  value={icon.iconRotate}
                  onChange={(e) => {
                    updateIconProperty(
                      selectedId,
                      "iconRotate",
                      Number(e.target.value)
                    )
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Icon Rotate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

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

import { useState } from "react"

import { DEFAULT_ICON_ROTATE, DEFAULT_ICON_SIZE } from "@/lib/constants"
import { Action, ActionType } from "@/lib/types"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type IconOptionsProps = {
  onAction: (action: Action) => void
}
export default function IconOptions({ onAction }: IconOptionsProps) {
  const [iconSize, setIconSize] = useState(DEFAULT_ICON_SIZE)
  const [iconRotate, setIconRotate] = useState(DEFAULT_ICON_ROTATE)
  const handleAction = ({
    actionType,
    value,
  }: {
    actionType: ActionType
    value?: string | number
  }) => {
    onAction({
      name: actionType,
      seed: Math.random(),
      value,
    })
  }
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
                  value={iconSize}
                  onChange={(e) => {
                    setIconSize(+e.target.value)
                    handleAction({
                      actionType: "ICON-SIZE",
                      value: +e.target.value,
                    })
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
                  value={iconRotate}
                  onChange={(e) => {
                    setIconRotate(+e.target.value)
                    handleAction({
                      actionType: "ICON-ROTATE",
                      value: +e.target.value,
                    })
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  type="color"
                  className="w-12 inline"
                  title="Color"
                  onChange={(e) =>
                    handleAction({ actionType: "COLOR", value: e.target.value })
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </>
  )
}

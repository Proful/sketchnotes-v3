import { useState } from "react"
import { CameraIcon } from "lucide-react"

import { ALLOWED_FRAME_GRADIENT } from "@/lib/constants"
import { Action } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FrameOptionsProps = {
  onAction: (action: Action) => void
}
export default function FrameOptions({ onAction }: FrameOptionsProps) {
  const [enable3dots, setEnable3dots] = useState(true)
  return (
    <>
      <ul>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Select
            onValueChange={(v) => {
              const [name, value] = v.split("~")
              onAction({
                name: "FRAME-GRADIENT",
                value: { name, value },
                seed: Math.random(),
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Frame Gradient" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_FRAME_GRADIENT.map((fr) => (
                <SelectItem value={fr.name + "~" + fr.value} key={fr.name}>
                  {fr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => {
              onAction({
                name: "SCREENSHOT",
                seed: Math.random(),
              })
            }}
          >
            <CameraIcon />
          </Button>
        </li>
        <li className="p-2 hover:bg-blue-700 flex space-x-2 items-center">
          <Checkbox
            id="3dots"
            checked={enable3dots}
            onCheckedChange={() => {
              onAction({
                name: "ENABLE-3DOTS",
                value: !enable3dots,
                seed: Math.random(),
              })
              setEnable3dots(!enable3dots)
            }}
          />
          <label
            htmlFor="3dots"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            3 dots
          </label>
        </li>
      </ul>
    </>
  )
}

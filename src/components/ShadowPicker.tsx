import React from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "./ui/button"

type ShadowType =
  | "shadow-sm"
  | "shadow"
  | "shadow-md"
  | "shadow-lg"
  | "shadow-xl"
  | "shadow-2xl"

const shadows: ShadowType[] = [
  "shadow-sm",
  "shadow",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "shadow-2xl",
]

const ShadowPicker: React.FC = () => {
  // const [selectedShadow, setSelectedShadow] = useState<ShadowType>("shadow-sm")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>{"Shadow"}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="p-2 space-y-4">
          <div className="flex space-x-2">
            {shadows.map((shadow) => (
              <button
                key={shadow}
                className={`p-2 rounded ${shadow} bg-primary`}
              >
                {shadow.replace("shadow-", "").replace("shadow", "default")}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ShadowPicker

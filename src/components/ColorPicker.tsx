import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Separator } from "./ui/separator"
import { Slider } from "./ui/slider"

type ColorPickerProps = {
  label?: string
  colors: string[]
  onColorSelect: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  colors,
  onColorSelect,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [showShades, setShowShades] = useState<boolean>(false)
  const [opacity, setOpacity] = useState<number>(100)

  const shades = ["100", "200", "300", "400", "500", "600", "700", "800", "900"]

  const handleColorClick = (color: string) => {
    setSelectedColor(color)
    if (color) {
      setShowShades(true)
      onColorSelect(`${color}/${opacity}`)
    } else {
      setShowShades(false)
      onColorSelect(color)
    }
  }

  const handleShadeClick = (shade: string) => {
    const shadeColor = `${selectedColor.split("-")[0]}-${selectedColor.split("-")[1]}-${shade}`
    setSelectedColor(shadeColor)
    onColorSelect(shadeColor + "/" + opacity)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">{label || "Color"}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-wrap">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-8 h-8 m-1 cursor-pointer rounded-full ${color} ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-indigo-500"
                    : ""
                }`}
                onClick={() => handleColorClick(color)}
              />
            ))}
            <div
              className={`w-8 h-8 m-1 cursor-pointer rounded-full bg-black`}
              onClick={() => handleColorClick("")}
            />
          </div>
          {showShades && (
            <>
              <Separator className="mt-2" />
              <div className="flex flex-wrap mt-4">
                {shades.map((shade) => {
                  const color = `${selectedColor.split("-")[0]}-${selectedColor.split("-")[1]}-${shade}`
                  return (
                    <div
                      key={shade}
                      className={`w-6 h-6 m-1 cursor-pointer rounded-full ${color} ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-indigo-500"
                          : ""
                      }`}
                      onClick={() => handleShadeClick(shade)}
                    />
                  )
                })}
              </div>
            </>
          )}
          <div>
            <Separator className="mt-2" />
            <Slider
              defaultValue={[100]}
              min={0}
              max={100}
              step={5}
              onValueChange={(v) => {
                setOpacity(v[0])

                onColorSelect(`${selectedColor}/${v[0]}`)
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default ColorPicker

// import { useState } from "react"

import { ALLOWED_FRAME_GRADIENT } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// import { Input } from "./ui/input"
// import { Separator } from "./ui/separator"

type GradientPickerProps = {
  label?: string | React.ReactNode
  onGradientSelect?: (gradient: string) => void
}

const GradientPicker = ({ label, onGradientSelect }: GradientPickerProps) => {
  // const [from, setFrom] = useState<string>("")
  // const [to, setTo] = useState<string>("")

  const handleGradientClick = (gradient: string) => {
    // setSelectedGradient(gradient)
    onGradientSelect!(gradient)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>{label || "Gradient"}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div>
            <div className="flex flex-wrap">
              {ALLOWED_FRAME_GRADIENT.map((value) => (
                <div
                  key={value}
                  className={`w-8 h-8 m-1 cursor-pointer rounded-full bg-gradient-to-r ${value} `}
                  onClick={(e) => {
                    handleGradientClick(value)
                    e.stopPropagation()
                  }}
                />
              ))}
              <div
                className={`w-8 h-8 m-1 cursor-pointer rounded-full bg-black`}
                onClick={() => handleGradientClick("")}
              />
            </div>
            {/* <Separator className="my-2" /> */}
            {/* <div className="flex"> */}
            {/*   <Input */}
            {/*     type="color" */}
            {/*     className="inline" */}
            {/*     value={from} */}
            {/*     onChange={(e) => { */}
            {/*       setFrom(e.target.value) */}
            {/*       if (to) { */}
            {/*         onGradientSelect!(`from-[${e.target.value}] to-[${to}]`) */}
            {/*       } */}
            {/*     }} */}
            {/*   /> */}
            {/*   <Input */}
            {/*     type="color" */}
            {/*     className="inline" */}
            {/*     value={to} */}
            {/*     onChange={(e) => { */}
            {/*       setTo(e.target.value) */}
            {/*       if (from) { */}
            {/*         onGradientSelect!(`from-[${from}] to-[${e.target.value}]`) */}
            {/*       } */}
            {/*     }} */}
            {/*   /> */}
            {/* </div> */}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default GradientPicker

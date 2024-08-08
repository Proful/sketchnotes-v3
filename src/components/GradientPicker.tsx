import { ALLOWED_FRAME_GRADIENT } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type GradientPickerProps = {
  label?: string
  onGradientSelect?: (gradient: string) => void
}

const GradientPicker = ({ label, onGradientSelect }: GradientPickerProps) => {
  // const [selectedGradient, setSelectedGradient] = useState<string>("")

  const handleGradientClick = (gradient: string) => {
    // setSelectedGradient(gradient)
    onGradientSelect!(gradient)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">{label || "Gradient"}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
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
        </PopoverContent>
      </Popover>
    </>
  )
}

export default GradientPicker

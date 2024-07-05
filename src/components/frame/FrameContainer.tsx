import { useEffect, useRef, useState } from "react"
import { invoke } from "@tauri-apps/api"
import Draggable from "react-draggable"

import {
  DEFAULT_FRAME_GRADIENT,
  DEFAULT_FRAME_RESOLUTION,
} from "@/lib/constants"
import {
  Action,
  ContainerStyle,
  ContainerType,
  NameValuePair,
} from "@/lib/types"

export function FrameContainer({
  action,
  onSelect,
}: {
  action: Action | null
  onSelect: (containerType: ContainerType) => void
}) {
  // const screenshotFrameRef = useRef(null)
  const nodeRef = useRef(null)
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    frameGradient: DEFAULT_FRAME_GRADIENT,
    frameResolution: DEFAULT_FRAME_RESOLUTION,
    enable3dots: true,
  })

  useEffect(() => {
    if (!action) return
    if (action?.name === "FRAME-GRADIENT") {
      setContainerStyle({
        ...containerStyle,
        frameGradient: action.value! as NameValuePair,
      })
    } else if (action?.name === "FRAME-RESOLUTION") {
      const [w, h]: number[] = (action.value! as string).split("x").map(Number)
      setContainerStyle({
        ...containerStyle,
        frameResolution: { w, h },
      })
    } else if (action?.name === "ENABLE-3DOTS") {
      setContainerStyle({
        ...containerStyle,
        enable3dots: action.value! as boolean,
      })
    } else if (action?.name === "SCREENSHOT") {
      if (nodeRef.current) {
        const box = nodeRef.current as HTMLDivElement
        const rect = box.getBoundingClientRect()
        const { w, h } = containerStyle.frameResolution!
        invoke("screenshot", {
          x: rect.left,
          y: rect.top + 53,
          width: w,
          height: h,
        })
      }
    }
  }, [action?.seed])

  const { w, h } = containerStyle.frameResolution!

  return (
    <>
      <Draggable nodeRef={nodeRef}>
        <div
          className={`w-[${w}px] h-[${h}px] absolute border-4`}
          ref={nodeRef}
          onClick={(e) => {
            onSelect("FRAME")
            e.stopPropagation()
          }}
        >
          <div
            className={`bg-gradient-to-r ${containerStyle.frameGradient!.value} p-4 w-full h-full`}
          >
            <div className="w-full h-full p-4 bg-background rounded-lg">
              {containerStyle.enable3dots && (
                <div className="flex space-x-2 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Draggable>
    </>
  )
}

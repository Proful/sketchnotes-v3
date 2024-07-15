import { useEffect, useRef, useState } from "react"
// import { invoke } from "@tauri-apps/api"
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
        // Get the device pixel ratio
        const dpr = window.devicePixelRatio || 1
        const box = nodeRef.current as HTMLDivElement
        const rect = box.getBoundingClientRect()
        // const { w, h } = containerStyle.frameResolution!
        //@ts-ignore
        html2canvas(document.body, {
          width: document.documentElement.clientWidth * dpr,
          height: document.documentElement.clientHeight * dpr,
          x: 0,
          y: 0,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          scale: dpr,
        }).then((canvas: any) => {
          // Create a temporary canvas to crop the captured area
          const croppedCanvas = document.createElement("canvas")
          croppedCanvas.width = rect.width * dpr
          croppedCanvas.height = rect.height * dpr
          const ctx = croppedCanvas.getContext("2d")
          if (ctx) {
            ctx.drawImage(
              canvas,
              rect.left * dpr, // Source x
              rect.top * dpr, // Source y
              rect.width * dpr, // Source width
              rect.height * dpr, // Source height
              0, // Destination x
              0, // Destination y
              rect.width * dpr, // Destination width
              rect.height * dpr // Destination height
            )
          }
          croppedCanvas.toBlob(async (blob) => {
            if (blob) {
              try {
                await navigator.clipboard.write([
                  new ClipboardItem({ "image/png": blob }),
                ])
                alert("Screenshot copied to clipboard!")
              } catch (err) {
                console.error("Failed to copy: ", err)
              }
            }
          }, "image/png")
        })
        // invoke("screenshot", {
        //   x: rect.left,
        //   y: rect.top + 53,
        //   width: w,
        //   height: h,
        // })
      }
    }
  }, [action?.seed])

  const { w, h } = containerStyle.frameResolution!

  return (
    <>
      <img id="screenshot" style={{ display: "none" }} />
      <Draggable nodeRef={nodeRef}>
        <div
          className={`w-[${w}px] h-[${h}px] absolute border-4 z-90`}
          ref={nodeRef}
          onClick={(e) => {
            onSelect("FRAME")
            e.stopPropagation()
          }}
        >
          {/* {BACKGROUND_OPTIONS[0].component} */}
          <div
            className={`bg-gradient-to-r ${containerStyle.frameGradient!.value} p-2 w-full h-full`}
          >
            <div className="w-full h-full p-4  rounded-lg">
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

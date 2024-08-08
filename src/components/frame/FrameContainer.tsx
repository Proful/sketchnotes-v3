import { useRef } from "react"
import Draggable from "react-draggable"

import useStore from "../Store"

export function FrameContainer() {
  const nodeRef = useRef(null)
  const setSelectedContainerType = useStore(
    (state) => state.setSelectedContainerType
  )
  const frame = useStore((state) => state.frame)

  if (!frame || !frame.frameResolution) {
    return
  }
  const { w, h } = frame.frameResolution!

  return (
    <>
      <img id="screenshot" style={{ display: "none" }} />
      <Draggable nodeRef={nodeRef}>
        <div
          className={`w-[${w}px] h-[${h}px] absolute border-4 z-90`}
          ref={nodeRef}
          onClick={(e) => {
            setSelectedContainerType("FRAME")
            e.stopPropagation()
          }}
        >
          <div
            className={`bg-gradient-to-r ${frame.frameGradient} w-full h-full`}
            style={{ padding: frame.padding + "%" }}
          >
            <div
              className={`w-full h-full ${frame.backgroundColor} ${frame.borderRadius} relative`}
            >
              {frame.enable3dots && (
                <div className="absolute top-3 left-3 flex space-x-2">
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

// <div className=`w-full h-full p-4  rounded-lg">
// </div>{" "}
// const takeScreenshot = () => {
//   var node = document.getElementById("root")
//
//   htmlToImage
//     .toPng(node!)
//     .then(function (dataUrl) {
//       var img = new Image()
//       img.src = dataUrl
//       document.body.appendChild(img)
//     })
//     .catch(function (error) {
//       console.error("oops, something went wrong!", error)
//     })
// }

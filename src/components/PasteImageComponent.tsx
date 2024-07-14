import React, { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"

const PasteImageComponent: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const pasteRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (items) {
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const blob = item.getAsFile()
            if (blob) {
              const reader = new FileReader()
              reader.onload = (e) => {
                if (e.target?.result) {
                  setImageSrc(e.target.result as string)
                }
              }
              reader.readAsDataURL(blob)
            }
          }
        }
      }
    }

    const ref = pasteRef.current
    if (ref) {
      ref.addEventListener("paste", handlePaste)
    }

    return () => {
      if (ref) {
        ref.removeEventListener("paste", handlePaste)
      }
    }
  }, [])

  return (
    <Draggable nodeRef={pasteRef}>
      <div
        ref={pasteRef}
        contentEditable={true}
        className="p-4  w-fit"
        style={{ minHeight: "150px" }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Pasted content"
            className="max-w-[200px] h-auto"
          />
        ) : (
          "Paste an image here"
        )}
      </div>
    </Draggable>
  )
}

export default PasteImageComponent

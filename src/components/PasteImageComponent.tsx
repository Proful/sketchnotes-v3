import { useEffect, useRef } from "react"
import Draggable from "react-draggable"

const PasteImageComponent = ({
  onPaste,
}: {
  onPaste: (img: string) => void
}) => {
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
                  onPaste(e.target.result as string)
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
      <div ref={pasteRef} className="absolute top-10">
        <div className="relative bg-gradient-to-br z-20 dark:text-gray-400/80  dark:from-stone-800 dark:to-stone-800/85 backdrop-xl backdrop-blur-md rounded-2xl place-content-center flex flex-col item-center justify-center shadow-[0_0_16px_rgba(0,0,0,0.15)] w-[400px] h-[400px]">
          <div
            className="p-4 mx-auto max-w-[500px] w-full h-full text-center place-content-center outline-none"
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            Paste your image here
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default PasteImageComponent

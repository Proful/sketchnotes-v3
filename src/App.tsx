import { useState } from "react"

import { DEFAULT_SCALE } from "@/lib/constants"
import { ContainerType, ShapeType } from "@/lib/types"
import Actions from "@/components/Actions"
import { FrameContainer } from "@/components/frame/FrameContainer"
import { IconContainer } from "@/components/icon/IconContainer"
import LexContainer from "@/components/lex/LexContainer"
import { ShapeContainer } from "@/components/shape/ShapeContainer"
import Sidebar from "@/components/Sidebar"
import { ThemeProvider } from "@/components/theme-provider"

import HikeContainer from "./components/hike/HikeContainer"
import { ImageContainer } from "./components/image/ImageContainer"
import PasteImageComponent from "./components/PasteImageComponent"
import useStore from "./components/Store"
import { Separator } from "./components/ui/separator"

// fixed allows to cover all visible area and attach click handler
function App() {
  const [screenshotFrame, setScreenshotFrame] = useState<boolean>(false)
  const [showPasteImagePanel, setShowPasteImagePanel] = useState<boolean>(false)
  const setSelectedContainerType = useStore(
    (state) => state.setSelectedContainerType
  )
  const setSelectedId = useStore((state) => state.setSelectedId)
  const selectedId = useStore((state) => state.selectedId)

  const icons = useStore((state) => state.icons)
  const createIcon = useStore((state) => state.createIcon)
  const deleteIcon = useStore((state) => state.deleteIcon)
  const copyIcon = useStore((state) => state.copyIcon)

  const shapes = useStore((state) => state.shapes)
  const createShape = useStore((state) => state.createShape)
  const deleteShape = useStore((state) => state.deleteShape)

  const lexes = useStore((state) => state.lexes)
  const createLex = useStore((state) => state.createLex)
  const deleteLex = useStore((state) => state.deleteLex)

  const hikes = useStore((state) => state.hikes)
  const createHike = useStore((state) => state.createHike)
  const deleteHike = useStore((state) => state.deleteHike)

  const images = useStore((state) => state.images)
  const createImage = useStore((state) => state.createImage)
  const deleteImage = useStore((state) => state.deleteImage)

  const frame = useStore((state) => state.frame)
  const createFrame = useStore((state) => state.createFrame)

  function handleContainerCreate(
    containerType: ContainerType,
    subType?: string | undefined
  ): void {
    const uuid = Math.random()
    if (containerType === "HIKE") {
      createHike(uuid)
    } else if (containerType === "LEX") {
      createLex(uuid)
    } else if (containerType === "ICON") {
      createIcon(uuid, subType!)
    } else if (containerType === "SHAPE") {
      createShape(uuid, subType! as ShapeType)
    } else if (containerType === "FRAME") {
      if (screenshotFrame) {
        setSelectedContainerType("NONE")
      } else {
        setSelectedContainerType("FRAME")
        createFrame()
      }
      setScreenshotFrame(!screenshotFrame)
    } else if (containerType === "IMAGE") {
      if (showPasteImagePanel) {
        setSelectedContainerType("NONE")
      } else {
        setSelectedContainerType("IMAGE")
      }
      setShowPasteImagePanel(!showPasteImagePanel)
    }
  }

  function handleDelete(): void {
    deleteIcon(selectedId!)
    deleteShape(selectedId!)
    deleteLex(selectedId!)
    deleteHike(selectedId!)
    deleteImage(selectedId!)
  }

  function reset() {
    setSelectedId(null)
    setSelectedContainerType("NONE")
  }

  const style = {
    transform: `scale(${frame?.scale || DEFAULT_SCALE})`,
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mr-64 p-8 h-full w-full fixed" onClick={reset}>
        {showPasteImagePanel && (
          <PasteImageComponent
            onPaste={(d) => {
              setShowPasteImagePanel(false)
              createImage(Math.random(), d)
            }}
          />
        )}
        {screenshotFrame && <FrameContainer />}
        <div style={style}>
          {Object.values(shapes).map((shape) => (
            <ShapeContainer key={shape.id} id={shape.id} />
          ))}
          {Object.values(icons).map((icon, i) => (
            <IconContainer key={i} id={icon.id} />
          ))}
          {Object.values(lexes).map((lex) => (
            <LexContainer key={lex.id} id={lex.id} />
          ))}
          {Object.values(hikes).map((hike) => (
            <HikeContainer key={hike.id} id={hike.id} />
          ))}
          {Object.values(images).map((image) => (
            <ImageContainer key={image.id} id={image.id} />
          ))}
        </div>
      </div>
      <div className="fixed top-0 right-0 h-full w-72 text-white shadow-lg overflow-scroll bg-sidebar">
        <nav className="mt-0" style={{ transform: "scale(1)" }}>
          <Actions
            onContainerCreate={handleContainerCreate}
            onDelete={handleDelete}
            onCopy={() => {
              copyIcon()
            }}
          />
          <Separator className="bg-gray-700/90 mb-2" />

          <Sidebar />
        </nav>
      </div>
    </ThemeProvider>
  )
}
export default App

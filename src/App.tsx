import { useState } from "react"

import { DEFAULT_CONTAINER_TYPE, DEFAULT_SCALE } from "@/lib/constants"
import { Action, ContainerType, ShapeType } from "@/lib/types"
import Actions from "@/components/Actions"
import { FrameContainer } from "@/components/frame/FrameContainer"
import { IconContainer } from "@/components/icon/IconContainer"
import LexContainer from "@/components/lex/LexContainer"
import { ShapeContainer } from "@/components/shape/ShapeContainer"
import Sidebar from "@/components/Sidebar"
import { ThemeProvider } from "@/components/theme-provider"

import HikeContainer from "./components/hike/HikeContainer"
import useStore from "./components/Store"

// fixed allows to cover all visible area and attach click handler
function App() {
  const [scale, setScale] = useState(DEFAULT_SCALE)
  const [action, setAction] = useState<Action | null>(null)
  const [hikeList, setHikeList] = useState<number[]>([])
  const [lexList, setLexList] = useState<number[]>([])
  const [screenshotFrame, setScreenshotFrame] = useState<boolean>(false)
  const [containerType, setContainerType] = useState<ContainerType>(
    DEFAULT_CONTAINER_TYPE
  )
  const setSelectedId = useStore((state) => state.setSelectedId)
  const selectedId = useStore((state) => state.selectedId)
  const icons = useStore((state) => state.icons)
  const createIcon = useStore((state) => state.createIcon)
  const deleteIcon = useStore((state) => state.deleteIcon)

  const shapes = useStore((state) => state.shapes)
  const createShape = useStore((state) => state.createShape)
  const deleteShape = useStore((state) => state.deleteShape)

  function handleContainerCreate(
    containerType: ContainerType,
    subType?: string | undefined
  ): void {
    const uuid = Math.random()
    if (containerType === "HIKE") {
      setHikeList([...hikeList, uuid])
    } else if (containerType === "LEX") {
      setLexList([...lexList, uuid])
    } else if (containerType === "ICON") {
      createIcon(uuid, subType!)
    } else if (containerType === "SHAPE") {
      createShape(uuid, subType! as ShapeType)
    } else if (containerType === "FRAME") {
      setScreenshotFrame(!screenshotFrame)
      setContainerType("FRAME")
    }
  }

  function handleDelete(): void {
    deleteIcon(selectedId!)
    deleteShape(selectedId!)
    const hikeListUpd = hikeList.filter((hike) => hike !== selectedId)
    setHikeList(hikeListUpd)
    const lexListUpd = lexList.filter((lex) => lex !== selectedId)
    setLexList(lexListUpd)
  }

  function reset() {
    setSelectedId(null)
    setContainerType("NONE")
  }

  const style = {
    transform: `scale(${scale})`,
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mr-64 p-8 h-full w-full fixed" onClick={reset}>
        {screenshotFrame && (
          <FrameContainer action={action} onSelect={setContainerType} />
        )}
        <div style={style}>
          {Object.values(shapes).map((shape) => (
            <ShapeContainer key={shape.id} id={shape.id} />
          ))}
          {Object.values(icons).map((icon) => (
            <IconContainer key={icon.id} id={icon.id} />
          ))}
          {lexList.map((id) => (
            <LexContainer
              action={action}
              key={id}
              id={id}
              selectedId={selectedId as number}
              onSelect={(id, containerType) => {
                setSelectedId(id)
                setContainerType(containerType)
              }}
            />
          ))}
          {hikeList.map((id) => (
            <HikeContainer
              action={action}
              key={id}
              id={id}
              selectedId={selectedId as number}
              onSelect={(id, containerType) => {
                setSelectedId(id)
                setContainerType(containerType)
              }}
            />
          ))}
        </div>
      </div>
      <div className="fixed top-0 right-0 h-full w-64 text-white shadow-lg overflow-scroll bg-sidebar">
        <nav className="mt-0" style={{ transform: "scale(1)" }}>
          <Actions
            onContainerCreate={handleContainerCreate}
            onDelete={handleDelete}
            onScale={setScale}
          />

          <Sidebar
            onAction={(action) => {
              if (action?.name === "SCALE") {
                setScale(action.value as number)
              }
              setAction(action)
            }}
            containerType={containerType}
          />
        </nav>
      </div>
    </ThemeProvider>
  )
}
export default App

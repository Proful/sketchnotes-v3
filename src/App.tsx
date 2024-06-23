import { useState } from "react"

import { DEFAULT_CONTAINER_TYPE, DEFAULT_SHAPE_TYPE } from "@/lib/constants"
import { Action, ContainerType, ShapeType } from "@/lib/types"
import { FrameContainer } from "@/components/frame/FrameContainer"
import { IconContainer } from "@/components/icon/IconContainer"
import LexContainer from "@/components/lex/LexContainer"
import { ShapeContainer } from "@/components/shape/ShapeContainer"
import Sidebar from "@/components/Sidebar"
import { ThemeProvider } from "@/components/theme-provider"

import Actions from "./components/Actions"

type Icon = {
  name: string
  id: number
}
type Shape = {
  name: ShapeType
  id: number
}
// fixed allows to cover all visible area and attach click handler
function App() {
  const [action, setAction] = useState<Action | null>(null)
  const [lexList, setLexList] = useState<number[]>([])
  const [iconList, setIconList] = useState<Icon[]>([])
  const [shapeList, setShapeList] = useState<Shape[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [screenshotFrame, setScreenshotFrame] = useState<boolean>(false)
  const [containerType, setContainerType] = useState<ContainerType>(
    DEFAULT_CONTAINER_TYPE
  )
  const [shapeType, setShapeType] = useState<ShapeType>(DEFAULT_SHAPE_TYPE)

  function handleContainerCreate(
    containerType: ContainerType,
    subType?: string | undefined
  ): void {
    const uuid = Math.random()
    if (containerType === "LEX") {
      setLexList([...lexList, uuid])
    } else if (containerType === "ICON") {
      setIconList([...iconList, { name: subType!, id: uuid }])
    } else if (containerType === "SHAPE") {
      setContainerType("SHAPE")
      setShapeType(subType! as ShapeType)
      setShapeList([...shapeList, { name: subType! as ShapeType, id: uuid }])
    } else if (containerType === "FRAME") {
      setScreenshotFrame(!screenshotFrame)
      setContainerType("FRAME")
    }
  }

  function handleDelete(): void {
    const lexListUpd = lexList.filter((lex) => lex !== selectedId)
    setLexList(lexListUpd)
    const iconListUpd = iconList.filter((icon) => icon.id !== selectedId)
    setIconList(iconListUpd)
    const shapeListUpd = shapeList.filter((shape) => shape.id !== selectedId)
    setShapeList(shapeListUpd)
  }

  function reset() {
    setSelectedId(null)
    setContainerType("NONE")
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mr-64 p-8 h-full w-full fixed" onClick={reset}>
        {screenshotFrame && (
          <FrameContainer action={action} onSelect={setContainerType} />
        )}
        {shapeList.map((shape) => (
          <ShapeContainer
            name={shape.name}
            key={shape.id}
            id={shape.id}
            selectedId={selectedId}
            action={action}
            onSelect={(id, containerType) => {
              setSelectedId(id)
              setContainerType(containerType)
            }}
          />
        ))}
        {iconList.map((icon) => (
          <IconContainer
            action={action}
            key={icon.id}
            name={icon.name}
            id={icon.id}
            selectedId={selectedId}
            onSelect={(id, containerType) => {
              setSelectedId(id)
              setContainerType(containerType)
            }}
          />
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
      </div>
      <div className="fixed top-0 right-0 h-full w-64 bg-blue-800 text-white shadow-lg">
        <nav className="mt-8">
          <Actions
            onContainerCreate={handleContainerCreate}
            onDelete={handleDelete}
          />

          <Sidebar
            onAction={setAction}
            containerType={containerType}
            shapeType={shapeType}
          />
        </nav>
      </div>
    </ThemeProvider>
  )
}

export default App

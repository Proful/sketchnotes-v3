import { Action, ContainerType, ShapeType } from "@/lib/types"
import IconOptions from "@/components/icon/IconOptions"
import LexOptions from "@/components/lex/LexOptions"

import FrameOptions from "./frame/FrameOptions"
import ShapeOptions from "./shape/ShapeOptions"

type SidebarProps = {
  containerType: ContainerType
  shapeType?: ShapeType
  onAction: (action: Action) => void
}
export default function Sidebar({
  containerType,
  shapeType = "RECT",
  onAction,
}: SidebarProps) {
  if (containerType === "LEX") {
    return <LexOptions onAction={onAction} />
  } else if (containerType === "ICON") {
    return <IconOptions onAction={onAction} />
  } else if (containerType === "SHAPE") {
    return <ShapeOptions onAction={onAction} shapeType={shapeType} />
  } else if (containerType === "FRAME") {
    return <FrameOptions onAction={onAction} />
  } else {
    return <></>
  }
}

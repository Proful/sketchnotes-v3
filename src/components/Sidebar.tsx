import { Action, ContainerType } from "@/lib/types"
import IconOptions from "@/components/icon/IconOptions"
import LexOptions from "@/components/lex/LexOptions"

import FrameOptions from "./frame/FrameOptions"
import HikeOptions from "./hike/HikeOptions"
import ShapeOptions from "./shape/ShapeOptions"
import useStore from "./Store"

type SidebarProps = {
  containerType: ContainerType
  onAction: (action: Action) => void
}
export default function Sidebar({ containerType, onAction }: SidebarProps) {
  const selectedContainerType = useStore((state) => state.selectedContainerType)
  if (containerType === "LEX") {
    return <LexOptions onAction={onAction} />
  } else if (containerType === "HIKE") {
    return <HikeOptions onAction={onAction} />
  } else if (selectedContainerType === "ICON") {
    return <IconOptions />
  } else if (selectedContainerType === "SHAPE") {
    return <ShapeOptions />
  } else if (containerType === "FRAME") {
    return <FrameOptions onAction={onAction} />
  } else {
    return <></>
  }
}

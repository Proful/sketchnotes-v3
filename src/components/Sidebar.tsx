import IconOptions from "@/components/icon/IconOptions"
import LexOptions from "@/components/lex/LexOptions"

import FrameOptions from "./frame/FrameOptions"
import HikeOptions from "./hike/HikeOptions"
import ImageOptions from "./image/ImageOptions"
import ShapeOptions from "./shape/ShapeOptions"
import useStore from "./Store"

export default function Sidebar() {
  const selectedContainerType = useStore((state) => state.selectedContainerType)
  if (selectedContainerType === "LEX") {
    return <LexOptions />
  } else if (selectedContainerType === "HIKE") {
    return <HikeOptions />
  } else if (selectedContainerType === "ICON") {
    return <IconOptions />
  } else if (selectedContainerType === "SHAPE") {
    return <ShapeOptions />
  } else if (selectedContainerType === "FRAME") {
    return <FrameOptions />
  } else if (selectedContainerType === "IMAGE") {
    return <ImageOptions />
  } else {
    return <></>
  }
}

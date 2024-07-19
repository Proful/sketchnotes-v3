import { Options as RoughOptions } from "roughjs/bin/core"
import { create } from "zustand"
import zustymiddlewarets from "zustymiddlewarets"

import {
  DEFAULT_ARROW_BOW,
  DEFAULT_ARROW_FLIP,
  DEFAULT_ARROW_HEAD_SIZE,
  DEFAULT_ARROW_HEIGHT,
  DEFAULT_ARROW_MAX_STRETCH,
  DEFAULT_ARROW_MIN_STRETCH,
  DEFAULT_ARROW_PAD_END,
  DEFAULT_ARROW_PAD_START,
  DEFAULT_ARROW_STRAIGHTS,
  DEFAULT_ARROW_STRETCH,
  DEFAULT_ARROW_WIDTH,
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_LINE_WIDTH,
  DEFAULT_LINE2_DIRECTION,
  DEFAULT_LINE2_WIDTH,
  DEFAULT_RECT_HEIGHT,
  DEFAULT_RECT_WIDTH,
  DEFAULT_ROUGH_OPTIONS,
  DEFAULT_SHAPE_FILL,
  DEFAULT_SHAPE_ROTATE,
} from "@/lib/constants"
import { ContainerType, ShapeType } from "@/lib/types"

interface Icon {
  id: number
  name: string
  iconSize: number
  iconColor: string
  iconRotate: number
}

export interface Shape {
  id: number
  name: ShapeType
  rectWidth?: number
  rectHeight?: number
  shapeFill?: string
  lineWidth?: number
  shapeRotate?: number
  line2Width?: number
  line2Direction?: "TOP-LEFT" | "TOP-RIGHT" | "BOTTOM-LEFT" | "BOTTOM-RIGHT"
  borderWidth?: number
  borderColor?: string
  borderRadius?: string
  arrowHeight?: number
  arrowWidth?: number
  arrowBow?: number
  arrowStretch?: number
  arrowMinStretch?: number
  arrowMaxStretch?: number
  arrowPadStart?: number
  arrowPadEnd?: number
  arrowFlip?: boolean
  arrowStraights?: boolean
  arrowHeadSize?: number
  roughOptions?: RoughOptions
}

interface Store {
  icons: { [id: number]: Icon }
  shapes: { [id: number]: Shape }
  selectedId: number | null
  selectedContainerType: ContainerType | null
  setSelectedId: (id: number | null) => void
  setSelectedContainerType: (containerType: ContainerType) => void
  updateIconProperty: (
    id: number,
    property: keyof Icon,
    value: string | number
  ) => void
  createIcon: (id: number, name: string) => void
  deleteIcon: (id: number) => void
  updateShapeProperty: (
    id: number,
    property: keyof Shape,
    value: string | number | boolean
  ) => void
  createShape: (id: number, name: ShapeType) => void
  deleteShape: (id: number) => void
}

const useStore = create<Store>(
  zustymiddlewarets((set) => ({
    icons: {},
    shapes: {},
    selectedId: null,
    selectedContainerType: null,
    setSelectedId: (id) => set({ selectedId: id }),
    setSelectedContainerType: (containerType) =>
      set({ selectedContainerType: containerType }),
    updateIconProperty: (id, property, value) =>
      set((state) => ({
        icons: {
          ...state.icons,
          [id]: {
            ...state.icons[id],
            [property]: value,
          },
        },
      })),
    createIcon: (id, name) =>
      set((state) => ({
        icons: {
          ...state.icons,
          [id]: {
            id,
            name,
            iconSize: 24,
            iconColor: "#000000",
            iconRotate: 0,
          },
        },
      })),
    deleteIcon: (id) =>
      set((state) => {
        const newIcons = { ...state.icons }
        delete newIcons[id]
        return {
          icons: newIcons,
          selectedId: state.selectedId === id ? null : state.selectedId,
        }
      }),
    updateShapeProperty: (id, property, value) =>
      set((state) => ({
        shapes: {
          ...state.shapes,
          [id]: {
            ...state.shapes[id],
            [property]: value,
          },
        },
      })),
    createShape: (id, name) => {
      const defaultProps = defaultShapeProps(name)
      //@ts-ignore
      set((state) => ({
        shapes: {
          ...state.shapes,
          [id]: {
            id,
            name,
            ...defaultProps,
          },
        },
      }))
    },
    deleteShape: (id) =>
      set((state) => {
        const newShapes = { ...state.shapes }
        delete newShapes[id]
        return {
          shapes: newShapes,
          selectedId: state.selectedId === id ? null : state.selectedId,
        }
      }),
  }))
)

function defaultShapeProps(name: ShapeType) {
  if (name === "RECT") {
    return {
      borderWidth: DEFAULT_BORDER_WIDTH,
      borderRadius: DEFAULT_BORDER_RADIUS,
      rectWidth: DEFAULT_RECT_WIDTH,
      rectHeight: DEFAULT_RECT_HEIGHT,
      borderColor: DEFAULT_BORDER_COLOR,
      shapeFill: DEFAULT_SHAPE_FILL,
    }
  } else if (name === "LINE") {
    return {
      borderWidth: DEFAULT_BORDER_WIDTH,
      borderColor: DEFAULT_BORDER_COLOR,
      lineWidth: DEFAULT_LINE_WIDTH,
    }
  } else if (name === "ARROW") {
    return {
      borderColor: DEFAULT_BORDER_COLOR,
      shapeFill: DEFAULT_SHAPE_FILL,
      shapeRotate: DEFAULT_SHAPE_ROTATE,
      arrowHeadSize: DEFAULT_ARROW_HEAD_SIZE,
      arrowHeight: DEFAULT_ARROW_HEIGHT,
      arrowWidth: DEFAULT_ARROW_WIDTH,
      arrowBow: DEFAULT_ARROW_BOW,
      arrowStretch: DEFAULT_ARROW_STRETCH,
      arrowMinStretch: DEFAULT_ARROW_MIN_STRETCH,
      arrowMaxStretch: DEFAULT_ARROW_MAX_STRETCH,
      arrowPadStart: DEFAULT_ARROW_PAD_START,
      arrowPadEnd: DEFAULT_ARROW_PAD_END,
      arrowFlip: DEFAULT_ARROW_FLIP,
      arrowStraights: DEFAULT_ARROW_STRAIGHTS,
    }
  } else if (name === "ELLIPSE") {
  } else if (name === "POLYGON") {
  } else if (name === "LINE-LINE") {
    return {
      borderWidth: DEFAULT_BORDER_WIDTH,
      borderColor: DEFAULT_BORDER_COLOR,
      lineWidth: DEFAULT_LINE_WIDTH,
      line2Width: DEFAULT_LINE2_WIDTH,
      shapeRotate: DEFAULT_SHAPE_ROTATE,
    }
  } else if (name === "ROUGH-RECT") {
    return {
      rectWidth: DEFAULT_RECT_WIDTH,
      rectHeight: DEFAULT_RECT_HEIGHT,
      roughOptons: DEFAULT_ROUGH_OPTIONS,
    }
  } else if (name === "ROUGH-LINE") {
  } else if (name === "LINE-CIRCLE") {
    return {
      borderWidth: DEFAULT_BORDER_WIDTH,
      borderColor: DEFAULT_BORDER_COLOR,
      lineWidth: DEFAULT_LINE_WIDTH,
      shapeRotate: DEFAULT_SHAPE_ROTATE,
    }
  } else if (name === "LINE-LINE-V2") {
    return {
      borderWidth: DEFAULT_BORDER_WIDTH,
      borderColor: DEFAULT_BORDER_COLOR,
      lineWidth: DEFAULT_LINE_WIDTH,
      line2Width: DEFAULT_LINE2_WIDTH,
      shapeRotate: DEFAULT_SHAPE_ROTATE,
      line2Direction: DEFAULT_LINE2_DIRECTION,
    }
  } else if (name === "ROUGH-CIRCLE") {
  } else if (name === "ROUGH-ELLIPSE") {
  }
}

declare global {
  interface Window {
    store: typeof useStore
  }
}

window.store = useStore
export default useStore

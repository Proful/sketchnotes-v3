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
  DEFAULT_BORDER_DIRECTION,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_STYLE,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_BOX_SHADOW,
  DEFAULT_CODE_LANGUAGE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FRAME_GRADIENT,
  DEFAULT_FRAME_RESOLUTION,
  DEFAULT_LEX_PADDING,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_LINE_WIDTH,
  DEFAULT_LINE2_DIRECTION,
  DEFAULT_LINE2_WIDTH,
  DEFAULT_RECT_HEIGHT,
  DEFAULT_RECT_WIDTH,
  DEFAULT_ROUGH_OPTIONS,
  DEFAULT_SCALE,
  DEFAULT_SHAPE_FILL,
  DEFAULT_SHAPE_ROTATE,
  DEFAULT_TAILWIND_COLOR,
} from "@/lib/constants"
import { ContainerType, NameValuePair, ShapeType } from "@/lib/types"

export interface Image {
  id: number
  data: string
}

export interface Frame {
  frameGradient?: NameValuePair
  frameResolution?: { w: number; h: number }
  enable3dots?: boolean
  scale?: number
}

export interface Hike {
  id: number
  codeLanguage?: string
  preview?: boolean
  backgroundColor?: string
  padding?: number
  borderRadius?: string
}

export interface Lex {
  id: number
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  lineHeight?: string
  borderWidth?: number
  borderRadius?: string
  borderStyle?: string
  borderDirection?: "ALL" | "TOP" | "BOTTOM" | "LEFT" | "RIGHT"
  borderColor?: string
  color?: string
  backgroundColor?: string
  decorationColor?: string
  boxColor?: string
  highlightColor?: string
  padding?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  boxShadow?: string
  codeLanguage?: string
  textGradient?: string
}

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
  lexes: { [id: number]: Lex }
  hikes: { [id: number]: Hike }
  images: { [id: number]: Image }
  frame: Frame
  selectedId: number | null
  selectedContainerType: ContainerType | null
  selectedActionType:
    | keyof Lex
    | keyof Hike
    | keyof Image
    | keyof Icon
    | keyof Shape
    | null
  seed: number | null
  setSelectedId: (id: number | null) => void
  setSelectedContainerType: (containerType: ContainerType) => void
  setSelectedActionType: (actionType: keyof Lex) => void
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
  updateLexProperty: (
    id: number,
    property: keyof Lex,
    value: string | number | boolean
  ) => void
  createLex: (id: number) => void
  deleteLex: (id: number) => void
  updateHikeProperty: (
    id: number,
    property: keyof Hike,
    value: string | number | boolean
  ) => void
  createHike: (id: number) => void
  deleteHike: (id: number) => void
  updateFrameProperty: (
    property: keyof Frame,
    value: string | number | boolean | NameValuePair | { w: number; h: number }
  ) => void
  createFrame: () => void
  updateImageProperty: (
    id: number,
    property: keyof Image,
    value: string | number | boolean
  ) => void
  createImage: (id: number, data: string) => void
  deleteImage: (id: number) => void
}

const useStore = create<Store>(
  zustymiddlewarets((set) => ({
    icons: {},
    shapes: {},
    lexes: {},
    hikes: {},
    images: {},
    frame: {},
    selectedId: null,
    selectedContainerType: null,
    selectedActionType: null,
    selectedTarget: null,
    seed: null,
    setSelectedId: (id) => set({ selectedId: id }),
    setSelectedContainerType: (containerType) =>
      set({ selectedContainerType: containerType }),
    setSelectedActionType: (actionType) =>
      set({ selectedActionType: actionType }),
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
    updateLexProperty: (id, property, value) => {
      set((state) => ({
        selectedActionType: property,
        seed: Math.random(),
        lexes: {
          ...state.lexes,
          [id]: {
            ...state.lexes[id],
            [property]: value,
          },
        },
      }))
    },
    createLex: (id) => {
      const defaultProps = defaultLexProps()
      //@ts-ignore
      set((state) => ({
        lexes: {
          ...state.lexes,
          [id]: {
            id,
            ...defaultProps,
          },
        },
      }))
    },
    deleteLex: (id) =>
      set((state) => {
        const newLexs = { ...state.lexes }
        delete newLexs[id]
        return {
          lexes: newLexs,
          selectedId: state.selectedId === id ? null : state.selectedId,
        }
      }),
    updateHikeProperty: (id, property, value) => {
      set((state) => ({
        selectedActionType: property,
        seed: Math.random(),
        hikes: {
          ...state.hikes,
          [id]: {
            ...state.hikes[id],
            [property]: value,
          },
        },
      }))
    },
    createHike: (id) => {
      const defaultProps = defaultHikeProps()
      //@ts-ignore
      set((state) => ({
        hikes: {
          ...state.hikes,
          [id]: {
            id,
            ...defaultProps,
          },
        },
      }))
    },
    deleteHike: (id) =>
      set((state) => {
        const newHikes = { ...state.hikes }
        delete newHikes[id]
        return {
          hikes: newHikes,
          selectedId: state.selectedId === id ? null : state.selectedId,
        }
      }),
    createFrame: () => {
      //@ts-ignore
      set((state) => ({
        frame: {
          frameGradient: DEFAULT_FRAME_GRADIENT,
          frameResolution: DEFAULT_FRAME_RESOLUTION,
          enable3dots: true,
          scale: DEFAULT_SCALE,
        },
      }))
    },
    updateFrameProperty: (property, value) => {
      //@ts-ignore
      set((state) => ({
        selectedActionType: property,
        seed: Math.random(),
        frame: {
          ...state.frame,
          [property]: value,
        },
      }))
    },
    updateImageProperty: (id, property, value) => {
      set((state) => ({
        selectedActionType: property,
        seed: Math.random(),
        images: {
          ...state.images,
          [id]: {
            ...state.images[id],
            [property]: value,
          },
        },
      }))
    },
    createImage: (id, data) => {
      //@ts-ignore
      set((state) => ({
        images: {
          ...state.images,
          [id]: {
            id,
            data,
          },
        },
      }))
    },
    deleteImage: (id) =>
      set((state) => {
        const newImages = { ...state.images }
        delete newImages[id]
        return {
          images: newImages,
          selectedId: state.selectedId === id ? null : state.selectedId,
        }
      }),
  }))
)

function defaultHikeProps() {
  return {
    codeLanguage: DEFAULT_CODE_LANGUAGE,
  }
}

function defaultLexProps() {
  return {
    fontSize: DEFAULT_FONT_SIZE,
    fontWeight: DEFAULT_FONT_WEIGHT,
    fontFamily: DEFAULT_FONT_FAMILY,
    lineHeight: DEFAULT_LINE_HEIGHT,
    borderWidth: DEFAULT_BORDER_WIDTH,
    borderRadius: DEFAULT_BORDER_RADIUS,
    borderStyle: DEFAULT_BORDER_STYLE,
    borderColor: DEFAULT_BORDER_COLOR,
    borderDirection: DEFAULT_BORDER_DIRECTION,
    paddingTop: DEFAULT_LEX_PADDING,
    paddingBottom: DEFAULT_LEX_PADDING,
    paddingLeft: DEFAULT_LEX_PADDING,
    paddingRight: DEFAULT_LEX_PADDING,
    padding: DEFAULT_LEX_PADDING,
    boxShadow: DEFAULT_BOX_SHADOW,
    lexBackgroundColor: DEFAULT_TAILWIND_COLOR,
  }
}

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

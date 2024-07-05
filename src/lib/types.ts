import { Options as RoughOptions } from "roughjs/bin/core"

export type ActionType =
  | "BOLD"
  | "CODE"
  | "HIGHLIGHT"
  | "ITALIC"
  | "UNDERLINE"
  | "STRIKETHROUGH"
  | "TEXT-GRADIENT"
  | "COLOR"
  | "DECORATION-COLOR"
  | "BACKGROUND-COLOR" // single char
  | "LEX-BACKGROUND-COLOR" // entire box
  | "H1"
  | "H2"
  | "H3"
  | "QUOTE"
  | "FONT-SIZE"
  | "FONT-WEIGHT"
  | "FONT-FAMILY"
  | "LINE-HEIGHT"
  | "BORDER-WIDTH"
  | "BORDER-RADIUS"
  | "BORDER-STYLE"
  | "BORDER-DIRECTION"
  | "BORDER-COLOR"
  | "LEX-PADDING"
  | "LEX-PADDING-TOP"
  | "LEX-PADDING-BOTTOM"
  | "LEX-PADDING-LEFT"
  | "LEX-PADDING-RIGHT"
  | "LEX-CODE-HIGHLIGHT"
  | "ICON-SIZE"
  | "ICON-ROTATE"
  | "RECT-WIDTH"
  | "RECT-HEIGHT"
  | "SHAPE-FILL"
  | "LINE-WIDTH"
  | "LINE2-WIDTH"
  | "LINE2-DIRECTION"
  | "SHAPE-ROTATE"
  | "FRAME-GRADIENT"
  | "FRAME-RESOLUTION"
  | "SCREENSHOT"
  | "ENABLE-3DOTS"
  | "ARROW-HEIGHT"
  | "ARROW-WIDTH"
  | "ARROW-HEAD-SIZE"
  | "ARROW-BOW"
  | "ARROW-STRETCH"
  | "ARROW-MIN-STRETCH"
  | "ARROW-MAX-STRETCH"
  | "ARROW-PAD-START"
  | "ARROW-PAD-END"
  | "ARROW-FLIP"
  | "ARROW-STRAIGHTS"
  | "ROUGH-MAX-RANDOMNESS-OFFSET"
  | "ROUGH-ROUGHNESS"
  | "ROUGH-BOWING"
  | "ROUGH-STROKE"
  | "ROUGH-STROKE-WIDTH"
  | "ROUGH-CURVE-FITTING"
  | "ROUGH-CURVE-TIGHTNESS"
  | "ROUGH-CURVE-STEP-COUNT"
  | "ROUGH-FILL"
  | "ROUGH-FILL-STYLE"
  | "ROUGH-FILL-WEIGHT"
  | "ROUGH-HACHURE-ANGLE"
  | "ROUGH-HACHURE-GAP"
  | "ROUGH-SIMPLIFICATION"
  | "ROUGH-DASH-OFFSET"
  | "ROUGH-DASH-GAP"
  | "ROUGH-ZIGZAG-OFFSET"
  | "ROUGH-SEED"
  | "ROUGH-STROKE-LINE-DASH"
  | "ROUGH-STROKE-LINE-DASH-OFFSET"
  | "ROUGH-FILL-LINE-DASH"
  | "ROUGH-FILL-LINE-DASH-OFFSET"
  | "ROUGH-DISABLE-MULTI-STROKE"
  | "ROUGH-DISABLE-MULTI-STROKE-FILL"
  | "ROUGH-PRESERVE-VERTICES"
  | "ROUGH-FIXED-DECIMAL-PLACE-DIGITS"
  | "ROUGH-FILL-SHAPE-ROUGHNESS-GAIN"

export type Action = {
  name: ActionType
  seed: number
  value?: string | number | boolean | NameValuePair
}
export type NameValuePair = { name: string; value: string }
export type ContainerType = "LEX" | "ICON" | "SHAPE" | "FRAME" | "NONE"
export type ShapeType =
  | "RECT"
  | "ELLIPSE"
  | "POLYGON"
  | "LINE"
  | "LINE-CIRCLE"
  | "LINE-LINE"
  | "LINE-LINE-V2"
  | "ARROW"
  | "ROUGH-RECT"
  | "ROUGH-CIRCLE"
  | "ROUGH-ELLIPSE"
  | "ROUGH-LINE"
export type ContainerStyle = {
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  lineHeight?: string
  borderWidth?: number
  borderRadius?: string
  borderStyle?: string
  borderDirection?: "ALL" | "TOP" | "BOTTOM" | "LEFT" | "RIGHT"
  borderColor?: string
  lexBackgroundColor?: string
  padding?: number
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  iconSize?: number
  iconColor?: string
  iconRotate?: number
  rectWidth?: number
  rectHeight?: number
  shapeFill?: string
  lineWidth?: number
  shapeRotate?: number
  line2Width?: number
  line2Direction?: "TOP-LEFT" | "TOP-RIGHT" | "BOTTOM-LEFT" | "BOTTOM-RIGHT"
  frameGradient?: NameValuePair
  frameResolution?: { w: number; h: number }
  enable3dots?: boolean
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

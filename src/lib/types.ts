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
  | "BACKGROUND-COLOR"
  | "H1"
  | "H2"
  | "H3"
  | "QUOTE"
  | "FONT-SIZE"
  | "FONT-FAMILY"
  | "BORDER-WIDTH"
  | "BORDER-RADIUS"
  | "BORDER-STYLE"
  | "BORDER-COLOR"
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

export type Action = {
  name: ActionType
  seed: number
  value?: string | number | boolean | NameValuePair
}
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
export type ContainerStyle = {
  fontSize?: number
  fontFamily?: string
  borderWidth?: number
  borderRadius?: number
  borderStyle?: string
  borderColor?: string
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
}
export type NameValuePair = { name: string; value: string }

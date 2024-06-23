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
  | "SHAPE-ROTATE"
  | "FRAME-GRADIENT"
  | "SCREENSHOT"
  | "ENABLE-3DOTS"

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
  frameGradient?: NameValuePair
  enable3dots?: boolean
}
export type NameValuePair = { name: string; value: string }

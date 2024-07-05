export const DEFAULT_CONTAINER_TYPE = "NONE"
export const DEFAULT_TEXT_UNDERLINE_OFFSET = "6px"
export const DEFAULT_TEXT_DECORATION_STYLE = "solid"
export const DEFAULT_LEX_PADDING = 0
export const DEFAULT_SCALE = 1
export const DEFAULT_SHAPE_TYPE = "RECT"
export const DEFAULT_FONT_SIZE = "base"
export const DEFAULT_FONT_WEIGHT = "normal"
export const DEFAULT_FONT_FAMILY = "Monaco"
export const DEFAULT_LINE_HEIGHT = "normal"
export const DEFAULT_BORDER_WIDTH = 1
export const DEFAULT_BORDER_RADIUS = "rounded-none"
export const DEFAULT_BORDER_STYLE = "None"
export const DEFAULT_BORDER_DIRECTION = "ALL"
export const DEFAULT_BORDER_COLOR = "#ffffff"
export const DEFAULT_ICON_SIZE = 60
export const DEFAULT_ICON_COLOR = "#ffffff"
export const DEFAULT_ICON_ROTATE = 0
export const DEFAULT_FRAME_GRADIENT = {
  name: "indigo-purple-pink",
  value: "from-indigo-500 via-purple-500 to-pink-500",
}
export const DEFAULT_FRAME_RESOLUTION = { w: 800, h: 450 }
export const DEFAULT_TEXT_GRADIENT = {
  name: "indigo-sky-emerald",
  value: "from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
}
export const DEFAULT_RECT_WIDTH = 100
export const DEFAULT_RECT_HEIGHT = 30
export const DEFAULT_SHAPE_FILL = "transparent"
export const DEFAULT_SHAPE_ROTATE = 0
export const DEFAULT_LINE_WIDTH = 75
export const DEFAULT_LINE2_WIDTH = 20
export const DEFAULT_LINE2_DIRECTION = "TOP-LEFT"
export const DEFAULT_CODE_LANGUAGE = "Javascript"
export const DEFAULT_ARROW_HEAD_SIZE = 6
export const DEFAULT_ARROW_HEIGHT = 200
export const DEFAULT_ARROW_WIDTH = 150
export const DEFAULT_ARROW_BOW = 0
export const DEFAULT_ARROW_STRETCH = 0.5
export const DEFAULT_ARROW_MIN_STRETCH = 0
export const DEFAULT_ARROW_MAX_STRETCH = 420
export const DEFAULT_ARROW_PAD_START = 0
export const DEFAULT_ARROW_PAD_END = 0
export const DEFAULT_ARROW_FLIP = false
export const DEFAULT_ARROW_STRAIGHTS = false

export const ALLOWED_CODE_LANGUAGE = ["Javascript", "Typescript", "Rust"]
export const ALLOWED_FONT_FAMILY = [
  "Academy Engraved LET",
  "American Typewriter",
  "Baloo Bhaijaan",
  "Apple Chancery",
  "Bradley Hand",
  "Chalkboard",
  "Monaco",
  "Victor Mono",
  "Noteworthy",
  "Phosphate",
  "Savoye LET",
  "Cascadia Code",
  "Caveat",
  "Gochi Hand",
  "Homemade Apple",
  "Iosevka",
  "Klee One",
  "Permanent Marker",
]
export const ALLOWED_BORDER_STYLE = ["None", "Solid", "Dashed"]
export const ALLOWED_BORDER_DIRECTION = [
  "ALL",
  "TOP",
  "BOTTOM",
  "LEFT",
  "RIGHT",
]
export const ALLOWED_FRAME_GRADIENT = [
  {
    name: "indigo-purple-pink",
    value: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    name: "rose-red",
    value: "from-rose-400 to-red-500",
  },
  {
    name: "teal-yellow",
    value: "from-teal-400 to-yellow-200",
  },
  {
    name: "cyan-blue",
    value: "from-cyan-500 to-blue-500",
  },
  {
    name: "gray-slate",
    value: "from-gray-900 to-slate-800",
  },
  {
    name: "none",
    value: "none",
  },
]
export const ALLOWED_TEXT_GRADIENT = [
  {
    name: "indigo-sky-emerald",
    value: "from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
  },
  {
    name: "indigo-purple-pink",
    value: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    name: "rose-red",
    value: "from-rose-400 to-red-500",
  },
  {
    name: "teal-yellow",
    value: "from-teal-400 to-yellow-200",
  },
  {
    name: "cyan-blue",
    value: "from-cyan-500 to-blue-500",
  },
  {
    name: "gray-slate",
    value: "from-gray-900 to-slate-600",
  },
]
export const ALLOWED_LINE2_DIRECTION = [
  "TOP-LEFT",
  "TOP-RIGHT",
  "BOTTOM-LEFT",
  "BOTTOM-RIGHT",
]
export const ALLOWED_ROUGH_FILL_STYLE = [
  "hachure",
  "solid",
  "zigzag",
  "cross-hatch",
  "dots",
  "dashed",
  "zigzag-line",
]

export const ALLOWED_TEXT_DECORATION_STYLE = [
  "solid",
  "double",
  "dotted",
  "dashed",
  "wavy",
]

export const ALLOWED_FRAME_RESOLUTION = ["800x450", "480x854", "480x760"]

export const ALLOWED_FONT_WEIGHT = [
  "thin",
  "light",
  "normal",
  "semibold",
  "bold",
  "black",
]
export const ALLOWED_FONT_SIZE = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
]

export const ALLOWED_LINE_HEIGHT = [
  "none",
  "tight",
  "snug",
  "normal",
  "relaxed",
  "loose",
]

export const ALLOWED_BORDER_RADIUS = [
  "rounded-none",
  "rounded-sm",
  "rounded",
  "rounded-md",
  "rounded-lg",
  "rounded-xl",
  "rounded-2xl",
  "rounded-3xl",
]

export const DEFAULT_ROUGH_OPTIONS = {
  maxRandomnessOffset: 2,
  roughness: 1,
  bowing: 1,
  stroke: "#000",
  strokeWidth: 1,
  curveTightness: 0,
  curveFitting: 0.95,
  curveStepCount: 9,
  fill: "#000",
  fillStyle: "hachure",
  fillWeight: -1,
  hachureAngle: -41,
  hachureGap: -1,
  dashOffset: -1,
  dashGap: -1,
  zigzagOffset: -1,
  seed: 0,
  disableMultiStroke: false,
  disableMultiStrokeFill: false,
  preserveVertices: false,
  fillShapeRoughnessGain: 0.8,
}

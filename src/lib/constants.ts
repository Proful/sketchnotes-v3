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
export const DEFAULT_BOX_SHADOW = "shadow-none"
export const DEFAULT_BORDER_WIDTH = 1
export const DEFAULT_BORDER_RADIUS = "rounded-none"
export const DEFAULT_BORDER_STYLE = "None"
export const DEFAULT_BORDER_DIRECTION = "ALL"
export const DEFAULT_BORDER_COLOR = "stroke-white"
export const DEFAULT_ICON_SIZE = 60
export const DEFAULT_ICON_COLOR = "#ffffff"
export const DEFAULT_ICON_ROTATE = 0
export const DEFAULT_HIKE_INNER_PADDING = 0
export const DEFAULT_HIKE_OUTER_PADDING = 0
export const DEFAULT_HIKE_BACKGROUND_COLOR = "bg-background"
export const DEFAULT_HIKE_GRADIENT =
  "from-indigo-500 via-purple-500 to-pink-500"
export const DEFAULT_IMAGE_WIDTH = 400
export const DEFAULT_IMAGE_PADDING = 0
export const DEFAULT_IMAGE_GRADIENT =
  "from-indigo-500 via-purple-500 to-pink-500"
export const DEFAULT_FRAME_PADDING = 5
export const DEFAULT_FRAME_BG_COLOR = "bg-background"
export const DEFAULT_FRAME_GRADIENT =
  "from-indigo-500 via-purple-500 to-pink-500"
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
export const DEFAULT_CODE_THEME = "github-dark"
export const DEFAULT_CODE_FONT = "Victor Mono"
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

export const ALLOWED_CODE_LANGUAGE = [
  "Javascript",
  "Typescript",
  "Rust",
  "Python",
  "Html",
]
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

export const ALLOWED_FRAME_BACKGROUND = [
  {
    name: "indigo-purple-pink",
    value: "from-indigo-500 via-purple-500 to-pink-500",
  },
]
export const ALLOWED_FRAME_GRADIENT = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-rose-400 to-red-500",
  "from-teal-400 to-yellow-200",
  "from-cyan-500 to-blue-500",
  "from-gray-900 to-slate-800",
  "from-[#ff7e5f] via-[#feb47b] to-[#ffcc99]", // Warm sunset tones
  "from-[#6a3093] via-[#a044ff] to-[#d9a7c7]", // Analogous purples
  "from-[#ff9a9e] via-[#fecfef] to-[#feada6]", // Soft pinks and peaches
  "from-[#00c6ff] via-[#0072ff] to-[#004e92]", // Cool blues
  "from-[#f77062] via-[#fe5196] to-[#ff88dc]", // Warm pinks with a soft touch
  "from-[#fbd3e9] via-[#bb377d] to-[#f77062]", // Warm reds and pinks
  "from-[#43cea2] via-[#185a9d] to-[#134e5e]", // Complementary greens and blues
  "from-[#fbc2eb] via-[#a6c1ee] to-[#b5a0eb]", // Soft pastels
  "from-[#ffd89b] via-[#e27d60] to-[#c38d9e]", // Warm orange to muted pink
  "from-[#4ca1af] via-[#c4e0e5] to-[#dbedf3]", // Cool blues and greys
  "from-[#ff9966] via-[#ff5e62] to-[#ff6e7f]", // Vibrant warm tones
  "from-[#0f2027] via-[#203a43] to-[#2c5364]", // Deep cool blues
  "from-[#667db6] via-[#0082c8] to-[#0082c8]", // Cool blues with a pop
  "from-[#ff758c] via-[#ff7eb3] to-[#ff99c5]", // Soft and vibrant pinks
  "from-[#ffecd2] via-[#fcb69f] to-[#ff7e5f]", // Warm peaches and pinks
  "from-[#cfd9df] via-[#e2ebf0] to-[#f4f4f4]", // Soft greys
  "from-[#f7d794] via-[#f3a683] to-[#e77f67]", // Soft orange to coral
  "from-[#84fab0] via-[#8fd3f4] to-[#7ee8fa]", // Light greens and blues
  "from-[#ffb6b9] via-[#fae3d9] to-[#bbded6]", // Soft pinks and greens
  "from-[#f4e2d8] via-[#ba5370] to-[#f4a261]", // Warm tones
  "from-[#a8edea] via-[#fed6e3] to-[#ffb6b9]", // Pastel greens and pinks
  "from-[#dd5e89] via-[#f7bb97] to-[#ef9184]", // Warm pinks and peaches
  "from-[#a1c4fd] via-[#c2e9fb] to-[#cfd9df]", // Light blues and greys
  "from-[#fddb92] via-[#d1fdff] to-[#91eae4]", // Soft peaches to light blue
  "from-[#d299c2] via-[#fef9d7] to-[#c1c8e4]", // Soft pastel purple and yellow
  "from-[#fbc2eb] via-[#a6c1ee] to-[#fda085]", // Soft pastels with a warm touch
  "from-[#ff9a9e] via-[#fecfef] to-[#fecda8]", // Warm peaches and pinks
  "from-[#cfd9df] via-[#e2ebf0] to-[#cfd9df]", // Light greys and blues
  "from-[#ff758c] via-[#ff7eb3] to-[#ffa69e]", // Vibrant warm pinks
  "from-[#84fab0] via-[#8fd3f4] to-[#4ca1af]", // Light greens to cool blues
]
// "from-[#f2b8ff] via-[#e9e4fe] to-[#a9aeff]",
// "from-[#f2b8ff] via-[#e9e4fe] to-[#a9aeff]",
// "from-[#3de5b3] via-[#fee899] to-[#fff7ef]",
// "from-[#9fbdd3] to-[#ebe6e2]",
// "from-[#f0e2cf] via-[#f4d5af] to-[#f1c2b4]",
// "from-[#81b29a] via-[#f2cc8f] to-[#f4f1de]",
// "from-[#fbe0ff] via-[#92b4e9] to-[#ffc1c1]",
// "from-[#01befc] via-[#fc7efc] to-[#fbd847]",
// "from-[#b9fbc0] via-[#a3c4f3] to-[#f1c0e8]",
// "from-[#ffd488] via-[#ff9b7f] to-[#fff6b1]",
// "from-[#a3ffe7] via-[#7a6bfb] to-[#ff90c9]",
// "from-[#5e88da] to-[#e3f0ff]",
// "from-[#fff2a4] via-[#d3acee] to-[#82f5ff]",
// "from-[#c6ffb1] via-[#b4eef5] to-[#ffdb95]",
// "from-[#a280ff] via-[#ff7bb6] to-[#ff9d85]",
// "from-[#9f82fe] to-[#ffe992]",
// "from-[#fda1ff] via-[#fed3d3] to-[#66b3ff]",
// "from-[#adf285] to-[#5346bf]",
// "from-[#5493c8] to-[#4135ab]",
// "from-[#f5e7ff] to-[#ff94be]",
// "from-[#e98d96] to-[#e6a45e]",
// "from-[#cf48d5] to-[#3e5bc7]",
// "from-[#29817e] to-[#90e9cf]",
// "from-[#799aff] to-[#e8de90]",
// "from-[#c3c3c3] to-[#1a180b]",
// "from-[#f2f2f2] to-[#a9a9a9]",
//   "from-[#ffb5a6] to-[#fb2626]",
//   "from-[#3165a6] to-[#0c6405]",
//   "from-[#fafafa] to-[#9614e2]",
//   "from-[#000000] to-[#c5e282]",
//   "from-[#399266] to-[#e9faab]",
//   "from-[#f8b016] to-[#161616]",
//   "from-[#925a9e] to-[#ff9696]",
//   "none",
// ]
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

export const ALLOWED_BOX_SHADOW = [
  "shadow-sm",
  "shadow",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "shadow-2xl",
  "shadow-inner",
  "shadow-none",
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

export const DEFAULT_TAILWIND_COLOR = ""
export const TAILWIND_COLORS = [
  "bg-slate-500",
  "bg-gray-500",
  "bg-zinc-500",
  "bg-neutral-500",
  "bg-stone-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
]
export const ALLOWED_THEME_NAMES = [
  "dark-plus",
  "dracula-soft",
  "dracula",
  "github-dark",
  "github-dark-dimmed",
  "github-light",
  "light-plus",
  "material-darker",
  "material-default",
  "material-lighter",
  "material-ocean",
  "material-palenight",
  "min-dark",
  "min-light",
  "monokai",
  "nord",
  "one-dark-pro",
  "poimandres",
  "slack-dark",
  "slack-ochin",
  "solarized-dark",
  "solarized-light",
]

export const ALLOWED_CODE_FONT_FAMILY = [
  "Victor Mono",
  "Cascadia Mono",
  "Fira Code",
  "IBM Plex Mono",
  "JetBrains Mono",
  "Operator Mono",
]

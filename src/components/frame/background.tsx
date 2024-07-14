const BgDarkGradient2 = () => {
  return (
    <div className="absolute top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
  )
}

const BgDarkGrid1 = () => {
  return (
    <div className="absolute top-0 z-[-2] h-full w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" />
  )
}

const BgDarkGradient3 = () => {
  return (
    <div className="relative h-full w-full bg-neutral-900">
      <div className="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
    </div>
  )
}

const BgDarkGradient4 = () => {
  return (
    <div className="relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />
    </div>
  )
}

const BgDarkGradient5 = () => {
  return (
    <div className="relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
    </div>
  )
}

const BgDarkGrid2 = () => {
  return (
    <div className="relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
    </div>
  )
}

const BgDarkGridGradient1 = () => {
  return (
    <div className="relative h-full w-full bg-black">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
    </div>
  )
}

const BgDarkGrid3 = () => {
  return (
    <div className="relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  )
}

export const BACKGROUND_OPTIONS = [
  {
    name: "Background Dark Gradient 2",
    component: <BgDarkGradient2 />,
    theme: "dark",
  },
  {
    name: "Background Dark Gradient 3",
    component: <BgDarkGradient3 />,
    theme: "dark",
  },
  {
    name: "Background Dark Gradient 4",
    component: <BgDarkGradient4 />,
    theme: "dark",
  },
  {
    name: "Background Dark Gradient 5",
    component: <BgDarkGradient5 />,
    theme: "dark",
  },
  {
    name: "Background Dark Grid Gradient 1",
    component: <BgDarkGridGradient1 />,
    theme: "dark",
  },
  {
    name: "Background Dark Grid 1",
    component: <BgDarkGrid1 />,
    theme: "dark",
  },
  {
    name: "Background Dark Grid 2",
    component: <BgDarkGrid2 />,
    theme: "dark",
  },
  {
    name: "Background Dark Grid 3",
    component: <BgDarkGrid3 />,
    theme: "dark",
  },
] as const

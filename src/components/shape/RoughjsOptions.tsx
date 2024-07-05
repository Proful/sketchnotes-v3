import { useState } from "react"

import {
  ALLOWED_ROUGH_FILL_STYLE,
  DEFAULT_ROUGH_OPTIONS,
} from "@/lib/constants"
import { Action } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function RoughjsOptions({
  onAction,
}: {
  onAction: (action: Action) => void
}) {
  const [ro, setRo] = useState(DEFAULT_ROUGH_OPTIONS)
  return (
    <>
      <li className="p-1 hover:bg-blue-700 space-x-2">
        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.maxRandomnessOffset} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, maxRandomnessOffset: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-MAX-RANDOMNESS-OFFSET", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Max Randomness Offset</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}

        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.bowing} */}
        {/*         min={0} */}
        {/*         max={10} */}
        {/*         step={1} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, bowing: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-BOWING", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Bowing</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}
      </li>
      <li className="p-1 hover:bg-blue-700 space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Input
                type="color"
                className="w-12 inline"
                onChange={(e) => {
                  setRo({ ...ro, stroke: e.target.value })
                  onAction({
                    name: "ROUGH-STROKE",
                    seed: Math.random(),
                    value: e.target.value,
                  })
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Border Color</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Input
                type="number"
                className="w-16 inline"
                value={ro.strokeWidth}
                min={0.2}
                max={5}
                step={0.2}
                onChange={(e) => {
                  setRo({ ...ro, strokeWidth: +e.target.value })
                  onAction({
                    name: "ROUGH-STROKE-WIDTH",
                    value: +e.target.value,
                    seed: Math.random(),
                  })
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Stroke Width</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Input
                type="number"
                className="w-16 inline"
                value={ro.roughness}
                min={0}
                max={10}
                step={1}
                onChange={(e) => {
                  setRo({ ...ro, roughness: +e.target.value })
                  onAction({
                    name: "ROUGH-ROUGHNESS",
                    value: +e.target.value,
                    seed: Math.random(),
                  })
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Roughness</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.curveTightness} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, curveTightness: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-CURVE-TIGHTNESS", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Curve Tightness</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}
      </li>
      <li className="p-1 hover:bg-blue-700 space-x-2">
        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.curveFitting} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, curveFitting: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-CURVE-FITTING", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Curve Fitting</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}

        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.curveStepCount} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, curveStepCount: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-CURVE-STEP-COUNT", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Curve Step Count</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}
      </li>
      <li className="p-1 hover:bg-blue-700 space-x-2">
        <Select
          onValueChange={(v) => {
            onAction({
              name: "ROUGH-FILL-STYLE",
              value: v,
              seed: Math.random(),
            })
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Fill Style" />
          </SelectTrigger>
          <SelectContent>
            {ALLOWED_ROUGH_FILL_STYLE.map((fill) => (
              <SelectItem value={fill} key={fill}>
                {fill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </li>
      <li className="p-1 hover:bg-blue-700 space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Input
                type="color"
                className="w-12 inline"
                onChange={(e) => {
                  setRo({ ...ro, fill: e.target.value })
                  onAction({
                    name: "ROUGH-FILL",
                    seed: Math.random(),
                    value: e.target.value,
                  })
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Fill</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Input
                type="number"
                className="w-16 inline"
                value={ro.fillWeight}
                onChange={(e) => {
                  setRo({ ...ro, fillWeight: +e.target.value })
                  onAction({
                    name: "ROUGH-FILL-WEIGHT",
                    value: +e.target.value,
                    seed: Math.random(),
                  })
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Fill Weight</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.hachureAngle} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, hachureAngle: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-HACHURE-ANGLE", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Hachure Angle</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}
      </li>
      <li className="p-1 hover:bg-blue-700 space-x-2">
        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.hachureGap} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, hachureGap: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-HACHURE-GAP", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Hachure Gap</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}

        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.dashOffset} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, dashOffset: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-DASH-OFFSET", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Dash Offset</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}
      </li>
      <li className="p-1 hover:bg-blue-700 space-x-2">
        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.dashGap} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, dashGap: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-DASH-GAP", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Dash Gap</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}

        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.zigzagOffset} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, zigzagOffset: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-ZIGZAG-OFFSET", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Zigzag Offset</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}

        {/* <TooltipProvider> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger> */}
        {/*       <Input */}
        {/*         type="number" */}
        {/*         className="w-16 inline" */}
        {/*         value={ro.seed} */}
        {/*         onChange={(e) => { */}
        {/*           setRo({ ...ro, seed: +e.target.value }) */}
        {/*           onAction({ */}
        {/*             name: "ROUGH-SEED", */}
        {/*             value: +e.target.value, */}
        {/*             seed: Math.random(), */}
        {/*           }) */}
        {/*         }} */}
        {/*       /> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent> */}
        {/*       <p>Seed</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </TooltipProvider> */}
      </li>

      {/* <li className="p-1 hover:bg-blue-700 space-x-2"> */}
      {/*   <Checkbox */}
      {/*     id="disableMultiStroke" */}
      {/*     checked={ro.disableMultiStroke} */}
      {/*     onCheckedChange={() => { */}
      {/*       onAction({ */}
      {/*         name: "ROUGH-DISABLE-MULTI-STROKE", */}
      {/*         value: !ro.disableMultiStroke, */}
      {/*         seed: Math.random(), */}
      {/*       }) */}
      {/*       setRo({ ...ro, disableMultiStroke: !ro.disableMultiStroke }) */}
      {/*     }} */}
      {/*   /> */}
      {/*   <label */}
      {/*     htmlFor="disableMultiStroke" */}
      {/*     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" */}
      {/*   > */}
      {/*     Disable Multi Stroke */}
      {/*   </label> */}
      {/* </li> */}

      {/* <li className="p-1 hover:bg-blue-700 space-x-2"> */}
      {/*   <Checkbox */}
      {/*     id="disableMultiStrokeFill" */}
      {/*     checked={ro.disableMultiStrokeFill} */}
      {/*     onCheckedChange={() => { */}
      {/*       onAction({ */}
      {/*         name: "ROUGH-DISABLE-MULTI-STROKE-FILL", */}
      {/*         value: !ro.disableMultiStrokeFill, */}
      {/*         seed: Math.random(), */}
      {/*       }) */}
      {/*       setRo({ */}
      {/*         ...ro, */}
      {/*         disableMultiStrokeFill: !ro.disableMultiStrokeFill, */}
      {/*       }) */}
      {/*     }} */}
      {/*   /> */}
      {/*   <label */}
      {/*     htmlFor="disableMultiStrokeFill" */}
      {/*     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" */}
      {/*   > */}
      {/*     Disable Multi Stroke Fill */}
      {/*   </label> */}
      {/* </li> */}

      {/* <li className="p-1 hover:bg-blue-700 space-x-2"> */}
      {/*   <Checkbox */}
      {/*     id="preserveVertices" */}
      {/*     checked={ro.preserveVertices} */}
      {/*     onCheckedChange={() => { */}
      {/*       onAction({ */}
      {/*         name: "ROUGH-PRESERVE-VERTICES", */}
      {/*         value: !ro.preserveVertices, */}
      {/*         seed: Math.random(), */}
      {/*       }) */}
      {/*       setRo({ */}
      {/*         ...ro, */}
      {/*         preserveVertices: !ro.preserveVertices, */}
      {/*       }) */}
      {/*     }} */}
      {/*   /> */}
      {/*   <label */}
      {/*     htmlFor="preserveVertices" */}
      {/*     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" */}
      {/*   > */}
      {/*     Preserve Vertices */}
      {/*   </label> */}
      {/* </li> */}

      {/* <li className="p-1 hover:bg-blue-700 space-x-2"> */}
      {/*   <TooltipProvider> */}
      {/*     <Tooltip> */}
      {/*       <TooltipTrigger> */}
      {/*         <Input */}
      {/*           type="number" */}
      {/*           className="w-16 inline" */}
      {/*           value={ro.fillShapeRoughnessGain} */}
      {/*           onChange={(e) => { */}
      {/*             setRo({ ...ro, fillShapeRoughnessGain: +e.target.value }) */}
      {/*             onAction({ */}
      {/*               name: "ROUGH-FILL-SHAPE-ROUGHNESS-GAIN", */}
      {/*               value: +e.target.value, */}
      {/*               seed: Math.random(), */}
      {/*             }) */}
      {/*           }} */}
      {/*         /> */}
      {/*       </TooltipTrigger> */}
      {/*       <TooltipContent> */}
      {/*         <p>Fill Shape Roughness Gain</p> */}
      {/*       </TooltipContent> */}
      {/*     </Tooltip> */}
      {/*   </TooltipProvider> */}
      {/* </li> */}
    </>
  )
}

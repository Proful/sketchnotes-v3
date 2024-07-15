import { useState } from "react"
import * as Octicons from "@/vendor/octicons_react/"
import {
  ArrowUp,
  CircleEllipsisIcon,
  CircleIcon,
  CodeIcon,
  FrameIcon,
  GridIcon,
  MinusIcon,
  RectangleVerticalIcon,
  RedoIcon,
  SlashIcon,
  SquareIcon,
  Trash,
  TypeIcon,
} from "lucide-react"

import { DEFAULT_SCALE } from "@/lib/constants"
import { ContainerType } from "@/lib/types"
import { useGridOverlay } from "@/hooks/GridOverlayContext"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "./ui/input"

// eslint-disable-next-line no-unused-vars
const { ...iconsByName } = Octicons

type ActionsProps = {
  onContainerCreate: (containerType: ContainerType, subType?: string) => void
  onDelete: () => void
  onScale: (scale: number) => void
}
export default function Actions({
  onContainerCreate,
  onDelete,
  onScale,
}: ActionsProps) {
  const [scale, setScale] = useState(DEFAULT_SCALE)
  const { toggleGrid } = useGridOverlay()
  return (
    <>
      <ul>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Button onClick={() => onContainerCreate("HIKE")}>
            <CodeIcon />
          </Button>
          <Button onClick={() => onContainerCreate("LEX")}>
            <TypeIcon />
          </Button>
          <Popover>
            <PopoverTrigger>
              <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <RedoIcon />
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <ul className="flex flex-wrap p-0 list-none">
                {Object.keys(iconsByName).map((key) => {
                  //@ts-ignore
                  const Icon = iconsByName[key]
                  return (
                    <li
                      key={key}
                      className="w-1/5 p-2 border border-gray-900 text-center"
                      onClick={() => onContainerCreate("ICON", key)}
                    >
                      <Icon size={"medium"} verticalAlign="middle" />
                    </li>
                  )
                })}
              </ul>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <SquareIcon />
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <ul className="flex flex-wrap p-0 list-none">
                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "RECT")}
                >
                  <SquareIcon />
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "LINE")}
                >
                  <MinusIcon />
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "LINE-CIRCLE")}
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-white fill-white"
                  >
                    <circle cx="5" cy="6" r="3"></circle>
                    <line stroke-width="1" x1="6" y1="6" x2="75" y2="6"></line>
                    <circle cx="78" cy="6" r="3"></circle>
                  </svg>
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "LINE-LINE")}
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-white"
                  >
                    <line stroke-width="1" x1="0" y1="1" x2="20" y2="1"></line>
                    <line
                      stroke-width="1"
                      x1="10"
                      y1="1"
                      x2="10"
                      y2="75"
                    ></line>
                  </svg>
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "LINE-LINE-V2")}
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-white"
                  >
                    <line stroke-width="1" x1="1" y1="1" x2="1" y2="20"></line>
                    <line
                      stroke-width="1"
                      x1="1"
                      y1="20"
                      x2="75"
                      y2="20"
                    ></line>
                  </svg>
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "ARROW")}
                >
                  <ArrowUp />
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "ROUGH-RECT")}
                >
                  <RectangleVerticalIcon />
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "ROUGH-CIRCLE")}
                >
                  <CircleIcon />
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "ROUGH-ELLIPSE")}
                >
                  <CircleEllipsisIcon />
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "ROUGH-LINE")}
                >
                  <SlashIcon />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </li>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Button onClick={() => onContainerCreate("FRAME")}>
            <FrameIcon />
          </Button>
          <Button onClick={onDelete}>
            <Trash />
          </Button>

          <Input
            type="number"
            className="w-16 inline"
            value={scale}
            min={-1}
            max={4}
            step={0.1}
            onChange={(e) => {
              setScale(+e.target.value)
              onScale(+e.target.value)
            }}
          />
          <Button onClick={toggleGrid}>
            <GridIcon />
          </Button>
        </li>
      </ul>
    </>
  )
}

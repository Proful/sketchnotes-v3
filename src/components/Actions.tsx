// eslint-disable-next-line import/no-namespace
// import * as Octicons from "@primer/octicons-react"
import {
  ArrowUp,
  CircleStop,
  FrameIcon,
  IceCreamConeIcon,
  LineChartIcon,
  PenLineIcon,
  RectangleVerticalIcon,
  ScanLineIcon,
  SquareIcon,
  Trash,
} from "lucide-react"

import { ContainerType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import * as Octicons from "../vendor/octicons_react/"

// eslint-disable-next-line no-unused-vars
const { ...iconsByName } = Octicons

type ActionsProps = {
  onContainerCreate: (containerType: ContainerType, subType?: string) => void
  onDelete: () => void
}
export default function Actions({ onContainerCreate, onDelete }: ActionsProps) {
  return (
    <>
      <ul>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Button onClick={() => onContainerCreate("LEX")}>Lex</Button>
          <Popover>
            <PopoverTrigger>
              <span className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <IceCreamConeIcon />
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
                  <LineChartIcon />
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "LINE-CIRCLE")}
                >
                  <CircleStop />
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "LINE-LINE")}
                >
                  <PenLineIcon />
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "LINE-LINE-V2")}
                >
                  <ScanLineIcon />
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
              </ul>
            </PopoverContent>
          </Popover>
          <Button onClick={onDelete}>
            <Trash />
          </Button>
        </li>
        <li className="p-2 hover:bg-blue-700 flex space-x-2">
          <Button onClick={() => onContainerCreate("FRAME")}>
            <FrameIcon />
          </Button>
        </li>
      </ul>
    </>
  )
}

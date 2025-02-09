import * as Octicons from "@/vendor/octicons_react/"
import {
  ArrowUp,
  // CircleEllipsisIcon,
  // CircleIcon,
  CodeIcon,
  CopyIcon,
  FrameIcon,
  GridIcon,
  ImageIcon,
  MinusIcon,
  // RectangleVerticalIcon,
  RedoIcon,
  // SlashIcon,
  SquareIcon,
  Trash,
  TypeIcon,
} from "lucide-react"

import { ContainerType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useGridOverlay } from "@/hooks/GridOverlayContext"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import useStore from "./Store"

// eslint-disable-next-line no-unused-vars
const { ...iconsByName } = Octicons

type ActionsProps = {
  onContainerCreate: (containerType: ContainerType, subType?: string) => void
  onDelete: () => void
  onCopy: () => void
}
export default function Actions({
  onContainerCreate,
  onDelete,
  onCopy,
}: ActionsProps) {
  const selectedContainerType = useStore((state) => state.selectedContainerType)
  const { toggleGrid } = useGridOverlay()

  const actionButtonClass =
    "mb-2 text-3xl flex items-center justify-center border shadow border-dashed border-gray-400 dark:border-gray-600 dark:shadow-black/50 text-gray-400 dark:text-gray-400 dark:hover:border-yellow-500 dark:group-hover:border-yellow-500 dark:hover:text-yellow-500 dark:[&.active]:border-yellow-500  dark:[&.active]:text-yellow-500"
  const actionSpanClass =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 dark:hover:border-yellow-500 dark:group-hover:border-yellow-500 dark:hover:text-yellow-500 dark:group-hover:scale-[1.2] duration-100 mb-2 border shadow border-dashed border-gray-400 group-hover:border-yellow-500 group-hover:text-yellow-500 dark:border-gray-600 dark:shadow-black/50 text-gray-400 dark:text-gray-400 dark:[&.active]:border-yellow-500  dark:[&.active]:text-yellow-500"

  return (
    <>
      <ul>
        <li className="p-2 flex space-x-2">
          <Button
            className={cn(
              actionButtonClass,
              selectedContainerType === "HIKE" ? "active" : ""
            )}
            onClick={() => onContainerCreate("HIKE")}
          >
            <CodeIcon className="group-hover:scale-[1.2] duration-100" />
          </Button>
          <Button
            className={cn(
              actionButtonClass,
              selectedContainerType === "LEX" ? "active" : ""
            )}
            onClick={() => onContainerCreate("LEX")}
          >
            <TypeIcon />
          </Button>
          <Popover>
            <PopoverTrigger>
              <span
                className={cn(
                  actionSpanClass,
                  selectedContainerType === "ICON" ? "active" : ""
                )}
              >
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
              <span
                className={cn(
                  actionSpanClass,
                  selectedContainerType === "SHAPE" ? "active" : ""
                )}
              >
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
                    <line strokeWidth="1" x1="6" y1="6" x2="75" y2="6"></line>
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
                    <line strokeWidth="1" x1="0" y1="1" x2="20" y2="1"></line>
                    <line strokeWidth="1" x1="10" y1="1" x2="10" y2="75"></line>
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
                    <line strokeWidth="1" x1="1" y1="1" x2="1" y2="20"></line>
                    <line strokeWidth="1" x1="1" y1="20" x2="75" y2="20"></line>
                  </svg>
                </li>

                <li
                  className="w-1/5 p-2 border border-gray-900 text-center"
                  onClick={() => onContainerCreate("SHAPE", "ARROW")}
                >
                  <ArrowUp />
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </li>
        <li className="p-2 flex space-x-2">
          <Button
            className={cn(
              actionButtonClass,
              selectedContainerType === "IMAGE" ? "active" : ""
            )}
            onClick={() => onContainerCreate("IMAGE")}
          >
            <ImageIcon />
          </Button>
          <Button
            className={cn(
              actionButtonClass,
              selectedContainerType === "FRAME" ? "active" : ""
            )}
            onClick={() => onContainerCreate("FRAME")}
          >
            <FrameIcon />
          </Button>
          <Button className={cn(actionButtonClass)} onClick={onDelete}>
            <Trash />
          </Button>
          <Button className={cn(actionButtonClass)} onClick={onCopy}>
            <CopyIcon />
          </Button>
        </li>
        <li className="p-2 flex space-x-2">
          <Button className={cn(actionButtonClass)} onClick={toggleGrid}>
            <GridIcon />
          </Button>
        </li>
      </ul>
    </>
  )
}

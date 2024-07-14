import { Action } from "@/lib/types"

import { Button } from "../ui/button"

type HikeOptionsProps = {
  onAction: (action: Action) => void
}
export default function HikeOptions({ onAction }: HikeOptionsProps) {
  return (
    <>
      <ul>
        <li className="p-2 hover:bg-blue-700">
          <Button
            onClick={() =>
              onAction({ name: "HIKE-PREVIEW", seed: Math.random() })
            }
          >
            Preview
          </Button>
        </li>
      </ul>
    </>
  )
}

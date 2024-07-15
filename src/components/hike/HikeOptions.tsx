import { useState } from "react"

import { ALLOWED_CODE_LANGUAGE, DEFAULT_CODE_LANGUAGE } from "@/lib/constants"
import { Action } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "../ui/button"

type HikeOptionsProps = {
  onAction: (action: Action) => void
}
export default function HikeOptions({ onAction }: HikeOptionsProps) {
  const [lang, setLang] = useState(DEFAULT_CODE_LANGUAGE)
  return (
    <>
      <ul>
        <li className="p-2 hover:bg-blue-700">
          <Button
            onClick={() =>
              onAction({
                name: "HIKE-PREVIEW",
                seed: Math.random(),
                value: lang,
              })
            }
          >
            Preview
          </Button>
        </li>
        <li className="p-2 hover:bg-blue-700">
          <Select
            onValueChange={(v) => {
              setLang(v)
              // onAction({ name: "CODE", value: v })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_CODE_LANGUAGE.map((lang) => (
                <SelectItem value={lang} key={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </li>
      </ul>
    </>
  )
}

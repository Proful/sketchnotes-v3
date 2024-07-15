import { useState } from "react"

import { ALLOWED_CODE_LANGUAGE, DEFAULT_CODE_LANGUAGE } from "@/lib/constants"
import { Action } from "@/lib/types"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "../ui/button"
import { CopyButton } from "./CopyButton"
import { Code } from "./HikeContainer"

type HikeOptionsProps = {
  onAction: (action: Action) => void
}
const calloutCode = `!callout[/amet/] This is a callout`
const markCode = `!mark(1:2)`
const neonCode = `!neon[1:5]`
const bgCode = `!bg[1:3]`
const borderCode = `!border[1:7]`
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
        <li className="p-2 hover:bg-blue-700">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Annotations</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px]">
              <div className="mb-2 relative">
                <CopyButton text={`//${calloutCode}`} />
                <Code
                  codeblock={{
                    value: `//${calloutCode}
${calloutCode}`,
                    lang: "javascript",
                    meta: "",
                  }}
                />
              </div>
              <div className="relative mb-2">
                <CopyButton text={`//${markCode}`} />
                <Code
                  codeblock={{
                    value: `//${markCode}
${markCode}`,
                    lang: "javascript",
                    meta: "",
                  }}
                />
              </div>
              <div className="relative mb-2">
                <CopyButton text={`//${neonCode}`} />
                <Code
                  codeblock={{
                    value: `//${neonCode}
${neonCode}`,
                    lang: "javascript",
                    meta: "",
                  }}
                />
              </div>
              <div className="relative mb-2">
                <CopyButton text={`//${bgCode}`} />
                <Code
                  codeblock={{
                    value: `//${bgCode}
${bgCode}`,
                    lang: "javascript",
                    meta: "",
                  }}
                />
              </div>
              <div className="relative mb-2">
                <CopyButton text={`//${borderCode}`} />
                <Code
                  codeblock={{
                    value: `//${borderCode}
${borderCode}`,
                    lang: "javascript",
                    meta: "",
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </>
  )
}

import { useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection } from "lexical"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { $createAnnotationNode } from "../nodes/lexical-annotation"

const ANNOTATION_OPTIONS = [
  "callout[/amet/] hello",
  "mark(1:2)",
  "neon[1:7]",
  "bg[1:3]",
  "border[1:7]",
  "underline[1:16]",
]

export function AnnotationPlugin({
  id,
  selectedId,
}: {
  id: number
  selectedId: number | null
}) {
  const [editor] = useLexicalComposerContext()
  const [annotationDropdown, setAnnotationDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "!") {
        if (id === selectedId) {
          setAnnotationDropdown(true)
        }
      }
    }

    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [id, selectedId])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        annotationDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAnnotationDropdown(false)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [annotationDropdown])

  const insertAnnotation = (annotation: string) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        // selection.insertNodes([$createAnnotationNode(annotation)])
        const textNode = $createAnnotationNode(annotation)
        selection.insertNodes([textNode])
        textNode.selectEnd()
      }
    })
    setAnnotationDropdown(false)
  }

  return (
    <>
      {annotationDropdown && (
        <div ref={dropdownRef}>
          <DropdownMenu
            open={annotationDropdown}
            onOpenChange={setAnnotationDropdown}
          >
            <DropdownMenuTrigger asChild className="invisible absolute -top-4 ">
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {ANNOTATION_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => insertAnnotation(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {/* <div */}
      {/*   ref={dropdownRef} */}
      {/*   style={{ */}
      {/*     position: "absolute", */}
      {/*     background: "black", */}
      {/*     border: "1px solid black", */}
      {/*   }} */}
      {/* > */}
      {/*   {ANNOTATION_OPTIONS.map((option) => ( */}
      {/*     <div key={option} onClick={() => insertAnnotation(option)}> */}
      {/*       {option} */}
      {/*     </div> */}
      {/*   ))} */}
      {/* </div> */}
    </>
  )
}

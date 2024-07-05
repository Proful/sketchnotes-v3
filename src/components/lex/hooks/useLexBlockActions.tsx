import { $createCodeNode, $isCodeNode } from "@lexical/code"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text"
import { $setBlocksType } from "@lexical/selection"
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalNode,
  RangeSelection,
} from "lexical"

import { getSelectedBlockNode } from "@/components/lex/lex-utils"

import { CodeHighlightNode, CodeNode } from "../nodes/lexical-code"

const HEADING_TAGS = ["h1", "h2", "h3"]

const isHeading = (format: string) => HEADING_TAGS.includes(format)

export const useLexBlockActions = () => {
  const [editor] = useLexicalComposerContext()

  const formatBlockCommand = (format: string) => {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        if (isHeading(format)) {
          $setBlocksType(selection as RangeSelection, () => {
            if (
              $isHeadingNode(getSelectedBlockNode(selection as RangeSelection))
            ) {
              return $createParagraphNode()
            }
            return $createHeadingNode(format as HeadingTagType)
          })
        } else if (format === "p") {
          $setBlocksType(selection as RangeSelection, () =>
            $createParagraphNode()
          )
        } else if (format === "quote") {
          $setBlocksType(selection as RangeSelection, () => {
            if (
              $isQuoteNode(getSelectedBlockNode(selection as RangeSelection))
            ) {
              return $createParagraphNode()
            }
            return $createQuoteNode()
          })
        } else if (format === "code") {
          $setBlocksType(selection as RangeSelection, () => {
            if (
              $isCodeNode(getSelectedBlockNode(selection as RangeSelection))
            ) {
              return $createParagraphNode()
            }
            return $createCodeNode()
          })
        }
      }
    })
  }

  const p = () => formatBlockCommand("p")
  const h1 = () => formatBlockCommand("h1")
  const h2 = () => formatBlockCommand("h2")
  const h3 = () => formatBlockCommand("h3")
  // const q = () => formatBlockCommand("quote")
  const q = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const { anchor, focus } = selection

        const nodesToWrap = new Set<LexicalNode>()

        const visitNode = (node: LexicalNode) => {
          if (node instanceof CodeNode || node instanceof CodeHighlightNode) {
            nodesToWrap.add(node)
          }

          if ("getChildren" in node && typeof node.getChildren === "function") {
            const children = (node as any).getChildren() as LexicalNode[]
            children.forEach(visitNode)
          }
        }

        visitNode(anchor.getNode())
        visitNode(focus.getNode())

        nodesToWrap.forEach((node) => {
          const parent = node.getParent()
          if (parent && parent.getType() !== "paragraph") {
            const paragraphNode = $createParagraphNode()
            node.replace(paragraphNode)
            paragraphNode.append(node)
          }
        })
      }
    })
  }
  const c = () => formatBlockCommand("code")

  return { p, h1, h2, h3, q, c }
}

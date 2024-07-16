import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $getSelection,
  $isRangeSelection,
  LexicalNode,
  TextNode,
} from "lexical"

import { $createKlassNode, $isKlassNode } from "../nodes/lexical-klass"

const updateSelectionWithKlass = (klass: string) => {
  const selection = $getSelection()
  if ($isRangeSelection(selection) && selection.getTextContent().length > 0) {
    const startKey = selection.anchor.getNode()
    const endKey = selection.focus.getNode()

    const nodes = startKey.getNodesBetween(endKey)

    nodes.forEach((node) => {
      const nodeText = node.getTextContent()
      const textToApplyClass = selection.getTextContent()
      const startIndex = nodeText.indexOf(textToApplyClass)
      if (startIndex !== -1) {
        const beforeText = nodeText.substring(0, startIndex)
        const targetText = nodeText.substring(
          startIndex,
          startIndex + textToApplyClass.length
        )
        const afterText = nodeText.substring(
          startIndex + textToApplyClass.length
        )

        const newNodes: LexicalNode[] = []
        if (beforeText) {
          newNodes.push(new TextNode(beforeText))
        }
        const klassNode = $createKlassNode(targetText, klass)
        if ($isKlassNode(node)) {
          klassNode.setKlass(node.__klass) // Preserve existing classes
        }
        newNodes.push(klassNode)
        if (afterText) {
          newNodes.push(new TextNode(afterText))
        }

        // Insert new nodes after the current node
        let lastInsertedNode = node
        newNodes.reverse().forEach((newNode) => {
          lastInsertedNode = lastInsertedNode.insertBefore(newNode)
        })
        // Remove the old node
        node.remove()
      }
    })
  }
}
export const useLexKlass = () => {
  const [editor] = useLexicalComposerContext()

  const addKlass = (klass: string) => {
    editor.update(() => {
      updateSelectionWithKlass(klass)
    })
  }

  return { addKlass }
}

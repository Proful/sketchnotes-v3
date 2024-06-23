import { $isAtNodeEnd } from "@lexical/selection"
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $setSelection,
  ElementNode,
  LexicalEditor,
  RangeSelection,
  TextNode,
} from "lexical"

const isTextSelected = (): boolean => {
  let showPopup = false
  const selection = $getSelection()

  if (!$isRangeSelection(selection)) return false

  const node = getSelectedNode(selection as RangeSelection)
  if (selection !== null && selection.getTextContent() !== "") {
    showPopup = $isTextNode(node)
  }

  return showPopup
}

const getSelectedBlockNode = (
  selection: RangeSelection
): TextNode | ElementNode => {
  const anchorNode = (selection as RangeSelection).anchor.getNode()
  const element =
    anchorNode.getKey() === "root"
      ? anchorNode
      : anchorNode.getTopLevelElementOrThrow()
  return element
}

const getSelectedNode = (selection: RangeSelection): TextNode | ElementNode => {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode
  }
}

const isLexClicked = (node: HTMLElement): boolean => {
  return (
    !!node.getAttribute("data-lexical-editor") ||
    !!node.getAttribute("data-lexical-text") ||
    (typeof node.className?.indexOf === "function" &&
      node.className?.indexOf("LexEditorTheme") > -1)
  )
}

const setTransparentCaret = (editor: LexicalEditor) => {
  const root = editor._keyToDOMMap.get("root")
  root!.style.setProperty("caret-color", "transparent")
}

const removeCaretColor = (editor: LexicalEditor) => {
  const root = editor._keyToDOMMap.get("root")
  root!.style.removeProperty("caret-color")
}

const createNodeKeyCountMap = (
  linebreakNodeKeys: string[]
): Record<string, number> => {
  const nodeKeyCountMap: Record<string, number> = {}

  for (const nodeKey of linebreakNodeKeys!) {
    if (nodeKeyCountMap[nodeKey]) {
      nodeKeyCountMap[nodeKey]++
    } else {
      nodeKeyCountMap[nodeKey] = 1
    }
  }

  return nodeKeyCountMap
}

const getTextContentFromHtml = (html: string): string => {
  let temp = document.createElement("div")
  temp.innerHTML = html
  return temp.textContent || temp.innerText || ""
}

const getDisplayTextContentFromHtml = (html: string): string => {
  let txt = getTextContentFromHtml(html)
  if (txt.length > 20) {
    return txt.substring(0, 20)
  } else {
    return txt
  }
}

const selectAll = (editor: any) => {
  let nl = editor.getEditorState()._nodeMap

  const root = nl.get("root")

  const sel = root!.select(0, root!.getChildrenSize())

  $setSelection(sel)
}
// const is

export {
  isTextSelected,
  getSelectedBlockNode,
  getSelectedNode,
  isLexClicked,
  setTransparentCaret,
  removeCaretColor,
  createNodeKeyCountMap,
  getDisplayTextContentFromHtml,
  selectAll,
}

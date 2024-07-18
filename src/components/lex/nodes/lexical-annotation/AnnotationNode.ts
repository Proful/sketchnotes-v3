// AnnotationNode.ts
import { LexicalNode, TextNode } from "lexical"

export class AnnotationNode extends TextNode {
  static getType(): string {
    return "annotation"
  }

  static clone(node: AnnotationNode): AnnotationNode {
    return new AnnotationNode(node.__text, node.__key)
  }

  createDOM(_config: any): HTMLElement {
    const dom = document.createElement("span")
    dom.className = "annotation-node"
    dom.textContent = this.__text
    return dom
  }

  updateDOM(prevNode: AnnotationNode, dom: HTMLElement): boolean {
    if (prevNode.__text !== this.__text) {
      dom.textContent = this.__text
    }
    return false
  }
  isTextEntity(): boolean {
    return true
  }
  static importJSON(serializedNode: any): AnnotationNode {
    const node = $createAnnotationNode(serializedNode.text)
    return node
  }

  exportJSON(): any {
    return {
      ...super.exportJSON(),
      type: "annotation",
    }
  }
}

export function $createAnnotationNode(text: string): AnnotationNode {
  return new AnnotationNode(text).setMode("normal")
}

export function $isAnnotationNode(
  node: LexicalNode | null | undefined
): node is AnnotationNode {
  return node instanceof AnnotationNode
}

import { addClassNamesToElement } from "@lexical/utils"
import {
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedTextNode,
  Spread,
  TextNode,
} from "lexical"

export type SerializedKlassNode = Spread<
  {
    klass: string
  },
  SerializedTextNode
>

export class KlassNode extends TextNode {
  __klass: string

  constructor(text: string, klass: string, key?: NodeKey) {
    super(text, key)
    this.__klass = klass
  }

  static override getType(): string {
    return "klass-node"
  }

  static override clone(node: KlassNode): KlassNode {
    return new KlassNode(node.__text, node.__klass, node.__key)
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config)
    addClassNamesToElement(element, this.__klass)
    return element
  }

  override updateDOM(
    prevNode: KlassNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    const isUpdated = super.updateDOM(prevNode, dom, config)
    if (prevNode.__klass !== this.__klass) {
      addClassNamesToElement(dom, this.__klass)
    }
    return isUpdated
  }

  static override importJSON(serializedNode: SerializedKlassNode): KlassNode {
    const node = $createKlassNode(serializedNode.text, serializedNode.klass)
    node.setFormat(serializedNode.format)
    node.setDetail(serializedNode.detail)
    node.setMode(serializedNode.mode)
    node.setStyle(serializedNode.style)
    return node
  }

  override exportJSON(): SerializedKlassNode {
    return {
      ...super.exportJSON(),
      klass: this.__klass,
      type: "klass-node",
      version: 1,
    }
  }

  override setFormat(format: number): this {
    let self = this.getWritable()
    self.__format = format
    return self
  }

  override canInsertTextBefore(): boolean {
    return false
  }

  override isTextEntity(): true {
    return true
  }

  setKlass(klass: string): void {
    const self = this.getWritable()
    const classes = new Set(self.__klass.split(" ").filter(Boolean))
    classes.add(klass)
    self.__klass = Array.from(classes).join(" ")
  }
}

export const $createKlassNode = (text: string, klass: string): KlassNode => {
  return new KlassNode(text, klass)
}

export function $isKlassNode(
  node: LexicalNode | null | undefined
): node is KlassNode {
  return node instanceof KlassNode
}

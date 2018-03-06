import { ElementVNode, MostlyVNode, VNode } from './'

export function elementToVNode<T extends Element>(element: T): ElementVNode<T> {
  return new MostlyVNode<T>(
    element.tagName && element.tagName.toLowerCase(),
    {
      id: element.id,
      className: element.className
    },
    Array.prototype.slice.call(element.childNodes).map(nodeToVNode) || undefined,
    element,
    undefined,
    undefined,
    undefined,
    undefined,
  ) as ElementVNode<T>
}

function nodeToVNode(node: Element | Text): VNode {
  if (isElement(node))
    return elementToVNode(node)

  const textVNode = MostlyVNode.createText(node.textContent as string)

  textVNode.element = node

  return textVNode as VNode
}

function isElement(node: Node): node is Element {
  return node.nodeType === 1
}

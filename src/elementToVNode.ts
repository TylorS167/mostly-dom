import { ElementVNode, MostlyVNode, VNode } from './'

import { VOID } from './helpers'

export function elementToVNode<T extends Element>(element: T): ElementVNode<T> {
  return new MostlyVNode<T>(
    element.tagName && element.tagName.toLowerCase(),
    element.id,
    element.className,
    {},
    Array.prototype.slice.call(element.childNodes).map(nodeToVNode) || VOID,
    element,
    VOID,
    VOID,
    VOID,
    VOID,
  ) as ElementVNode<T>
}

function nodeToVNode(node: Element | Text): VNode {
  if (node instanceof Element)
    return elementToVNode(node)

  const textVNode = MostlyVNode.createText(node.textContent as string)

  textVNode.element = node

  return textVNode
}

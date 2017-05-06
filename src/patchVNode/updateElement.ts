import { ElementVNode, SCOPE_ATTRIBUTE, VNode } from '../'

export function updateElement(formerVNode: VNode, vNode: VNode): ElementVNode {
  const node = vNode.element = formerVNode.element as Node

  if (isElement(node)) {
    if (vNode.id)
      node.id = vNode.id

    if (vNode.className)
      node.className = vNode.className

    if (vNode.scope)
      node.setAttribute(SCOPE_ATTRIBUTE, vNode.scope)
  }

  return vNode as ElementVNode
}

function isElement(node: Node): node is Element {
  return typeof (node as Element).setAttribute === 'function'
}

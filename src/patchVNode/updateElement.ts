import { ElementVNode, SCOPE_ATTRIBUTE, VNode } from '../'

export function updateElement(formerVNode: VNode, vNode: VNode): ElementVNode {
  const node = vNode.element = formerVNode.element as Node

  if (isElement(node)) {
    const { scope } = vNode

    if (node.className && node.classList)
      node.classList.remove(...node.className.split(' '))

    if (node.id)
      node.removeAttribute('id') && delete node.id

    if (scope)
      node.setAttribute(SCOPE_ATTRIBUTE, scope)
    else
      node.removeAttribute(SCOPE_ATTRIBUTE)
  }

  return vNode as ElementVNode
}

function isElement(node: Node): node is Element {
  return typeof (node as Element).setAttribute === 'function'
}

import { ElementVNode, SCOPE_ATTRIBUTE, VNode } from '../'

export function updateElement(formerVNode: VNode, vNode: VNode): ElementVNode {
  const node = vNode.element = formerVNode.element as Node

  if (isElement(node)) {
    const { id, className, scope } = vNode

    if (id)
      node.id = id
    else
      node.removeAttribute('id') && delete node.id

    if (className)
      trySetClassName(className, node)
    else
      tryRemoveClass(node)

    if (scope)
      node.setAttribute(SCOPE_ATTRIBUTE, scope)
    else
      node.removeAttribute(SCOPE_ATTRIBUTE)
  }

  return vNode as ElementVNode
}

function trySetClassName(className: string, element: Element) {
  try {
    element.className = className
  } catch (e) {}
}

function tryRemoveClass(element: Element) {
  try {
    if (element.className)
      element.classList.remove(...element.className.split(' '))

    if (!element.className)
      element.removeAttribute('class')
  } catch (e) {}
}

function isElement(node: Node): node is Element {
  return typeof (node as Element).setAttribute === 'function'
}

import { ElementVNode, VNode } from './'
import { ModuleCallbacks } from './modules/ModuleCallbacks'

export function removeVNodes(
  parentNode: Node,
  vNodes: Array<VNode>,
  startIndex: number,
  endIndex: number,
  moduleCallbacks: ModuleCallbacks
)
{
  for (; startIndex <= endIndex; ++startIndex) {
    const vNode = vNodes[startIndex]

    if (!vNode) continue

    if (isElementVNode(vNode)) {
      const { props } = vNode

      invokeDestroyHook(vNode, moduleCallbacks)

      const removeElement = moduleCallbacks.createRemoveElementFn(vNode.element)
      moduleCallbacks.remove(vNode, removeElement)

      if (props.remove) props.remove(vNode, removeElement)
      else removeElement()
    } else {
      parentNode.removeChild(vNode.element)
    }
  }
}

function isElementVNode(vNode: VNode): vNode is ElementVNode {
  return vNode.tagName && vNode.element
}

function invokeDestroyHook(vNode: VNode, moduleCallbacks: ModuleCallbacks) {
  const props = vNode.props

  if (props.destroy) props.destroy(vNode)

  if (isElementVNode(vNode)) moduleCallbacks.destroy(vNode)

  const children = vNode.children

  if (!children) return

  for (let i = 0; i < children.length; ++i) invokeDestroyHook(children[i], moduleCallbacks)
}

import { ElementVNode } from './'
import { ModuleCallbacks } from './modules/ModuleCallbacks'

export function removeVNodes(
  parentNode: Node,
  vNodes: Array<ElementVNode>,
  startIndex: number,
  endIndex: number,
  moduleCallbacks: ModuleCallbacks)
{
  for (; startIndex <= endIndex; ++startIndex) {
    const vNode = vNodes[startIndex]

    if (!vNode) continue

    if (vNode.tagName) {
      const props = vNode.props

      invokeDestroyHook(vNode, moduleCallbacks)

      const removeElement = moduleCallbacks.createRemoveElementFn(vNode.element)
      moduleCallbacks.remove(vNode, removeElement)

      if (props.remove)
        props.remove(vNode, removeElement)
      else
        removeElement()
    } else {
      parentNode.removeChild(vNode.element)
    }
  }
}

function invokeDestroyHook(vNode: ElementVNode, moduleCallbacks: ModuleCallbacks) {
  const props = vNode.props

  if (props.destroy) props.destroy(vNode)

  if (vNode.tagName)
    moduleCallbacks.destroy(vNode)

  const children = vNode.children

  if (!children) return

  for (let i = 0; i < children.length; ++i)
    invokeDestroyHook(children[i], moduleCallbacks)
}

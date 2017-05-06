import { VNode, ElementVNode } from '../'
import { ModuleCallbacks } from '../modules/ModuleCallbacks'
import { updateChildren } from '../updateChildren'
import { addVNodes } from '../addVNodes'
import { removeVNodes } from '../removeVNodes'

export function patchVNodeChildren(
  formerVNode: VNode,
  vNode: VNode,
  moduleCallbacks: ModuleCallbacks,
  insertedVNodeQueue: Array<ElementVNode>)
{
  const element = vNode.element as Element
  const formerChildren = formerVNode.children as Array<ElementVNode>
  const children = vNode.children as Array<ElementVNode>

  if (formerVNode.text)
    element.textContent = ''

  if (formerChildren && children && formerChildren !== children)
    updateChildren(element, formerChildren, children, moduleCallbacks, insertedVNodeQueue)
  else if (children)
    addVNodes(element, null, children, 0, endIndex(children), moduleCallbacks, insertedVNodeQueue)
  else if (formerChildren)
    removeVNodes(element, formerChildren, 0, endIndex(formerChildren), moduleCallbacks)
}

function endIndex(vNodeChildren: Array<ElementVNode>) {
  return vNodeChildren.length - 1
}

import { ElementVNode, TextVNode, VNode } from '../'
import { postpatchHooks, prepatchHooks, updateHooks } from './hooks'

import { ModuleCallbacks } from '../modules/ModuleCallbacks'
import { patchVNodeChildren } from './patchVNodeChildren'
import { replacePreviousElement } from './replacePreviousElement'
import { updateElement } from './updateElement'
import { vNodesAreEqual } from '../helpers'

export function patchVNode(
  formerVNode: VNode,
  vNode: VNode,
  moduleCallbacks: ModuleCallbacks,
  insertedVNodeQueue: Array<ElementVNode>): void
{
  prepatchHooks(formerVNode as ElementVNode, vNode as VNode<Element>, moduleCallbacks)

  vNode = updateElement(formerVNode, vNode)

  if (formerVNode === vNode) return

  if (!vNodesAreEqual(formerVNode, vNode))
    return replacePreviousElement(formerVNode, vNode, moduleCallbacks, insertedVNodeQueue)

  updateHooks(formerVNode as ElementVNode, vNode as ElementVNode, moduleCallbacks)

  if (!vNode.text)
    patchVNodeChildren(formerVNode, vNode, moduleCallbacks, insertedVNodeQueue)
  else if (formerVNode.text !== (vNode as TextVNode).text)
    (vNode.element as Element).textContent = vNode.text

  postpatchHooks(formerVNode as ElementVNode, vNode as ElementVNode, moduleCallbacks)
}

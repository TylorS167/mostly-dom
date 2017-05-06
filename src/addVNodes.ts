import { ElementVNode } from './'
import { ModuleCallbacks } from './modules/ModuleCallbacks'
import { createElement } from './createElement'

export function addVNodes(
  parentNode: Node,
  referenceNode: Node | null,
  vNodes: Array<ElementVNode>,
  startIndex: number,
  endIndex: number,
  moduleCallbacks: ModuleCallbacks,
  insertedVNodeQueue: Array<ElementVNode>)
{
  for (; startIndex <= endIndex; ++startIndex)
    parentNode.insertBefore(
      createElement(vNodes[startIndex], moduleCallbacks, insertedVNodeQueue).element,
      referenceNode,
    )
}

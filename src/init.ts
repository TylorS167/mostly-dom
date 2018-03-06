import { ElementVNode, InsertHook, Module, VNode, VNodeEvents, VNodeProps } from './'

import { ModuleCallbacks } from './modules/ModuleCallbacks'
import { createElement } from './createElement'
import { patchVNode } from './patchVNode'
import { removeVNodes } from './removeVNodes'
import { vNodesAreEqual } from './helpers'

export function init(modules: Array<Module> = []) {
  const moduleCallbacks = new ModuleCallbacks(modules)

  return function patch<
    T extends Element,
    Props extends VNodeProps<T, VNodeEvents<T, ElementEventMap>>
  >(formerVNode: ElementVNode, vNode: VNode<T, Props>): ElementVNode<T>
  {
    const insertedVNodeQueue: Array<ElementVNode> = []

    moduleCallbacks.pre(vNode)

    if (vNodesAreEqual(formerVNode, vNode))
      patchVNode(formerVNode, vNode, moduleCallbacks, insertedVNodeQueue)
    else {
      const element = formerVNode.element
      const parentNode = element.parentNode

      vNode = createElement(vNode, moduleCallbacks, insertedVNodeQueue) as VNode

      if (parentNode) {
        parentNode.insertBefore(vNode.element as Element, element.nextSibling)
        removeVNodes(parentNode, [ formerVNode ], 0, 0, moduleCallbacks)
      }
    }

    for (let i = 0; i < insertedVNodeQueue.length; ++i)
      (insertedVNodeQueue[i].props.insert as InsertHook<Element>)(insertedVNodeQueue[i])

    moduleCallbacks.post(vNode as ElementVNode)

    return vNode as ElementVNode<T, Props>
  }
}

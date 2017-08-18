import {
  ElementVNode,
  InsertHook,
  Module,
  VNode,
  VNodeEvents,
  VNodeProps,
} from './'

import { ModuleCallbacks } from './modules/ModuleCallbacks'
import { createAttributesModule } from './modules/attributes'
import { createClassModule } from './modules/class'
import { createElement } from './createElement'
import { createEventsModule } from './modules/events'
import { createFocusModule } from './modules/focus'
import { createPropsModule } from './modules/props'
import { createStylesModule } from './modules/styles'
import { patchVNode } from './patchVNode'
import { removeVNodes } from './removeVNodes'
import { vNodesAreEqual } from './helpers'

const defaultModules =
  [
    createAttributesModule(),
    createClassModule(),
    createEventsModule(),
    createFocusModule(),
    createPropsModule(),
    createStylesModule()
  ]

export function init<T extends Element = Element>(
  modules: Array<Module<Element>> = defaultModules)
{
  const moduleCallbacks = new ModuleCallbacks(modules)

  return function patch(
    formerVNode: ElementVNode<T, VNodeProps<T>>,
    vNode: VNode<T, VNodeProps<T>>): ElementVNode<T, VNodeProps<T>>
  {
    const insertedVNodeQueue: Array<ElementVNode> = []

    moduleCallbacks.pre(vNode)

    if (vNodesAreEqual(formerVNode, vNode))
      patchVNode(formerVNode, vNode, moduleCallbacks, insertedVNodeQueue)
    else {
      const element = formerVNode.element
      const parentNode = element.parentNode

      vNode = createElement(vNode, moduleCallbacks, insertedVNodeQueue) as ElementVNode<T>

      if (parentNode) {
        parentNode.insertBefore(vNode.element as Element, element.nextSibling)
        removeVNodes(parentNode, [ formerVNode ], 0, 0, moduleCallbacks)
      }
    }

    for (let i = 0; i < insertedVNodeQueue.length; ++i)
      (insertedVNodeQueue[i].props.insert as InsertHook<Element>)(insertedVNodeQueue[i])

    moduleCallbacks.post(vNode as ElementVNode)

    return vNode as ElementVNode<T>
  }
}

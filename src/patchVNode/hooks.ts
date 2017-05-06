import { ElementVNode, VirtualNode } from '../'

import { ModuleCallbacks } from '../modules/ModuleCallbacks'

export function prepatchHooks(
  formerVNode: ElementVNode,
  vNode: VirtualNode<Element>,
  moduleCallbacks: ModuleCallbacks)
{
  const props = vNode.props

  moduleCallbacks.prepatch(formerVNode, vNode)

  if (props.prepatch)
    props.prepatch(formerVNode, vNode)
}

export function updateHooks(
  formerVNode: ElementVNode,
  vNode: ElementVNode,
  moduleCallbacks: ModuleCallbacks)
{
  const props = vNode.props

  moduleCallbacks.update(formerVNode, vNode)

  if (props.update) props.update(formerVNode, vNode)
}

export function postpatchHooks(
  formerVNode: ElementVNode,
  vNode: ElementVNode,
  moduleCallbacks: ModuleCallbacks)
{
  const props = vNode.props

  moduleCallbacks.postpatch(formerVNode, vNode)

  if (props.postpatch)
    props.postpatch(formerVNode, vNode)
}

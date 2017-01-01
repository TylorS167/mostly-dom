import { VNode, ElementVNode } from '../';
import { ModuleCallbacks } from '../modules/ModuleCallbacks';

export function prepatchHooks (
  formerVNode: VNode,
  vNode: VNode,
  moduleCallbacks: ModuleCallbacks)
{
  const props = vNode.props;

  moduleCallbacks.prepatch(formerVNode, vNode);

  if (props.prepatch)
    props.prepatch(formerVNode, vNode);
}

export function updateHooks (
  formerVNode: VNode,
  vNode: VNode,
  moduleCallbacks: ModuleCallbacks)
{
  const props = vNode.props;

  moduleCallbacks.update(formerVNode as ElementVNode, vNode as ElementVNode);

  if (props.update) props.update(formerVNode as ElementVNode, vNode as ElementVNode);
}

export function postpatchHooks (
  formerVNode: VNode,
  vNode: VNode,
  moduleCallbacks: ModuleCallbacks)
{
  const props = vNode.props;

  moduleCallbacks.postpatch(formerVNode, vNode);

  if (props.postpatch)
    props.postpatch(formerVNode, vNode);
}

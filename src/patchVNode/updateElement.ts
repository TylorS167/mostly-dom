import { VNode, ElementVNode, SCOPE_ATTRIBUTE } from '../';

export function updateElement (formerVNode: VNode, vNode: VNode): ElementVNode {
  vNode.element = formerVNode.element;

  if (vNode.id)
    (vNode.element as Element).id = vNode.id;

  if (vNode.className)
    (vNode.element as Element).className = vNode.className;

  if (vNode.scope)
    (vNode.element as Element).setAttribute(SCOPE_ATTRIBUTE, vNode.scope);

  return vNode as ElementVNode;
}

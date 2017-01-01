import { VNode, ElementVNode } from '../';

export function updateElement (formerVNode: VNode, vNode: VNode): ElementVNode {
  vNode.element = formerVNode.element;

  if (vNode.id)
    (vNode.element as Element).id = vNode.id;

  if (vNode.className)
    (vNode.element as Element).className = vNode.className;

  return vNode as ElementVNode;
}

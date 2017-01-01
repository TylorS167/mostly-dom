import { ElementVNode, MostlyVNode, VNode } from './';
import { VOID } from './helpers';

export function elementToVNode (element: Element): ElementVNode {
  return new MostlyVNode(
    element.tagName && element.tagName.toLowerCase(),
    element.id,
    element.className,
    {},
    Array.prototype.slice.call(element.childNodes).map(nodeToVNode) || VOID,
    element,
    VOID,
    VOID,
    VOID,
    VOID,
  ) as ElementVNode;
}

function nodeToVNode(node: Element | Text): VNode {
  if (node instanceof Element)
    return elementToVNode(node);

  return MostlyVNode.createText(node.textContent as string);
}

import { VNode, ElementVNode } from '../';
import { ModuleCallbacks } from '../modules/ModuleCallbacks';
import { createElement } from '../createElement';
import { removeVNodes } from '../removeVNodes';

export function replacePreviousElement(
  formerVNode: VNode,
  vNode: VNode,
  moduleCallbacks: ModuleCallbacks,
  insertedVNodeQueue: ElementVNode[])
{
  const parentNode = (formerVNode.element as Element).parentNode as Node;

  const element = createElement(vNode, moduleCallbacks, insertedVNodeQueue).element as Element;

  parentNode.insertBefore(element, formerVNode.element as Element);

  removeVNodes(parentNode, [formerVNode as ElementVNode], 0, 0, moduleCallbacks);
}

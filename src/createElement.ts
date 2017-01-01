import { VNode, ElementVNode, TextVNode } from './';
import { ModuleCallbacks } from './modules/ModuleCallbacks';
import { SCOPE_ATTRIBUTE } from './dom-scope-attribute';

export function createElement (
  vNode: VNode,
  moduleCallbacks: ModuleCallbacks,
  insertedVNodeQueue: Array<ElementVNode>): ElementVNode | TextVNode
{
  const props = vNode.props;

  moduleCallbacks.init(vNode);

  if (props.init)
    props.init(vNode);

  if (vNode.tagName) {
    const element = vNode.namespace
      ? document.createElementNS(vNode.namespace, vNode.tagName)
      : document.createElement(vNode.tagName);

    if (vNode.id)
      element.id = vNode.id;

    if (vNode.className)
      element.className = vNode.className;

    if (vNode.scope)
      element.setAttribute(SCOPE_ATTRIBUTE, vNode.scope);

    vNode.element = element;

    const children = vNode.children;

    if (children) {
      const childCount = children.length;

      for (let i = 0; i < childCount; ++i)
        element.appendChild(
          createElement(children[i], moduleCallbacks, insertedVNodeQueue).element as Node);
    }

    if (vNode.text)
      element.appendChild(document.createTextNode(vNode.text));

    moduleCallbacks.create(vNode as ElementVNode);

    if (props.create)
      props.create(vNode as ElementVNode);

    if (props.insert)
      insertedVNodeQueue.push(vNode as ElementVNode);

    return vNode as ElementVNode;
  }

  vNode.element = document.createTextNode(vNode.text as string);

  return vNode as TextVNode;
}

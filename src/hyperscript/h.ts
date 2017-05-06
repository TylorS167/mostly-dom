import { MostlyVNode, addSvgNamespace } from './VNode';
import { VNode, VNodeProps, VirtualNode } from '../types';
import { VOID, isPrimitive, isString } from '../helpers';

import { parseSelector } from './parseSelector';

export const h: HyperscriptFn = function h(): VNode {
  const selector: string = arguments[0]; // required
  let childrenOrText: Array<VNode | string> | string = arguments[2]; // optional

  let { tagName, id, className } = parseSelector(selector);
  let props: VNodeProps<Element> = {};
  let children: Array<VNode> | void;
  let text: string | void;

  if (childrenOrText) {
    props = arguments[1];

    if (Array.isArray(childrenOrText))
      children = childrenOrText as Array<VNode>;
    else if (isPrimitive(childrenOrText))
      text = String(childrenOrText);

  } else if (arguments[1]) {
    const childrenOrTextOrProps = arguments[1];

    if (Array.isArray(childrenOrTextOrProps))
      children = childrenOrTextOrProps as Array<VNode>;
    else if (isPrimitive(childrenOrTextOrProps))
      text = String(childrenOrTextOrProps);
    else
      props = childrenOrTextOrProps;
  }

  if (props && props.class && typeof props.class === 'object') {
    const ck = Object.keys(props.class);
    const cp = props.class;
    className = ck.reduce((cn, k) => cp[k] ? `${cn} ${k}` : cn, className);
  }

  const isSvg = tagName === 'svg';

  const vNode = isSvg
    ? MostlyVNode.createSvg(tagName, id, className, props, VOID, text)
    : MostlyVNode.create(tagName, id, className, props, VOID, text);

  if (Array.isArray(children))
    vNode.children = sanitizeChildren(children, vNode);

  if (isSvg)
    addSvgNamespace(vNode);

  return vNode;
};

function sanitizeChildren (childrenOrText: Array<string | VNode>, parent: VNode): Array<VNode> {
  childrenOrText = childrenOrText.filter(Boolean); // remove possible null values
  const childCount: number = childrenOrText.length;

  const children: Array<VNode> = Array(childCount);

  for (let i = 0; i < childCount; ++i) {
    const vNodeOrText = childrenOrText[i];

    if (isString(vNodeOrText))
      children[i] = MostlyVNode.createText(vNodeOrText);
    else
      children[i] = vNodeOrText;

    if (parent.scope && !children[i].scope)
      children[i].scope = parent.scope;

    children[i].parent = parent;
  }

  return children;
}

export type HyperscriptChildren =
  string |
  number |
  Array<string | VNode | null> |
  ReadonlyArray<string | VNode | null>;

export interface HyperscriptFn {
  (sel: string): VNode;
  (sel: string, data: VNodeProps<any>): VNode;
  (sel: string, children: HyperscriptChildren): VNode;
  (sel: string, data: VNodeProps<any>, children: HyperscriptChildren): VNode;

  <T extends Node, Props = VNodeProps<Element>>(sel: string): VirtualNode<T, Props>;
  <T extends Node, Props = VNodeProps<Element>>(
    sel: string,
    data: Props): VirtualNode<T>;
  <T extends Node, Props = VNodeProps<Element>>(
    sel: string,
    children: HyperscriptChildren): VirtualNode<T, Props>;

  <T extends Node, Props = VNodeProps<Element>>(
    sel: string,
    data: Props,
    children: HyperscriptChildren): VirtualNode<T, Props>;
}

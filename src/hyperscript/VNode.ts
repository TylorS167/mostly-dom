import { VNodeProps, VirtualNode } from '../types';

const VOID = void 0;

export const SVG_NAMESPACE = `http://www.w3.org/2000/svg`;

const defaultTextNodeData: VNodeProps = {};

export class MostlyVNode implements VirtualNode<Node> {
  public parent: MostlyVNode | void = VOID;

  constructor(
    public tagName: string | void,
    public id: string | void,
    public className: string | void,
    public props: VNodeProps,
    public children: Array<VirtualNode<Node>> | ReadonlyArray<VirtualNode<Node>> | void,
    public element: Node | void,
    public text: string | void,
    public key: string | number | void,
    public scope: string | void,
    public namespace: string | void,
  ) {}

  public static create(
    tagName: string | void,
    id: string | void,
    className: string | void,
    props: VNodeProps,
    children: Array<VirtualNode<Node>> | ReadonlyArray<VirtualNode<Node>> | void,
    text: string | void,
  ) {
    return new MostlyVNode(
      tagName, id, className, props, children, VOID, text, props.key, props.scope, VOID);
  }

  public static createText(text: string): MostlyVNode {
    return new MostlyVNode(
      VOID, VOID, VOID, defaultTextNodeData, VOID, VOID, text, VOID, VOID, VOID);
  }

  public static createSvg(
    tagName: string | void,
    id: string | void,
    className: string | void,
    props: VNodeProps,
    children: Array<VirtualNode<Node>> | ReadonlyArray<VirtualNode<Node>> | void,
    text: string | void,
  ) {
    return new MostlyVNode(
      tagName, id, className, props, children, VOID, text, props.key, props.scope, SVG_NAMESPACE);
  }
}

export function addSvgNamespace(vNode: MostlyVNode): void {
  vNode.namespace = SVG_NAMESPACE;

  if (Array.isArray(vNode.children)) {
    const children = vNode.children;
    const childCount = children.length;

    for (let i = 0; i < childCount; ++i) {
      const child = children[i];

      if (child.tagName !== 'foreignObject')
        addSvgNamespace(child);
    }
  }
}

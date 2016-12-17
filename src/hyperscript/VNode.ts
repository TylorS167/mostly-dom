import { VirtualNode, VNodeProps } from '../types';

const VOID = void 0;

export const SVG_NAMESPACE = `http://www.w3.org/2000/svg`;

const defaultTextNodeData: VNodeProps = {};

export class VNode implements VirtualNode<any> {
  public parent: VNode | void = VOID;

  constructor(
    public tagName: string | void,
    public id: string | void,
    public className: string | void,
    public props: VNodeProps,
    public children: Array<VirtualNode<any>> | void,
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
    children: Array<VirtualNode<any>> | void,
    text: string | void,
  ) {
    return new VNode(
      tagName, id, className, props, children, VOID, text, props.key, VOID, VOID);
  }

  public static createText(text: string): VNode {
    return new VNode(
      VOID, VOID, VOID, defaultTextNodeData, VOID, VOID, text, VOID, VOID, VOID);
  };

  public static createSvg(
    tagName: string | void,
    id: string | void,
    className: string | void,
    props: VNodeProps,
    children: Array<VirtualNode<any>> | void,
    text: string | void,
  ) {
    return new VNode(
      tagName, id, className, props, children, VOID, text, props.key, VOID, SVG_NAMESPACE);
  }
}

export function addSvgNamespace(vNode: VNode): void {
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

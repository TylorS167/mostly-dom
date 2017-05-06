import { VNodeProps, VirtualNode } from '../types'

const VOID = void 0

export const SVG_NAMESPACE = `http://www.w3.org/2000/svg`

const defaultTextNodeData: VNodeProps<Element> = {}

export class MostlyVNode<T extends Node> implements VirtualNode<T> {
  public parent: MostlyVNode<Element> | void = VOID

  constructor(
    public tagName: string | void,
    public id: string | void,
    public className: string | void,
    public props: VNodeProps<Element>,
    public children: Array<VirtualNode<Node>> | ReadonlyArray<VirtualNode<Node>> | void,
    public element: T | void,
    public text: string | void,
    public key: string | number | void,
    public scope: string | void,
    public namespace: string | void,
  ) {}

  public static create<T extends Node>(
    tagName: string | void,
    id: string | void,
    className: string | void,
    props: VNodeProps<Element>,
    children: Array<VirtualNode<Node>> | ReadonlyArray<VirtualNode<Node>> | void,
    text: string | void,
  )
  {
    return new MostlyVNode<T>(
      tagName, id, className, props, children, VOID, text, props.key, props.scope, VOID)
  }

  public static createText(text: string): MostlyVNode<Text> {
    return new MostlyVNode<Text>(
      VOID, VOID, VOID, defaultTextNodeData, VOID, VOID, text, VOID, VOID, VOID)
  }

  public static createSvg(
    tagName: string | void,
    id: string | void,
    className: string | void,
    props: VNodeProps<SVGElement>,
    children: Array<VirtualNode<Node>> | ReadonlyArray<VirtualNode<Node>> | void,
    text: string | void,
  )
  {
    return new MostlyVNode<SVGElement>(
      tagName, id, className, props, children, VOID, text, props.key, props.scope, SVG_NAMESPACE)
  }
}

export function addSvgNamespace(vNode: MostlyVNode<Node>): void {
  vNode.namespace = SVG_NAMESPACE

  if (Array.isArray(vNode.children)) {
    const children = vNode.children
    const childCount = children.length

    for (let i = 0; i < childCount; ++i) {
      const child = children[i]

      if (child.tagName !== 'foreignObject')
        addSvgNamespace(child as MostlyVNode<Node>)
    }
  }
}

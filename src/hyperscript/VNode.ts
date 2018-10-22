import { VNode, VNodeProps, VNodeEvents } from '../types'

export const SVG_NAMESPACE = `http://www.w3.org/2000/svg`

const defaultTextNodeData: VNodeProps<Element> = {}

export class MostlyVNode<T extends Node> implements VNode<T> {
  public parent: MostlyVNode<Element> | undefined = undefined

  constructor(
    public tagName: string | undefined,
    public props: VNodeProps<Element>,
    public children: Array<VNode> | undefined,
    public element: T | undefined,
    public text: string | undefined,
    public key: string | number | undefined,
    public scope: string | undefined,
    public namespace: string | undefined
  ) {}

  public static create(
    tagName: string | undefined,
    props: VNodeProps<Element>,
    children: Array<VNode> | undefined,
    text: string | undefined
  )
  {
    return new MostlyVNode(
      tagName,
      props,
      children,
      undefined,
      text,
      props.key,
      props.scope,
      undefined
    )
  }

  public static createText(text: string): MostlyVNode<Text> {
    return new MostlyVNode<Text>(
      undefined,
      defaultTextNodeData,
      undefined,
      undefined,
      text,
      undefined,
      undefined,
      undefined
    )
  }

  public static createSvg(
    tagName: string | undefined,
    props: VNodeProps<SVGElement, VNodeEvents<SVGElement, SVGElementEventMap>>,
    children: Array<VNode> | undefined,
    text: string | undefined
  )
  {
    return new MostlyVNode<SVGElement>(
      tagName,
      props as any,
      children,
      undefined,
      text,
      props.key,
      props.scope,
      SVG_NAMESPACE
    )
  }
}

export function addSvgNamespace(vNode: MostlyVNode<Node>): void {
  vNode.namespace = SVG_NAMESPACE

  if (Array.isArray(vNode.children)) {
    const children = vNode.children
    const childCount = children.length

    for (let i = 0; i < childCount; ++i) {
      const child = children[i]

      if (child.tagName !== 'foreignObject') addSvgNamespace(child as MostlyVNode<Node>)
    }
  }
}

import { HtmlTagNames, SvgTagNames, VNode, VNodeProps } from '../types'
import { MostlyVNode, addSvgNamespace } from './VNode'
import { VOID, isPrimitive, isString } from '../helpers'

export const h: HyperscriptFn = function(): VNode {
  const tagName: string = arguments[0] // required
  const childrenOrText: Array<VNode | string> | string = arguments[2] // optional

  let props: VNodeProps<Element> = {}
  let children: Array<VNode> | void
  let text: string | void

  if (childrenOrText) {
    props = arguments[1]

    if (Array.isArray(childrenOrText))
      children = childrenOrText as Array<VNode>
    else if (isPrimitive(childrenOrText))
      text = String(childrenOrText)

  } else if (arguments[1]) {
    const childrenOrTextOrProps = arguments[1]

    if (Array.isArray(childrenOrTextOrProps))
      children = childrenOrTextOrProps as Array<VNode>
    else if (isPrimitive(childrenOrTextOrProps))
      text = String(childrenOrTextOrProps)
    else
      props = childrenOrTextOrProps
  }

  const isSvg = tagName === 'svg'

  const vNode = isSvg
    ? MostlyVNode.createSvg(tagName, props, VOID, text)
    : MostlyVNode.create(tagName, props, VOID, text)

  if (Array.isArray(children))
    vNode.children = sanitizeChildren(children, vNode)

  if (isSvg)
    addSvgNamespace(vNode)

  return vNode
}

function sanitizeChildren(childrenOrText: Array<string | VNode>, parent: VNode): Array<VNode> {
  childrenOrText = childrenOrText.filter(Boolean) // remove possible null values
  const childCount: number = childrenOrText.length

  const children: Array<VNode> = Array(childCount)

  for (let i = 0; i < childCount; ++i) {
    const vNodeOrText = childrenOrText[i]

    if (isString(vNodeOrText))
      children[i] = MostlyVNode.createText(vNodeOrText)
    else
      children[i] = vNodeOrText

    if (parent.scope && !children[i].scope)
      children[i].scope = parent.scope

    children[i].parent = parent as VNode<Element>
  }

  return children
}

export type HyperscriptChildren =
  string |
  number |
  Array<string | VNode | null> |
  ReadonlyArray<string | VNode | null>

export type ValidTagNames = HtmlTagNames | SvgTagNames

export interface HyperscriptFn {
  (tagName: ValidTagNames): VNode
  (tagName: ValidTagNames, props: VNodeProps<any>): VNode
  (tagName: ValidTagNames, children: HyperscriptChildren): VNode
  (tagName: ValidTagNames, props: VNodeProps<any>, children: HyperscriptChildren): VNode

  <T extends Node, Props extends VNodeProps<Element> = VNodeProps<Element>>(
    tagName: ValidTagNames): VNode<T, Props>
  <T extends Node, Props extends VNodeProps<Element> = VNodeProps<Element>>(
    tagName: ValidTagNames,
    props: Props): VNode<T>
  <T extends Node, Props extends VNodeProps<Element> = VNodeProps<Element>>(
    tagName: ValidTagNames,
    children: HyperscriptChildren): VNode<T, Props>

  <T extends Node, Props extends VNodeProps<Element> = VNodeProps<Element>>(
    tagName: ValidTagNames,
    props: Props,
    children: HyperscriptChildren): VNode<T, Props>
}

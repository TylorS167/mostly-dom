import { HtmlTagNames, SvgTagNames, VNode, VNodeProps } from '../types'
import { MostlyVNode, addSvgNamespace } from './VNode'
import { VOID, isPrimitive, isString } from '../helpers'

export const h: HyperscriptFn = function(): VNode {
  const tagName: string | ComponentFn = arguments[0] // required
  const childrenOrText: HyperscriptChildren = arguments[2] // optional

  let props: VNodeProps<Element> = {}
  let children: ArrayLike<VNode> | undefined
  let text: string | undefined

  if (childrenOrText) {
    props = arguments[1]

    if (isArrayLike(childrenOrText)) children = flattenArrayLike(childrenOrText) as Array<VNode>
    else if (isPrimitive(childrenOrText)) text = String(childrenOrText)
  } else if (arguments[1]) {
    const childrenOrTextOrProps = arguments[1]

    if (isArrayLike(childrenOrTextOrProps))
      children = flattenArrayLike(childrenOrTextOrProps) as Array<VNode>
    else if (isPrimitive(childrenOrTextOrProps)) text = String(childrenOrTextOrProps)
    else props = childrenOrTextOrProps
  }

  if (typeof tagName === 'function') {
    return tagName(props, Array.isArray(children) ? children : text ? [ text ] : [])
  }

  const isSvg = tagName === 'svg'

  const vNode = isSvg
    ? MostlyVNode.createSvg(tagName, props as any, VOID, text)
    : MostlyVNode.create(tagName, props, undefined, text)

  if (Array.isArray(children)) vNode.children = sanitizeChildren(children, vNode)

  if (isSvg) addSvgNamespace(vNode)

  return vNode
}

function isArrayLike<T>(x: any): x is ArrayLike<T> {
  const typeOf = typeof x

  return x && typeof x.length === 'number' && typeOf !== 'function' && typeOf !== 'string'
}

function flattenArrayLike<A>(arrayLike: ArrayLike<A | ArrayLike<A>>): Array<A> {
  const arr = []

  for (let i = 0; i < arrayLike.length; ++i) {
    const x = arrayLike[i]

    if (isArrayLike(x)) {
      arr.push(...Array.from(x))
    } else {
      arr.push(x)
    }
  }

  return arr
}

function sanitizeChildren(childrenOrText: Array<VNode>, parent: VNode): Array<VNode> {
  childrenOrText = childrenOrText.filter(Boolean) // remove possible null values
  const childCount: number = childrenOrText.length

  const children: Array<VNode> = Array(childCount)

  for (let i = 0; i < childCount; ++i) {
    const vNodeOrText = childrenOrText[i]

    if (isString(vNodeOrText)) children[i] = MostlyVNode.createText(vNodeOrText)
    else children[i] = vNodeOrText

    if (parent.scope && !children[i].scope) children[i].scope = parent.scope

    children[i].parent = parent as VNode<Element>
  }

  return children
}

export type VNodeChildren = string | number | null | VNode
export type HyperscriptChildren =
  | VNodeChildren
  | ArrayLike<VNodeChildren>
  | ArrayLike<VNodeChildren | ArrayLike<VNodeChildren>>
  | ArrayLike<ArrayLike<VNodeChildren>>

export interface ComponentFn {
  (props: VNodeProps, children: Array<string | null | VNode>): VNode
}

export type ValidTagNames = HtmlTagNames | SvgTagNames | ComponentFn

export interface HyperscriptFn {
  (tagName: ValidTagNames): VNode
  (tagName: ValidTagNames, props: VNodeProps<any>): VNode
  (tagName: ValidTagNames, children: HyperscriptChildren): VNode
  (tagName: ValidTagNames, props: VNodeProps<any>, children: HyperscriptChildren): VNode

  <T extends Node, Props extends VNodeProps<Element> = VNodeProps<Element>>(
    tagName: ValidTagNames
  ): VNode<T, Props>
  <T extends Node, Props extends VNodeProps<Element> = VNodeProps<Element>>(
    tagName: ValidTagNames,
    props: Props
  ): VNode<T>
  <T extends Node, Props extends VNodeProps<Element> = VNodeProps<Element>>(
    tagName: ValidTagNames,
    children: HyperscriptChildren
  ): VNode<T, Props>

  <T extends Node, Props extends VNodeProps<Element> = VNodeProps<Element>>(
    tagName: ValidTagNames,
    props: Props,
    children: HyperscriptChildren
  ): VNode<T, Props>
}

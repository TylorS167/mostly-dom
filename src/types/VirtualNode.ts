import * as hooks from './hooks'

import { CSSProperties } from './CSS'
import { ElementProperties } from './HtmlProperties'
import { VNodeEvents } from './VNodeEventTypes'
import { HyperscriptChildren } from '../index'

export interface VNode<T extends Node = any, Props = any> {
  tagName: string | undefined
  props: Props
  children: Array<VNode> | undefined
  text: string | undefined
  key: string | number | undefined
  element: T | undefined
  namespace: string | undefined
  scope: string | undefined

  parent: VNode<Element> | undefined
}

// tslint:disable-next-line:max-line-length
export interface ElementVNode<T extends Element = Element, Props = any> extends VNode<T, Props> {
  tagName: string
  element: T
  namespace: string
  text: undefined
}

export interface TextVNode extends VNode<Text> {
  tagName: undefined
  children: undefined
  text: string
  key: undefined
  element: Text
  namespace: undefined
  scope: undefined
}

export interface VNodeProps<
  T extends Element = Element,
  EventMap extends VNodeEvents<T, ElementEventMap> = VNodeEvents<T, ElementEventMap>
> extends ElementProperties {
  // key for dom diffing
  key?: string | number

  // classes
  class?: { [className: string]: Boolean }

  // attributes for setAttribute()
  attrs?: { [attributeName: string]: any }

  // styling
  style?: VNodeStyle

  // events
  on?: EventMap
  listener?: EventListener

  // declarative focusing
  focus?: boolean

  scope?: string

  // hooks
  init?: hooks.InitHook
  create?: hooks.CreateHook<T>
  update?: hooks.UpdateHook<T>
  insert?: hooks.InsertHook<T>
  remove?: hooks.RemoveHook<T>
  destroy?: hooks.DestroyHook<T>
  prepatch?: hooks.PrepatchHook<T>
  postpatch?: hooks.PostpatchHook<T>
}

export interface VNodeStyle extends CSSProperties {
  delayed?: CSSProperties
  remove?: CSSProperties
}

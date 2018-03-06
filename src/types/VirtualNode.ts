import * as hooks from './hooks'

import { CSSProperties } from './CSS'
import { ElementProperties } from './HtmlProperties'
import { VNodeEvents } from './VNodeEventTypes'

export interface VNode<T extends Node = Node, Props = VNodeProps<Element>> {
  tagName: string | void
  props: Props
  children: Array<VNode> | ReadonlyArray<VNode> | void
  text: string | void
  key: string | number | void
  element: T | void
  namespace: string | void
  scope: string | void

  parent: VNode<Element> | void
}

// tslint:disable-next-line:max-line-length
export interface ElementVNode<T extends Element = Element, Props = VNodeProps<T>> extends VNode<
  T,
  Props
> {
  tagName: string
  element: T
  namespace: string
  text: void
  children: Array<ElementVNode> | ReadonlyArray<ElementVNode> | void
}

export interface TextVNode extends VNode<Text> {
  tagName: void
  children: void
  text: string
  key: void
  element: Text
  namespace: void
  scope: void
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

  // TODO: maybe find a better name
  // this is a namespace for custom modules
  module?: any
}

export interface VNodeStyle extends CSSProperties {
  delayed?: CSSProperties
  remove?: CSSProperties
}

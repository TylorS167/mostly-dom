import { ElementVNode } from './VirtualNode'

export type VNodeEvent<T, Ev extends Event> = Ev & { currentTarget: T }

export type EventHandler<T extends Element, Ev extends Event> = (
  event: VNodeEvent<T, Ev>,
  vNode: ElementVNode<T>
) => any

export type VNodeEvents<T extends Element, EventMap extends { [K in keyof EventMap]: Event }> = {
  [K in keyof EventMap]?: EventHandler<T, EventMap[K]>
}

export type ElementEvents<T extends Element> = VNodeEvents<T, ElementEventMap>

export type HtmlElementEvents<T extends HTMLElement> = VNodeEvents<T, HTMLElementEventMap>

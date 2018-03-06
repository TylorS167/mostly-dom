import { ElementVNode, VNode } from './VirtualNode'

export interface Module {
  pre: PreModuleHook
  post: PostModuleHook
  init: InitHook
  create: CreateHook<Element>
  update: UpdateHook<Element>
  remove: RemoveHook<Element>
  destroy: DestroyHook<Element>
  prepatch: PrepatchHook<Element>
  postpatch: PostpatchHook<Element>
}

// Only available to modules
// before any diffing or patching
export type PreModuleHook = (vNode: VNode) => any
// before returning the just patched vNode
export type PostModuleHook = (vNode: ElementVNode) => any

// Available to both VNode and Modules
// called just before created an element from a VirtualNode
export type InitHook = (vNode: VNode) => any
// called when a VirtualNode becomes an ElementVNode
export type CreateHook<T extends Element = Element> = (vNode: ElementVNode<T>) => any
// called when a ElementVNode element is being updated
export type UpdateHook<T extends Element = Element> =
  (formerVNode: ElementVNode<T>, vNode: ElementVNode<T>) => any
// called when an ElementVNode is being removed from the DOM
export type RemoveHook<T extends Element = Element> =
  (vNode: ElementVNode<T>, removeElement: () => void) => any
// called when an ElementVNode's parent is being removed from the DOM
export type DestroyHook<T extends Element = Element> = (vNode: ElementVNode<T>) => any
// called just before an ElementVNode is about to be patched
export type PrepatchHook<T extends Node = Node> =
  (formerVNode: VNode<T>, vNode: VNode<T>) => any
// called just after an ElementVNode has been patched
export type PostpatchHook<T extends Element = Element> =
  (formerVNode: ElementVNode<T>, vNode: ElementVNode<T>) => any

// Available for only VNode hooks
// called when an ElementVNode has been inserted into the DOM
export type InsertHook<T extends Element = Element> = (vNode: ElementVNode<T>) => any

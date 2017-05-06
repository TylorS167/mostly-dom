import { ElementVNode, ElementVirtualNode, VirtualNode } from './VirtualNode';

export interface Module<T extends Element> {
  pre: PreModuleHook;
  post: PostModuleHook;

  init: InitHook;
  create: CreateHook<T>;
  update: UpdateHook<T>;
  remove: RemoveHook<T>;
  destroy: DestroyHook<T>;
  prepatch: PrepatchHook<T>;
  postpatch: PostpatchHook<T>;
}

// Only available to modules
// before any diffing or patching
export type PreModuleHook = (vNode: VirtualNode<Node>) => any;
// before returning the just patched vNode
export type PostModuleHook = (vNode: ElementVNode) => any;

// Available to both VNode and Modules
// called just before created an element from a VirtualNode
export type InitHook = (vNode: VirtualNode<Node>) => any;
// called when a VirtualNode becomes an ElementVNode
export type CreateHook<T extends Element> = (vNode: ElementVirtualNode<T>) => any;
// called when a ElementVNode element is being updated
export type UpdateHook<T extends Element> =
  (formerVNode: ElementVirtualNode<T>, vNode: ElementVirtualNode<T>) => any;
// called when an ElementVNode is being removed from the DOM
export type RemoveHook<T extends Element> =
  (vNode: ElementVirtualNode<T>, removeElement: Function) => any;
// called when an ElementVNode's parent is being removed from the DOM
export type DestroyHook<T extends Element> = (vNode: ElementVirtualNode<T>) => any;
// called just before an ElementVNode is about to be patched
export type PrepatchHook<T extends Node> =
  (formerVNode: VirtualNode<T>, vNode: VirtualNode<T>) => any;
// called just after an ElementVNode has been patched
export type PostpatchHook<T extends Element> =
  (formerVNode: VirtualNode<T>, vNode: VirtualNode<T>) => any;

// Available for only VNode hooks
// called when an ElementVNode has been inserted into the DOM
export type InsertHook<T extends Element> = (vNode: ElementVirtualNode<T>) => any;

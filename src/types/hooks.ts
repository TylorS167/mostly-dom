import { VirtualNode, ElementVNode } from './VirtualNode';

export interface Module {
  pre: PreModuleHook;
  post: PostModuleHook;

  init: InitHook;
  create: CreateHook;
  update: UpdateHook;
  remove: RemoveHook;
  destroy: DestroyHook;
  prepatch: PrepatchHook;
  postpatch: PostpatchHook;
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
export type CreateHook = (vNode: ElementVNode) => any;
// called when a ElementVNode element is being updated
export type UpdateHook = (formerVNode: ElementVNode, vNode: ElementVNode) => any;
// called when an ElementVNode is being removed from the DOM
export type RemoveHook = (vNode: ElementVNode, removeElement: Function) => any;
// called when an ElementVNode's parent is being removed from the DOM
export type DestroyHook = (vNode: ElementVNode) => any;
// called just before an ElementVNode is about to be patched
export type PrepatchHook = (formerVNode: VirtualNode<Node>, vNode: VirtualNode<Node>) => any;
// called just after an ElementVNode has been patched
export type PostpatchHook = (formerVNode: VirtualNode<Node>, vNode: VirtualNode<Node>) => any;

// Available for only VNode hooks
// called when an ElementVNode has been inserted into the DOM
export type InsertHook = (vNode: ElementVNode) => any;

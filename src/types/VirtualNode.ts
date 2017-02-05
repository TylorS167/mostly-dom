import { CSSProperties } from './CSS';
import { HtmlProperties } from './HtmlProperties';
import * as hooks from './hooks';

export interface VNode extends VirtualNode<Node> {};
export interface ElementVNode extends ElementVirtualNode<Element> {};

export interface VirtualNode<T extends Node> {
  tagName: string | void;
  id: string | void;
  className: string | void;
  props: VNodeProps;
  children: Array<VirtualNode<Node>> | void;
  text: string | void;
  key: string | number | void;
  element: T | void;
  namespace: string | void;
  scope: string | void;

  parent: VirtualNode<Node> | void;
}

export interface ElementVirtualNode<T extends Element> extends VirtualNode<Element> {
  tagName: string;
  element: T;
  namespace: string;
  text: void;
  children: Array<ElementVirtualNode<Element>> | void;
}

export interface TextVNode extends VirtualNode<Text> {
  tagName: void;
  id: void;
  className: void;
  children: void;
  text: string;
  key: void;
  element: Text;
  namespace: void;
  scope: void;
}

export interface VNodeProps extends HtmlProperties {
  // key for dom diffing
  key?: string | number;

  // classes
  class?: { [className: string]: Boolean };

  // attributes for setAttribute()
  attrs?: { [attributeName: string]: any };

  // styling
  style?: VNodeStyle;

  // hooks
  init?: hooks.InitHook;
  create?: hooks.CreateHook;
  update?: hooks.UpdateHook;
  insert?: hooks.InsertHook;
  remove?: hooks.RemoveHook;
  destroy?: hooks.DestroyHook;
  prepatch?: hooks.PrepatchHook;
  postpatch?: hooks.PostpatchHook;

  // TODO: maybe find a better name
  // this is a namespace for custom modules
  module?: any;
}

export interface VNodeStyle extends CSSProperties {
  delayed?: CSSProperties;
  remove?: CSSProperties;
}

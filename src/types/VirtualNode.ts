import * as hooks from './hooks';

import { CSSProperties } from './CSS';
import { ElementProperties } from './HtmlProperties';

export interface VNode extends VirtualNode<Node> {}
export interface ElementVNode extends ElementVirtualNode<Element> {}

export interface VirtualNode<T extends Node, Props = VNodeProps<Element>> {
  tagName: string | void;
  id: string | void;
  className: string | void;
  props: Props;
  children: Array<VirtualNode<Node>> | ReadonlyArray<VirtualNode<Node>> | void;
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
  children: Array<ElementVirtualNode<Element>> | ReadonlyArray<ElementVirtualNode<Element>> | void;
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

export interface VNodeProps<T extends Element> extends ElementProperties {
  // key for dom diffing
  key?: string | number;

  // classes
  class?: { [className: string]: Boolean };

  // attributes for setAttribute()
  attrs?: { [attributeName: string]: any };

  // styling
  style?: VNodeStyle;

  // declarative focusing
  focus?: boolean;

  scope?: string;

  // hooks
  init?: hooks.InitHook;
  create?: hooks.CreateHook<T>;
  update?: hooks.UpdateHook<T>;
  insert?: hooks.InsertHook<T>;
  remove?: hooks.RemoveHook<T>;
  destroy?: hooks.DestroyHook<T>;
  prepatch?: hooks.PrepatchHook<T>;
  postpatch?: hooks.PostpatchHook<T>;

  // TODO: maybe find a better name
  // this is a namespace for custom modules
  module?: any;
}

export interface VNodeStyle extends CSSProperties {
  delayed?: CSSProperties;
  remove?: CSSProperties;
}

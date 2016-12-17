import { CSSProperties } from './CSS';
import { HtmlProperties } from './HtmlProperties';

export interface VirtualNode<T extends Node> {
  tagName: string | void;
  id: string | void;
  className: string | void;
  props: VNodeProps;
  children: Array<VirtualNode<any>> | void;
  text: string | void;
  key: string | number | void;
  element: T | void;
  namespace: string | void;
  scope: string | void;

  parent: VirtualNode<any> | void;
}

export interface ElementNode<T extends Element> extends VirtualNode<Element> {
  tagName: string;
  element: T;
  namespace: string;
  text: void;
}

export interface TextNode extends VirtualNode<Text> {
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
  key?: string | number;
  attrs?: { [attributeName: string]: any };
  style?: VNodeStyle;
}

export interface VNodeStyle extends CSSProperties {
  delayed?: CSSProperties;
  remove?: CSSProperties;
}

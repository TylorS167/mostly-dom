import { Module, ElementVNode, VNode } from '../types';

export class BaseModule implements Module {
  public pre(_: VNode) {}

  public post(_: VNode) {}

  public init(_: VNode) {}

  public create(_: ElementVNode) {}

  public update(_: ElementVNode, __: ElementVNode) {}

  public remove(_: ElementVNode, removeElement: Function) {
    removeElement();
  }

  public destroy(_: ElementVNode) {}

  public prepatch(_: VNode, __: VNode) {}

  public postpatch(_: VNode, __: VNode) {}
}

import { ElementVNode, Module, VNode } from '../types'

export class BaseModule<T extends Element> implements Module<T> {
  public pre(_: VNode) {}

  public post(_: VNode) {}

  public init(_: VNode) {}

  public create(_: ElementVNode) {}

  public update(_: ElementVNode, __: ElementVNode) {}

  public remove(_: ElementVNode, removeElement: Function) {
    removeElement()
  }

  public destroy(_: ElementVNode) {}

  public prepatch(_: VNode, __: VNode) {}

  public postpatch(_: VNode, __: VNode) {}
}

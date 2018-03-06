import { ElementVNode, Module } from '../'

import { BaseModule } from './BaseModule'

export function createFocusModule(): Module {
  return new FocusModule()
}

class FocusModule extends BaseModule {
  public insert(vNode: ElementVNode) {
    setFocus(vNode)
  }

  public update(_: ElementVNode, vNode: ElementVNode) {
    setFocus(vNode)
  }
}

function setFocus(vNode: ElementVNode) {
  const { props: { focus = false }, element } = vNode

  if (focus && typeof (element as HTMLElement).focus === 'function')
    (element as HTMLElement).focus()
}

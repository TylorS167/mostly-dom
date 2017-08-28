import { ElementVNode, EventHandler, Module, VNode } from '../'

import { BaseModule } from './BaseModule'
import { emptyVNode } from './emptyVNode'

export function createClassModule(): Module {
  return new ClassModule()
}

class ClassModule extends BaseModule {
  public create(vNode: ElementVNode) {
    updateClass(emptyVNode, vNode)
  }

  public update(formerVNode: ElementVNode, vNode: ElementVNode) {
    updateClass(formerVNode, vNode)
  }
}

function updateClass(formerVNode: ElementVNode, vNode: ElementVNode): void {
  const { props: { class: formerClass = {} }, element: formerElement } = formerVNode
  const { props: { class: klass = {} }, element } = vNode

  if (formerClass === klass) return

  for (const name in formerClass)
    if (!klass[name])
      formerElement.classList.remove(name)

  for (const name in klass)
    if (klass[name] !== formerClass[name])
      element.classList.toggle(name)
}

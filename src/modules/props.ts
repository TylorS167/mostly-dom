import { ElementVNode, Module } from '../'

import { BaseModule } from './BaseModule'
import { emptyVNode } from './emptyVNode'

export function createPropsModule(): Module {
  return new PropsModule()
}

const PROPERTIES_TO_SKIP: Record<string, boolean> = {
  class: true,
  on: true,
  listener: true,
  focus: true,
  style: true,
  attrs: true,
  key: true,
  module: true,
  init: true,
  create: true,
  update: true,
  insert: true,
  remove: true,
  destroy: true,
  prepatch: true,
  postpatch: true,
}

const ATTRIBUTE_TO_REMOVE: any = {
  id: true,
}

class PropsModule extends BaseModule<Element> {
  public create(vNode: ElementVNode) {
    updateProps(emptyVNode as ElementVNode, vNode)
  }

  public update(formerVNode: ElementVNode, vNode: ElementVNode) {
    updateProps(formerVNode, vNode)
  }
}

function updateProps(formerVNode: ElementVNode, vNode: ElementVNode): void {
  const element: any = vNode.element
  let formerProps: any = formerVNode.props
  let props: any = vNode.props

  if (!formerProps && !props) return

  formerProps = formerProps || {}
  props = props || {}

  for (const key in formerProps)
    if (!PROPERTIES_TO_SKIP[key] && !props[key]) {
      if (key === 'className')
        removePreviousClassName(formerProps[key], element)

      if (ATTRIBUTE_TO_REMOVE[key])
        element.removeAttribute(key)

      delete element[key]
    }

  for (const key in props) if (!PROPERTIES_TO_SKIP[key]) element[key] = props[key]
}

function removePreviousClassName(className: string, element: Element) {
  if (className && element.classList) {
    element.classList.remove(...className.split(' '))

    const classAttr = element.getAttribute('class')

    if (classAttr === '')
      element.removeAttribute('class')
  }
}

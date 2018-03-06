import { ElementVNode, Module } from '../'

import { BaseModule } from './BaseModule'
import { emptyVNode } from './emptyVNode'

export function createPropsModule(): Module {
  return new PropsModule()
}

export const PROPERTIES_TO_SKIP: Record<string, boolean> = {
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

export const ATTRIBUTE_TO_REMOVE: Record<string, boolean> = {
  id: true,
}

class PropsModule extends BaseModule {
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

  for (const key in formerProps) {
    const propertyIsMissing = !PROPERTIES_TO_SKIP[key] && !props[key]
    const keyIsClassName = propertyIsMissing && key === 'className'
    const shouldRemoveAttribute = propertyIsMissing && ATTRIBUTE_TO_REMOVE[key]

    if (propertyIsMissing) delete element[key]

    if (keyIsClassName) removePreviousClassName(formerProps[key], element)

    if (shouldRemoveAttribute) element.removeAttribute(key)
  }

  for (const key in props) if (!PROPERTIES_TO_SKIP[key]) element[key] = props[key]
}

function removePreviousClassName(className: string, element: Element) {
  const shouldRemoveClassName = className && element.classList
  const shouldRemoveClassAttribute = shouldRemoveClassName && element.getAttribute('class') === ''

  if (shouldRemoveClassName) element.classList.remove(...className.split(' '))

  if (shouldRemoveClassAttribute) element.removeAttribute('class')
}

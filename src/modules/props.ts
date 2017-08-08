import { ElementVNode, Module } from '../'

import { BaseModule } from './BaseModule'
import { emptyVNode } from './emptyVNode'

export function createPropsModule(): Module {
  return new PropsModule()
}

const PROPERTIES_TO_SKIP: Array<string> =
  [
    'class',
    'on',
    'listener',
    'focus',
    'style',
    'attrs',
    'key',
    'module',
    'init',
    'create',
    'update',
    'insert',
    'remove',
    'destroy',
    'prepatch',
    'postpatch',
  ]

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
    if (PROPERTIES_TO_SKIP.indexOf(key) === -1 && !props[key])
      delete element[key]

  for (const key in props)
    if (PROPERTIES_TO_SKIP.indexOf(key) === -1)
      element[key] = props[key]
}

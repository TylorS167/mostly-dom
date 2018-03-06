import { ElementVNode, Module } from '../'

import { BaseModule } from './BaseModule'
import { emptyVNode } from './emptyVNode'

export function createAttributesModule(): Module {
  return new AttributesModule()
}

const NAMESPACE_URIS = {
  xlink: 'http://www.w3.org/1999/xlink',
}

const booleanAttributes: Array<string> = [
  'allowfullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'compact',
  'controls', 'declare', 'default', 'defaultchecked', 'defaultmuted',
  'defaultselected', 'defer', 'disabled', 'draggable', 'enabled',
  'formnovalidate', 'hidden', 'indeterminate', 'inert', 'ismap', 'itemscope',
  'loop', 'multiple', 'muted', 'nohref', 'noresize', 'noshade', 'novalidate',
  'nowrap', 'open', 'pauseonexit', 'readonly', 'required', 'reversed', 'scoped',
  'seamless', 'selected', 'sortable', 'spellcheck', 'translate', 'truespeed',
  'typemustmatch', 'visible',
]

const booleanAttributeDictionary: any = Object.create(null)

for (let i = 0, count = booleanAttributes.length; i < count; i++)
  booleanAttributeDictionary[booleanAttributes[i]] = true

// attributes module
class AttributesModule extends BaseModule {
  public create(vNode: ElementVNode) {
    updateAttributes(emptyVNode, vNode)
  }

  public update(formerVNode: ElementVNode, vNode: ElementVNode) {
    updateAttributes(formerVNode, vNode)
  }
}

function updateAttributes(formerVNode: ElementVNode, vNode: ElementVNode) {
  let attributeValue: any
  let formerAttributeValue: any
  const element: Element = vNode.element
  let formerAttributes: any = formerVNode.props.attrs
  let attributes: any = vNode.props.attrs
  let attributeParts: Array<string>

  if (!formerAttributes && !attributes) return

  formerAttributes = formerAttributes || {}
  attributes = attributes || {}

  for (const key in attributes) {
    attributeValue = attributes[key]
    formerAttributeValue = formerAttributes[key]

    if (formerAttributeValue !== attributeValue) {
      if (!attributeValue && booleanAttributeDictionary[key])
        element.removeAttribute(key)

      else {
        attributeParts = key.split(':')

        if (attributeParts.length > 1 && NAMESPACE_URIS.hasOwnProperty(attributeParts[0]))
          element.setAttributeNS((NAMESPACE_URIS as any)[attributeParts[0]], key, attributeValue)

        else
          element.setAttribute(key, attributeValue)
      }
    }
  }

  for (const key in formerAttributes)
    if (!(key in attributes))
      element.removeAttribute(key)
}

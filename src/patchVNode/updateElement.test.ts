import * as assert from 'assert'

import { ElementVNode, SCOPE_ATTRIBUTE, h } from '../'

import { updateElement } from './updateElement'

describe('updateElement', () => {
  it('updates a change to scope', () => {
    const element = document.createElement('div')
    element.setAttribute(SCOPE_ATTRIBUTE, 'hi')

    const formerVNode = h('div', { scope: 'hi' }, []) as ElementVNode

    formerVNode.element = element

    const vNode = h('div', { scope: 'hello' }, [])

    const elementVNode = updateElement(formerVNode, vNode)

    assert.strictEqual(elementVNode.element.getAttribute(SCOPE_ATTRIBUTE), 'hello')
  })

  it(`removes a previous className`, () => {
    const className = 'foo'

    const formerVNode = h('div', { className }, []) as ElementVNode
    formerVNode.element = document.createElement('div')
    formerVNode.element.className = className

    const vNode = h('div', {}, [])

    const { element } = updateElement(formerVNode, vNode)

    assert.strictEqual(element.className, '')
  })

  it(`removes a previous id`, () => {
    const id = 'foo'

    const formerVNode = h('div', { id }, []) as ElementVNode
    formerVNode.element = document.createElement('div')
    formerVNode.element.id = id

    const vNode = h('div', {}, [])

    const { element } = updateElement(formerVNode, vNode)

    assert.strictEqual(element.id, '')
  })

  it(`removes previous scope`, () => {
    const scope = 'hi'

    const formerVNode = h('div', { scope }, []) as ElementVNode
    formerVNode.element = document.createElement('div')
    formerVNode.element.setAttribute(SCOPE_ATTRIBUTE, scope)

    const vNode = h('div', {}, [])

    const { element } = updateElement(formerVNode, vNode)

    assert.ok(!element.hasAttribute(SCOPE_ATTRIBUTE))
  })
})

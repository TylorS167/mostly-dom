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

  it(`removes previous scope`, () => {
    const scope = 'hi'

    const formerVNode = h('div', { scope }, []) as ElementVNode
    formerVNode.element = document.createElement('div')
    formerVNode.element.setAttribute(SCOPE_ATTRIBUTE, scope)

    const vNode = h('div', {}, [])

    const { element } = updateElement(formerVNode, vNode)

    assert.ok(!element.hasAttribute(SCOPE_ATTRIBUTE))
  })

  it(`does not throw when updateing SVG element`, () => {
    const className = 'test'
    const formerVNode = h('svg', {}, []) as ElementVNode
    formerVNode.element = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    assert.doesNotThrow(() => {
      updateElement(formerVNode, h('svg', {}, []))
    })
  })
})

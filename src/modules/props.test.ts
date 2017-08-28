import * as assert from 'assert'

import { ElementVNode, div } from '../'

import { createPropsModule } from './props'

describe(`Props Module`, () => {
  it(`removes previous id`, () => {
    const props = createPropsModule()

    const id = 'foo'
    const formerVNode = div({ id }, []) as ElementVNode
    formerVNode.element = document.createElement('div')
    formerVNode.element.id = id

    const vNode = div({}, []) as ElementVNode
    vNode.element = formerVNode.element

    props.update(formerVNode, vNode)

    assert.strictEqual(vNode.element.id, '')
  })

  it(`removes previous className`, () => {
    const props = createPropsModule()

    const className = 'foo'
    const formerVNode = div({ className }, []) as ElementVNode
    formerVNode.element = document.createElement('div')
    formerVNode.element.className = className

    const vNode = div({}, []) as ElementVNode
    vNode.element = formerVNode.element

    props.update(formerVNode, vNode)

    assert.strictEqual(vNode.element.className, '')
  })
})

import * as assert from 'assert'

import { ElementVNode, div, embed, VNodeProps, VNodeEvent, HtmlElementEvents } from '../'

import { createEventsModule } from './events'

describe(`Events Module`, () => {
  it('calls bubbling event handler', (done) => {
    const vNode = createElementVNode({ on: { click: () => done() } })
    const events = createEventsModule()

    events.create(vNode)

    vNode.element.dispatchEvent(new Event('click', { bubbles: true }))
  })

  it('calls non-bubbling event handler', (done) => {
    const vNode = createElementVNode({ onCapture: { click: () => done() } })
    const events = createEventsModule()

    events.create(vNode)

    vNode.element.dispatchEvent(new Event('click', { bubbles: false }))
  })

  it('does not call bubbling event handler for event that does not bubble', (done) => {
    const vNode = createElementVNode({
      onCapture: { click: () => done() },
      on: { click: () => done(new Error('Should not be called')) }
    })
    const events = createEventsModule()
    events.create(vNode)

    vNode.element.dispatchEvent(new Event('click', { bubbles: false }))
  })

  it('calls both event handlers', (done) => {
    let i = 2
    const doneAsync = () => (i--, i === 0 && done())

    const vNode = createElementVNode({
      onCapture: { click: doneAsync },
      on: { click: doneAsync }
    })
    const events = createEventsModule()
    events.create(vNode)

    vNode.element.dispatchEvent(new Event('click', { bubbles: true }))
  })
})

function createElementVNode(props: VNodeProps<HTMLDivElement, HtmlElementEvents<HTMLDivElement>>) {
  const vNode = div(props)
  vNode.element = document.createElement('div')

  return vNode as ElementVNode
}

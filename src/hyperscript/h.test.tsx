import * as assert from 'assert'

import { h, HyperscriptChildren } from './h'

describe('h jsx support', () => {
  it('accepts a function', () => {
    function MyComponent() {
      return <div />
    }

    const vNode = <MyComponent />
    assert.strictEqual(vNode.tagName, 'div')
  })

  it('supports destructuration', () => {
    function MyComponent({ className }: { className: string }) {
      return <div className={className} />
    }

    const vNode = <MyComponent className="foo" />
    assert.strictEqual(vNode.tagName, 'div')
  })

  it('supports children', () => {
    function MyComponent(_: any, children: HyperscriptChildren) {
      return <div>{children}</div>
    }

    const vNode = (
      <MyComponent>
        <div />
        <span />
      </MyComponent>
    )

    if (!vNode.children) throw new Error(`VNode should have children`)

    assert.strictEqual(vNode.tagName, 'div')
    assert.strictEqual(vNode.children[0].tagName, 'div')
    assert.strictEqual(vNode.children[1].tagName, 'span')
  })
})

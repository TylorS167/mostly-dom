import * as assert from 'assert'

import { hJsx as h } from './h-jsx'
import { HyperscriptChildren } from '../index'

describe('h jsx support', () => {
  it('accepts a function', () => {
    const myComponent = () => <div />

    const vNode = <myComponent />
    assert.strictEqual(vNode.tagName, 'div')
  })

  it('supports destructuration', () => {
    const myComponent = ({ className }: { className: string }) => (
      <div className={className} />
    )

    const vNode = <myComponent className='foo' />
    assert.strictEqual(vNode.tagName, 'div')
  })

  it('supports children', () => {
    const myComponent = (_: any, children: HyperscriptChildren) => (
      <div>{children}</div>
    )

    const vNode = (
      <myComponent>
        <div />
        <span />
      </myComponent>
    )

    if (!vNode.children) throw new Error(`VNode should have children`)

    assert.strictEqual(vNode.tagName, 'div')
    assert.strictEqual(vNode.children[0].tagName, 'div')
    assert.strictEqual(vNode.children[1].tagName, 'span')
  })
})

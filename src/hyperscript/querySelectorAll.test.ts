import * as assert from 'assert'

import { h } from './h'
import { querySelectorAll } from './querySelectorAll'

describe('querySelectorAll', () => {
  describe('given a cssSelector and a vNode with children', () => {
    it('returns all vNodes that match given cssSelector', () => {
      const vNode = h('div', {}, [
        h('a', { className: 'hi' }),
        h('b', { className: 'hi' }),
        h('br', { className: 'hi' }),
      ])

      const matches = querySelectorAll('.hi', vNode)

      assert.strictEqual(matches.length, 3)
      const [ a, b, br ] = matches

      assert.strictEqual(a.tagName, 'a')
      assert.strictEqual(a.props.className, 'hi')
      assert.strictEqual(b.tagName, 'b')
      assert.strictEqual(b.props.className, 'hi')
      assert.strictEqual(br.tagName, 'br')
      assert.strictEqual(br.props.className, 'hi')
    })

    it('returns only vNodes with a given scope', () => {
      const vNode = h('div', { scope: 'hi' }, [
        h('a', { className: 'hi' }),
        h('b', { className: 'hi', scope: 'hello' }),
        h('br', { className: 'hi', scope: 'bye' }),
      ])

      const matches = querySelectorAll('.hi', vNode)

      assert.strictEqual(matches.length, 1)

      const [ a ] = matches

      assert.strictEqual(a.tagName, 'a')
      assert.strictEqual(a.props.className, 'hi')
    })
  })
})

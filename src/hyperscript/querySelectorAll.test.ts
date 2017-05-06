import * as assert from 'assert'
import { h } from './h'
import { querySelectorAll } from './querySelectorAll'

describe('querySelectorAll', () => {
  describe('given a cssSelector and a vNode with children', () => {
    it('returns all vNodes that match given cssSelector', () => {
      const vNode = h('div', {}, [
        h('a.hi'),
        h('b.hi'),
        h('br.hi'),
      ])

      const matches = querySelectorAll('.hi', vNode)

      assert.strictEqual(matches.length, 3)
      const [ a, b, br ] = matches

      assert.strictEqual(a.tagName, 'a')
      assert.strictEqual(a.className, 'hi')
      assert.strictEqual(b.tagName, 'b')
      assert.strictEqual(b.className, 'hi')
      assert.strictEqual(br.tagName, 'br')
      assert.strictEqual(br.className, 'hi')
    })

    it('returns only vNodes with a given scope', () => {
      const vNode = h('div', { scope: 'hi' }, [
        h('a.hi'),
        h('b.hi', { scope: 'hello' }),
        h('br.hi', { scope: 'bye' }),
      ])

      const matches = querySelectorAll('.hi', vNode)

      assert.strictEqual(matches.length, 1)

      const [ a ] = matches

      assert.strictEqual(a.tagName, 'a')
      assert.strictEqual(a.className, 'hi')
    })
  })
})

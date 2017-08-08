// tslint:disable:max-file-line-count
import * as assert from 'assert'

import { div, p } from '../hyperscript-helpers'

import { hasCssSelector } from './hasCssSelector'

describe('hasCssSelector', () => {
  // wildcard
  describe('given * as selector and a VNode', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('*', div({ className: 'foo' })))
    })
  })

  // tagName, className, and id matching
  describe('given a class selector .foo and VNode with class foo', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('.foo', div({ className: 'foo' })))
    })
  })

  describe('given a class selector .bar and VNode with class foo', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('.bar', div({ className: 'foo' })))
    })
  })

  describe('given a class selector xbar and VNode with class bar', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('xbar', div({ className: 'bar' })))
    })
  })

  describe('given a class selector .foo.bar and VNode with classes foo and bar', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('.foo.bar', div({ className: 'foo bar' })))
    })
  })

  describe('given a class selector .foo.bar and VNode with classes bar and foo', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('.foo.bar', div({ className: 'bar foo' })))
    })
  })

  describe('given a class selector .foo.bar.baz and VNode with classes bar foo and baz', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('.foo.bar.baz', div({ className: 'baz bar foo' })))
    })
  })

  describe('given a class selector .foo and VNode with no classes', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('.foo', div()))
    })
  })

  describe('given an id selector #foo and VNode with id foo', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('#foo', div({ id: 'foo' })))
    })
  })

  describe('given an id selector #bar and VNode with id foo', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('#bar', div({ id: 'foo' })))
    })
  })

  describe('given an id selector #foo#bar and VNode with id foo', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('#foo#bar', div({ id: 'foo' })))
    })
  })

  describe('given a cssSelector .foo#bar and VNode with class foo and id bar', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('.foo#bar', div({ className: 'foo', id: 'bar' })))
    })
  })

  describe('given a cssSelector .foo#bar and VNode with class foo', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('.foo#bar', div({ className: 'foo' })))
    })
  })

  describe('given a cssSelector #bar.foo and VNode with class foo', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('#bar.foo', div({ className: 'foo' })))
    })
  })

  // describe('given a cssSelector .foo .bar and VNode with classes foo and bar', () => {
  //   it('throws error', () => {
  //     assert.throws(() => {
  //       hasCssSelector('.foo .bar', div({ className: 'foo bar' }));
  //     }, /CSS selectors can not contain spaces/);
  //   });
  // });

  describe('given a cssSelector .foo#bar.baz and VNode with classes foo and baz and id bar', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('.foo#bar.baz', div({ className: 'foo baz', id: 'bar' })))
    })
  })

  describe('given cssSelector .foo#bar.baz and VNode with class foo and id bar', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('.foo#bar.baz', div({ id: 'bar', className: 'foo' })))
    })
  })

  describe('given cssSelector .foo#bar.baz and VNode with class baz and id bar', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('.foo#bar.baz', div({ className: 'baz', id: 'bar' })))
    })
  })

  describe('given a cssSelector div and VNode with tagName div', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('div', div()))
    })
  })

  describe('given a cssSelector div.foo and VNode with tagName div and class foo', () => {
    it('returns true', () => {
      assert.ok(hasCssSelector('div.foo', div({ className: 'foo' })))
    })
  })

  describe('given a cssSelector h2.foo and VNode with tagName div and class foo', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('h2.foo', div({ className: 'foo' })))
    })
  })

  describe('given a cssSelector div.foo and VNode with tagName div', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('div.foo', div()))
    })
  })

  describe('given a cssSelector div.foo and VNode with tagName div and id foo', () => {
    it('returns false', () => {
      assert.ok(!hasCssSelector('div.foo', div({ id: 'foo' })))
    })
  })

  describe(
    'given a cssSelector div#foo.bar and VNode with' +
    ' tagName div and id foo and class bar', function()
  {
    it('returns true', () => {
      assert.ok(hasCssSelector('div#foo.bar', div({ id: 'foo', className: 'bar' })))
    })
  },
  )

  // attribute matching
  describe('given a cssSelector [data-foo]', () => {
    it('returns true given a vNode with data-foo attribute', () => {
      assert.ok(hasCssSelector('[data-foo]', div({ attrs: { 'data-foo': 'foo' } })))
    })

    it('returns false given a vNode with no attributes', () => {
      assert.ok(!hasCssSelector('[data-foo]', div({})))
    })
  })

  describe(`given a cssSelector [data-foo=foo]`, () => {
    it('returns true given a vNode with data-foo attribute of foo', () => {
      assert.ok(hasCssSelector('[data-foo=foo]', div({ attrs: { 'data-foo': 'foo' } })))
    })

    it('returns false given a vNode with no attributes', () => {
      assert.ok(!hasCssSelector('[data-foo=foo]', div({})))
    })
  })

  describe(`given a cssSelector [data-foo~=foo]`, () => {
    describe('returns true when', () => {
      it('is given vNode with attribute data-foo value of foobar', () => {
        assert.ok(hasCssSelector('[data-foo~=foo]', div({ attrs: { 'data-foo': 'foobar' } })))
      })
    })

    describe('returns false when', () => {
      it('is given a vNode with attribute data-foo value of bar', () => {
        assert.ok(!hasCssSelector('[data-foo~=foo]', div({ attrs: { 'data-foo': 'bar' } })))
      })
    })
  })

  describe(`given a cssSelector [data-foo|=foo]`, () => {
    describe(`returns true when`, () => {
      it(`is given a vNode with attribute data-foo with value of foo`, () => {
        assert.ok(hasCssSelector('[data-foo|=foo]', div({ attrs: { 'data-foo': 'foo' } })))
      })

      it(`is given a vNode with attribute data-foo with value of foobar`, () => {
        assert.ok(hasCssSelector('[data-foo|=foo]', div({ attrs: { 'data-foo': 'foobar' } })))
      })
    })

    describe(`returns false when`, () => {
      it(`is given a vNode with attribute data-foo with value of barfoo`, () => {
        assert.ok(!hasCssSelector('[data-foo|=foo]', div({ attrs: { 'data-foo': 'barfoo' } })))
      })
    })
  })

  describe(`given a cssSelector of [data-foo$=foo]`, () => {
    describe(`returns true when`, () => {
      it(`is given a vNode with attribute data-foo with value of foo`, () => {
        assert.ok(hasCssSelector('[data-foo$=foo]', div({ attrs: { 'data-foo': 'foo' } })))
      })

      it(`is given a vNode with attribute data-foo with value of barfoo`, () => {
        assert.ok(hasCssSelector('[data-foo$=foo]', div({ attrs: { 'data-foo': 'barfoo' } })))
      })
    })

    describe(`returns false when`, () => {
      it(`is given a vNode with attribute data-foo with value of foobar`, () => {
        assert.ok(
          !hasCssSelector('[data-foo$=foo]', div({ attrs: { 'data-foo': 'foobar' } }, [])),
        )
      })
    })
  })

  // psuedo-selector matching
  describe('psuedo-selectors', () => {
    describe(':first-child', () => {
      it('returns true when a vNode is the first child of its parent vNode', () => {
        const child = div({ className: 'hi' })
        div({ className: 'parent' }, [ child, div({}, []) ])

        assert.ok(hasCssSelector(':first-child', child))
      })

      it('returns false when a vNode is not its parents first child', () => {
        const child = div({ className: 'hi' })
        div({ className: 'parent' }, [ div({}, []), child ])

        assert.ok(!hasCssSelector(':first-child', child))
      })
    })

    describe(':last-child', () => {
      it('returns true when a vNode is the last child of its parent vNode', () => {
        const child = div({ className: 'hi' })
        div({ className: 'parent' }, [ div({}, []), child ])

        assert.ok(hasCssSelector(':last-child', child))
      })

      it('returns false when a vNode is not its parents last child', () => {
        const child = div({ className: 'hi' })
        div({ className: 'parent' }, [ child, div({}, []) ])

        assert.ok(!hasCssSelector(':last-child', child))
      })
    })

    describe('nth:child', () => {
      describe('given :nth-child(1)', () => {
        it('returns true when a vNode is the at index `n`', () => {
          const child = div({ className: 'hi' })
          div({ className: 'parent' }, [ div({}, []), child ])

          assert.ok(hasCssSelector(':nth-child(1)', child))
        })

        it('returns false when a vNode is not is not at index `n`', () => {
          const child = div({ className: 'hi' })
          div({ className: 'parent' }, [ child, div({}, []) ])

          assert.ok(!hasCssSelector(':nth-child(1)', child))
        })
      })

      describe('given :nth-child(odd)', () => {
        it('returns true when a vNode is the at odd index', () => {
          const child = div({ className: 'hi' })
          div({ className: 'parent' }, [ div({}, []), child ])

          assert.ok(hasCssSelector(':nth-child(odd)', child))
        })

        it('returns false when a vNode is not is not at odd index', () => {
          const child = div({ className: 'hi' })
          div({ className: 'parent' }, [ child, div({}, []) ])

          assert.ok(!hasCssSelector(':nth-child(odd)', child))
        })
      })

      describe('given :nth-child(even)', () => {
        it('returns true when a vNode is the at even index', () => {
          const child = div({ className: 'hi' })
          div({ className: 'parent' }, [ child, div({}, []) ])

          assert.ok(hasCssSelector(':nth-child(even)', child))
        })

        it('returns false when a vNode is not is not at odd index', () => {
          const child = div({ className: 'hi' })
          div({ className: 'parent' }, [ div({}, []), child ])

          assert.ok(!hasCssSelector(':nth-child(even)', child))
        })
      })

      describe('given :nth-child(3n+0)', () => {
        it('returns true when a vNode is at a children index multiples of 3', () => {
          const child = div({ className: 'hi' })
          div({ className: 'parent' }, [
            div({}),
            div({}),
            div({}),
            child,
            div({}),
          ])

          assert.ok(hasCssSelector(':nth-child(3n+0)', child))
        })

        it('returns false when a vNode is not at a children index multiples of 3', () => {
          const child = div({ className: 'hi' })
          div({ className: 'parent' }, [
            div({}),
            child,
            div({}),
            div({}),
          ])

          assert.ok(!hasCssSelector(':nth-child(3n+0)', child))
        })
      })
    })

    describe(':empty', () => {
      it('returns true when no children are defined', () => {
        assert.ok(hasCssSelector(':empty', div()))
      })

      it('returns true when children array is empty', () => {
        assert.ok(hasCssSelector(':empty', div([])))
      })

      it('return false when given children', () => {
        assert.ok(!hasCssSelector(':empty', div([ div() ])))
      })
    })

    describe(':root', () => {
      it('returns true when root of vNode graph', () => {
        assert.ok(hasCssSelector(':root', div()))
      })

      it('returns false when not root of vNode graph', () => {
        const child = div()
        div([ child ])

        assert.ok(!hasCssSelector(':root', child))
      })
    })

    describe(':contains(text)', () => {
      it('returns true when a vNode has text property', () => {
        assert.ok(hasCssSelector(':contains(hi)', div('hi')))
      })

      it('returns true when vNode contains textVNode', () => {
        assert.ok(hasCssSelector(':contains(hi)', div([ 'hi' ])))
      })

      it('returns false when vNode does not contain text', () => {
        assert.ok(!hasCssSelector(':contains(hi)', div()))
      })
    })
  })

  describe('given cssSelectors separated by commas', () => {
    it('matches vNode that satisfies left selector', () => {
      const vNode = div()

      assert.ok(hasCssSelector('div, p', vNode))
    })

    it('matches vNode that satisfies right selector', () => {
      const vNode = div()

      assert.ok(hasCssSelector('p, div', vNode))
    })

    it('returns false if vNode does not satisfy selector', () => {
      const vNode = div()

      assert.ok(!hasCssSelector('p, a', vNode))
    })
  })

  describe('cssSelectors separated by whitespace', () => {
    describe('given cssSelector `div .foo`', () => {
      it('returns true given a vNode with className .foo' +
         ' that is descendant of a div', () =>
      {
        const child = div({ className: 'foo' })
        div([ child ])

        assert.ok(hasCssSelector('div .foo', child))
      })

      it('returns false given a vNode of className .bar', () => {
        const vNode = div({ className: 'bar' })
        assert.ok(!hasCssSelector('div .foo', vNode))
      })
    })

    describe('given cssSelector `div .foo .bar`', () => {
      it('returns true given a vNode with tagName `div` with a child with ' +
        'className .foo containing a child with className .bar', () =>
      {
        const child = div({ className: 'bar' })
        div([ div({ className: 'foo' }, [ child ]) ])

        assert.ok(hasCssSelector('div .foo .bar', child))
      })
    })

    describe('given cssSelector `a .foo .bar`', () => {
      it('returns false given a vNode with tagName `div` with a child with ' +
        'className .foo containing a child with className .bar', () =>
      {
        const child = div({ className: 'bar' })
        div([ div({ className: 'foo' }, [ child ]) ])

        assert.ok(!hasCssSelector('a .foo .bar', child))
      })
    })

    describe('given cssSelector `div > .foo`', () => {
      it('returns true given a vNode with tagName `div` with a child with ' +
        'className .foo', () =>
      {
        const child = div({ className: 'foo' })
        div([ child ])
        assert.ok(hasCssSelector('div > .foo', child))
      })

      it('returns false given a vNode with tagName `div` with a child with ' +
        'className .bar', () =>
      {
        const child = div({ className: 'bar' })
        div([ child ])

        assert.ok(!hasCssSelector('div > .foo', child))
      })
    })

    describe('given cssSelector `.foo + .bar`', () => {
      it('returns true when given a vNode with className bar preceded ' +
         'by vNode with className foo', () =>
      {
        const vNode = div({ className: 'bar' })
        div([ div({ className: 'foo' }), vNode ])

        assert.ok(hasCssSelector('.foo + .bar', vNode))
      })

      it('returns false when given a vNode with className bar preceded ' +
         'by vNode with className baz', () =>
      {
        const vNode = div({ className: 'bar' })
        div([ div('.baz'), vNode ])

        assert.ok(!hasCssSelector('.foo + .bar', vNode))
      })
    })

    describe('given cssSelector `.foo ~ .bar`', () => {
      it('returns true when given a vNode with className bar preceded ' +
         'by vNode with className foo', () =>
      {
        const vNode = div({ className: 'bar' })
        div([ div({ className: 'foo' }), div(), div(), vNode ])

        assert.ok(hasCssSelector('.foo ~ .bar', vNode))
      })

      it('returns false when given a vNode with className bar preceded ' +
         'by vNode with className baz', () =>
      {
        const vNode = div({ className: 'bar' })
        div([ div('.baz'), vNode ])

        assert.ok(!hasCssSelector('.foo ~ .bar', vNode))
      })
    })

    describe('complicated selectors', () => {
      it('should return true given `div > .parent > .foo ~ .bar`', () => {
        const child = div({ className: 'bar' })
        const sibling = div({ className: 'foo' })
        const parent = div({ className: 'parent' }, [ sibling, child ])
        div({ className: 'grandparent' }, [ parent ])

        assert.ok(hasCssSelector(`div > .parent > .foo ~ .bar`, child))
      })

      it('should return true given `p > .foo, div .bar`', () => {
        const child = div({ className: 'bar' })
        div([ child ])

        const selector = `p > .foo, div .bar`

        assert.ok(hasCssSelector(selector, child))

        const child2 = div({ className: 'foo' })
        p([ child2 ])

        assert.ok(hasCssSelector(selector, child2))
      })

      it('should return true given `div .bar, .parent > .foo`', () => {
        const child = div({ className: 'bar' })
        div([ child ])

        const selector = `div .bar, .parent > .foo`

        assert.ok(hasCssSelector(selector, child))

        const child2 = div({ className: 'foo' })
        p({ className: 'parent' }, [ child2 ])

        assert.ok(hasCssSelector(selector, child2))
      })
    })
  })

  describe(`given a css selector of .foo and a vNode with className foo set in props`, () => {
    it(`returns true`, () => {
      const cssSelector = `.foo`
      const vNode = div({ className: `foo` })

      assert.ok(hasCssSelector(cssSelector, vNode))
    })
  })

  describe(`given a css selector of #foo and a vNode with id foo set in props`, () => {
    it(`returns true`, () => {
      const cssSelector = `#foo`
      const vNode = div({ id: `foo` })

      assert.ok(hasCssSelector(cssSelector, vNode))
    })
  })
})

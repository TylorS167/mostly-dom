import * as assert from 'assert'

import { BaseModule, ElementVNode, VNode, a, b, div, h, i, init, span } from './'

import { elementToVNode } from './elementToVNode'

const patch = init()

function prop(name: string) {
  return function(obj: any): any {
    return obj[name]
  }
}

// tslint:disable:no-shadowed-variable

function map(fn: (x: any) => any, list: Array<any> | ArrayLike<any>): Array<any> {
  const ret: Array<any> = []

  for (let i = 0; i < list.length; ++i) ret[i] = fn(list[i])

  return ret
}

function getChild(vnode: VNode, index: number): VNode {
  return (
    (vnode &&
      vnode.children &&
      (vnode.children as Array<any>).length >= index + 1 &&
      (vnode.children[index] as VNode))
  ) as VNode
}

const inner = prop('innerHTML')

describe('mostly-dom', function() {
  let elm: HTMLElement
  let vnode0: ElementVNode

  beforeEach(function() {
    elm = document.createElement('div')
    vnode0 = elementToVNode(elm)
  })

  describe('patching an element', function() {
    it('changes an elements props', function() {
      const vnode1 = a({ href: 'http://other/' }) as ElementVNode
      const vnode2 = a({ href: 'http://localhost/' })

      patch(vnode0, vnode1)

      elm = patch(vnode1, vnode2).element as HTMLAnchorElement
      assert.equal((elm as any).href, 'http://localhost/')
    })

    it('removes an elements props', function() {
      const vnode1 = a({ href: 'http://other/' }) as ElementVNode
      const vnode2 = a()

      patch(vnode0, vnode1)
      patch(vnode1, vnode2)

      assert.equal((elm as any).href, undefined)
    })

    describe('updating children with keys', function() {
      function spanNum(n: string | number) {
        if (typeof n === 'string') {
          return span({}, n)
        } else {
          return span({ key: n }, n.toString())
        }
      }

      describe('addition of elements', function() {
        it('appends elements', function() {
          const vnode1 = span([ 1 ].map(spanNum)) as ElementVNode

          const vnode2 = span([ 1, 2, 3 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 1)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 3)
          assert.equal(elm.children[1].innerHTML, '2')
          assert.equal(elm.children[2].innerHTML, '3')
        })

        it('prepends elements', function() {
          const vnode1 = span([ 4, 5 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 1, 2, 3, 4, 5 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 2)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.deepEqual(map(inner, elm.children), [ '1', '2', '3', '4', '5' ])
        })

        it('add elements in the middle', function() {
          const vnode1 = span([ 1, 2, 4, 5 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 1, 2, 3, 4, 5 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 4)
          assert.equal(elm.children.length, 4)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.deepEqual(map(inner, elm.children), [ '1', '2', '3', '4', '5' ])
        })

        it('add elements at begin and end', function() {
          const vnode1 = span([ 2, 3, 4 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 1, 2, 3, 4, 5 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 3)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.deepEqual(map(inner, elm.children), [ '1', '2', '3', '4', '5' ])
        })

        it('adds children to parent with no children', function() {
          const vnode1 = span({ key: 'span' }) as ElementVNode
          const vnode2 = span({ key: 'span' }, [ 1, 2, 3 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 0)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.deepEqual(map(inner, elm.children), [ '1', '2', '3' ])
        })

        it('removes all children from parent', function() {
          const vnode1 = span({ key: 'span' }, [ 1, 2, 3 ].map(spanNum)) as ElementVNode

          const vnode2 = span({ key: 'span' })

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.deepEqual(map(inner, elm.children), [ '1', '2', '3' ])

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 0)
        })
      })

      describe('removal of elements', function() {
        it('removes elements from the beginning', function() {
          const vnode1 = span([ 1, 2, 3, 4, 5 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 3, 4, 5 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 5)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.deepEqual(map(inner, elm.children), [ '3', '4', '5' ])
        })

        it('removes elements from the end', function() {
          const vnode1 = span([ 1, 2, 3, 4, 5 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 1, 2, 3 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 5)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 3)
          assert.equal(elm.children[0].innerHTML, '1')
          assert.equal(elm.children[1].innerHTML, '2')
          assert.equal(elm.children[2].innerHTML, '3')
        })

        it('removes elements from the middle', function() {
          const vnode1 = span([ 1, 2, 3, 4, 5 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 1, 2, 4, 5 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 5)
          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 4)
          assert.deepEqual(elm.children[0].innerHTML, '1')
          assert.equal(elm.children[0].innerHTML, '1')
          assert.equal(elm.children[1].innerHTML, '2')
          assert.equal(elm.children[2].innerHTML, '4')
          assert.equal(elm.children[3].innerHTML, '5')
        })
      })

      describe('element reordering', function() {
        it('moves element forward', function() {
          const vnode1 = span([ 1, 2, 3, 4 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 2, 3, 1, 4 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 4)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 4)
          assert.equal(elm.children[0].innerHTML, '2')
          assert.equal(elm.children[1].innerHTML, '3')
          assert.equal(elm.children[2].innerHTML, '1')
          assert.equal(elm.children[3].innerHTML, '4')
        })

        it('moves element to end', function() {
          const vnode1 = span([ 1, 2, 3 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 2, 3, 1 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 3)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 3)
          assert.equal(elm.children[0].innerHTML, '2')
          assert.equal(elm.children[1].innerHTML, '3')
          assert.equal(elm.children[2].innerHTML, '1')
        })

        it('moves element backwards', function() {
          const vnode1 = span([ 1, 2, 3, 4 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 1, 4, 2, 3 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 4)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 4)
          assert.equal(elm.children[0].innerHTML, '1')
          assert.equal(elm.children[1].innerHTML, '4')
          assert.equal(elm.children[2].innerHTML, '2')
          assert.equal(elm.children[3].innerHTML, '3')
        })

        it('swaps first and last', function() {
          const vnode1 = span([ 1, 2, 3, 4 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 4, 2, 3, 1 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 4)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 4)
          assert.equal(elm.children[0].innerHTML, '4')
          assert.equal(elm.children[1].innerHTML, '2')
          assert.equal(elm.children[2].innerHTML, '3')
          assert.equal(elm.children[3].innerHTML, '1')
        })
      })

      describe('combinations of additions, removals and reorderings', function() {
        it('move to left and replace', function() {
          const vnode1 = span([ 1, 2, 3, 4, 5 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 4, 1, 2, 3, 6 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 5)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 5)
          assert.equal(elm.children[0].innerHTML, '4')
          assert.equal(elm.children[1].innerHTML, '1')
          assert.equal(elm.children[2].innerHTML, '2')
          assert.equal(elm.children[3].innerHTML, '3')
          assert.equal(elm.children[4].innerHTML, '6')
        })

        it('moves to left and leaves hole', function() {
          const vnode1 = span([ 1, 4, 5 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 4, 6 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 3)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.deepEqual(map(inner, elm.children), [ '4', '6' ])
        })

        it('handles moved and set to undefined element ending at the end', function() {
          const vnode1 = span([ 2, 4, 5 ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 4, 5, 3 ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.children.length, 3)

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.children.length, 3)
          assert.equal(elm.children[0].innerHTML, '4')
          assert.equal(elm.children[1].innerHTML, '5')
          assert.equal(elm.children[2].innerHTML, '3')
        })

        it('moves a key in non-keyed nodes with a size up', function() {
          const vnode1 = span([ 1, 'a', 'b', 'c' ].map(spanNum)) as ElementVNode
          const vnode2 = span([ 'd', 'a', 'b', 'c', 1, 'e' ].map(spanNum))

          elm = patch(vnode0, vnode1).element as HTMLElement

          assert.equal(elm.childNodes.length, 4)
          assert.equal(elm.textContent, '1abc')

          elm = patch(vnode1, vnode2).element as HTMLElement

          assert.equal(elm.childNodes.length, 6)
          assert.equal(elm.textContent, 'dabc1e')
        })
      })

      it('reverses elements', function() {
        const vnode1 = span([ 1, 2, 3, 4, 5, 6, 7, 8 ].map(spanNum)) as ElementVNode
        const vnode2 = span([ 8, 7, 6, 5, 4, 3, 2, 1 ].map(spanNum))

        elm = patch(vnode0, vnode1).element as HTMLElement

        assert.equal(elm.childNodes.length, 8)

        assert.deepEqual(map(inner, elm.childNodes), [ '1', '2', '3', '4', '5', '6', '7', '8' ])

        elm = patch(vnode1, vnode2).element as HTMLElement

        assert.deepEqual(map(inner, elm.childNodes), [ '8', '7', '6', '5', '4', '3', '2', '1' ])
      })

      it('something', function() {
        const vnode1 = span([ 0, 1, 2, 3, 4, 5 ].map(spanNum)) as ElementVNode
        const vnode2 = span([ 4, 3, 2, 1, 5, 0 ].map(spanNum))

        elm = patch(vnode0, vnode1).element as HTMLElement

        assert.equal(elm.children.length, 6)

        elm = patch(vnode1, vnode2).element as HTMLElement

        assert.deepEqual(map(inner, elm.children), [ '4', '3', '2', '1', '5', '0' ])
      })

      it('handles random shuffles', function() {
        let i: any
        const arr: Array<any> = []
        const opacities: Array<any> = []
        const elms = 14
        const samples = 5

        function spanNumWithOpacity(n: any, o: any) {
          return span({ key: n, style: { opacity: o } }, n.toString())
        }

        for (let n = 0; n < elms; ++n) {
          arr[n] = n
        }

        for (let n = 0; n < samples; ++n) {
          const vnode1 = span(
            arr.map(function(num: number) {
              return spanNumWithOpacity(num, '1')
            })
          ) as ElementVNode

          const shufArr: Array<any> = shuffle(arr.slice(0))

          let element = document.createElement('div')

          element = patch(elementToVNode(element), vnode1).element as HTMLDivElement

          for (i = 0; i < elms; ++i) {
            assert.equal(element.children[i].innerHTML, i.toString())
            opacities[i] = Math.random().toFixed(5).toString()
          }

          const vnode2 = span(
            arr.map(function(num: number) {
              return spanNumWithOpacity(shufArr[num], opacities[num])
            })
          )

          element = patch(vnode1, vnode2).element as HTMLDivElement

          for (i = 0; i < elms; ++i) {
            assert.equal(element.children[i].innerHTML, shufArr[i].toString())
            assert.equal(
              opacities[i].indexOf((element.children[i] as HTMLElement).style.opacity),
              0
            )
          }
        }
      })
    })

    describe('updating children without keys', function() {
      it('appends elements', function() {
        const vnode1 = div([ span('Hello') ]) as ElementVNode
        const vnode2 = div([ span('Hello'), span('World') ])

        elm = patch(vnode0, vnode1).element as HTMLElement

        assert.deepEqual(map(inner, elm.children), [ 'Hello' ])

        elm = patch(vnode1, vnode2).element as HTMLElement

        assert.deepEqual(map(inner, elm.children), [ 'Hello', 'World' ])
      })

      it('handles unmoved text nodes', function() {
        const vnode1 = div([ 'Text', span('Span') ]) as ElementVNode
        const vnode2 = div([ 'Text', span('Span') ])

        elm = patch(vnode0, vnode1).element as HTMLElement

        assert.equal(elm.childNodes[0].textContent, 'Text')

        elm = patch(vnode1, vnode2).element as HTMLElement

        assert.equal(elm.childNodes[0].textContent, 'Text')
      })

      it('handles changing text children', function() {
        const vnode1 = div([ 'Text', span('Span') ]) as ElementVNode
        const vnode2 = div([ 'Text2', span('Span') ])

        elm = patch(vnode0, vnode1).element as HTMLElement

        assert.equal(elm.childNodes[0].textContent, 'Text')

        elm = patch(vnode1, vnode2).element as HTMLElement

        assert.equal(elm.childNodes[0].textContent, 'Text2')
      })

      it('prepends element', function() {
        const vnode1 = div([ span('World') ]) as ElementVNode
        const vnode2 = div([ span('Hello'), span('World') ])

        elm = patch(vnode0, vnode1).element as HTMLElement

        assert.deepEqual(map(inner, elm.children), [ 'World' ])

        elm = patch(vnode1, vnode2).element as HTMLElement

        const { childNodes } = elm
        const firstChild = childNodes[0]
        const secondChild = childNodes[1]

        assert.deepEqual([ firstChild.textContent, secondChild.textContent ], [ 'Hello', 'World' ])
      })

      it('prepends element of different tag type', function() {
        const vnode1 = div([ span('World') ]) as ElementVNode
        const vnode2 = div([ div('Hello'), span('World') ])

        elm = patch(vnode0, vnode1).element as HTMLElement

        assert.deepEqual(map(inner, elm.children), [ 'World' ])

        elm = patch(vnode1, vnode2).element as HTMLElement

        assert.deepEqual(map(prop('tagName'), elm.children), [ 'DIV', 'SPAN' ])
        assert.deepEqual(map(inner, elm.children), [ 'Hello', 'World' ])
      })

      it('removes elements', function() {
        const vnode1 = div([ span('One'), span('Two'), span('Three') ]) as ElementVNode

        const vnode2 = div([ span('One'), span('Three') ])

        elm = patch(vnode0, vnode1).element as HTMLElement

        const contents: Array<string> = []

        for (let i = 0; i < elm.childNodes.length; ++i)
          contents[i] = elm.childNodes[i].textContent as string

        assert.deepEqual(contents, [ 'One', 'Two', 'Three' ])

        elm = patch(vnode1, vnode2).element as HTMLElement

        const secondContents: Array<string> = []

        for (let i = 0; i < elm.childNodes.length; ++i)
          secondContents[i] = elm.childNodes[i].textContent as string

        assert.deepEqual(secondContents, [ 'One', 'Three' ])
      })

      it('removes a single text node', function() {
        const vnode1 = div('One') as ElementVNode
        const vnode2 = div()

        patch(vnode0, vnode1)

        assert.equal(elm.textContent, 'One')

        patch(vnode1, vnode2)

        assert.equal(elm.textContent, '')
      })

      it('removes a single text node when children are updated', function() {
        const vnode1 = div('One') as ElementVNode
        const vnode2 = div([ div('Two'), span('Three') ])

        patch(vnode0, vnode1)

        assert.equal(elm.textContent, 'One')

        patch(vnode1, vnode2)

        assert.deepEqual(map(prop('textContent'), elm.childNodes), [ 'Two', 'Three' ])
      })

      it('removes a text node among other elements', function() {
        const vnode1 = div([ 'One', span('Two') ]) as ElementVNode
        const vnode2 = div([ div('Three') ])

        patch(vnode0, vnode1)

        assert.deepEqual(map(prop('textContent'), elm.childNodes), [ 'One', 'Two' ])

        patch(vnode1, vnode2)
        assert.equal(elm.childNodes.length, 1)
        assert.equal((elm.childNodes[0] as HTMLElement).tagName, 'DIV')
        assert.equal(elm.childNodes[0].textContent, 'Three')
      })

      it('reorders elements', function() {
        const vnode1 = div([ span('One'), div('Two'), b('Three') ]) as ElementVNode
        const vnode2 = div([ b('Three'), span('One'), div('Two') ])
        elm = patch(vnode0, vnode1).element as HTMLElement
        assert.deepEqual(map(inner, elm.children), [ 'One', 'Two', 'Three' ])
        elm = patch(vnode1, vnode2).element as HTMLElement
        assert.deepEqual(map(prop('tagName'), elm.children), [ 'B', 'SPAN', 'DIV' ])
        assert.deepEqual(map(inner, elm.children), [ 'Three', 'One', 'Two' ])
      })
    })
  })

  describe('hooks', function() {
    describe('element hooks', function() {
      it('calls `create` listener before inserted into parent but after children', function() {
        const result: Array<any> = []

        function cb(vnode: VNode) {
          assert.equal((vnode.element as HTMLSpanElement).children.length, 2)
          assert.strictEqual(vnode && vnode.element && vnode.element.parentNode, null)
          result.push(vnode)
        }

        const vnode1 = div([
          span('First sibling'),
          div({ create: cb }, [ span('Child 1'), span('Child 2') ]),
          span("Can't touch me"),
        ])

        patch(vnode0, vnode1)

        assert.equal(1, result.length)
      })

      // tslint:disable-next-line
      it('calls `insert` listener after both parents, siblings and children have been inserted', function() {
        const result: Array<any> = []
        function cb(vnode: VNode) {
          assert(vnode.element instanceof Element)
          assert.equal((vnode.element as HTMLSpanElement).children.length, 2)
          assert.equal(
            ((vnode.element as HTMLSpanElement).parentNode as HTMLDivElement).children.length,
            3
          )
          result.push(vnode)
        }

        const vnode1 = div([
          span('First sibling'),
          div({ insert: cb }, [ span('Child 1'), span('Child 2') ]),
          span('Can touch me'),
        ])

        patch(vnode0, vnode1)
        assert.equal(1, result.length)
      })

      it('calls `prepatch` listener', function() {
        const result: Array<any> = []
        function cb(oldVnode: VNode, vnode: VNode) {
          /* tslint:disable */
          assert.strictEqual(oldVnode, getChild(vnode1, 1))
          assert.strictEqual(vnode, getChild(vnode2, 1))
          /* tslint:enable */
          result.push(vnode)
        }

        const vnode1 = div([
          span('First sibling'),
          div({ prepatch: cb }, [ span('Child 1'), span('Child 2') ]),
        ]) as ElementVNode

        const vnode2 = div([
          span('First sibling'),
          div({ prepatch: cb }, [ span('Child 1'), span('Child 2') ]),
        ])

        patch(vnode0, vnode1)
        patch(vnode1, vnode2)
        assert.equal(result.length, 1)
      })

      it('calls `postpatch` after `prepatch` listener', function() {
        const pre: Array<any> = []
        const post: Array<any> = []
        function preCb() {
          pre.push(pre)
        }

        function postCb() {
          assert.equal(pre.length, post.length + 1)
          post.push(post)
        }

        const vnode1 = div([
          span('First sibling'),
          div({ prepatch: preCb, postpatch: postCb }, [ span('Child 1'), span('Child 2') ]),
        ]) as ElementVNode

        const vnode2 = div([
          span('First sibling'),
          div({ prepatch: preCb, postpatch: postCb }, [ span('Child 1'), span('Child 2') ]),
        ])

        patch(vnode0, vnode1)
        patch(vnode1, vnode2)
        assert.equal(pre.length, 1)
        assert.equal(post.length, 1)
      })

      it('calls `update` listener', function() {
        const result1: Array<any> = []
        const result2: Array<any> = []

        function cb(result: Array<any>, oldVnode: VNode, vnode: VNode) {
          if (result.length > 0) {
            assert.strictEqual(result[result.length - 1], oldVnode)
          }
          result.push(vnode)
        }

        const vnode1 = div([
          span('First sibling'),
          div({ update: cb.bind(null, result1) }, [
            span('Child 1'),
            span({ update: cb.bind(null, result2) }, 'Child 2'),
          ]),
        ]) as ElementVNode

        const vnode2 = div([
          span('First sibling'),
          div({ update: cb.bind(null, result1) }, [
            span('Child 1'),
            span({ update: cb.bind(null, result2) }, 'Child 2'),
          ]),
        ])

        patch(vnode0, vnode1)
        patch(vnode1, vnode2)
        assert.equal(result1.length, 1)
        assert.equal(result2.length, 1)
      })

      it('calls `remove` listener', function() {
        const result: Array<any> = []
        function cb(vnode: ElementVNode, rm: () => any) {
          const parent = vnode.element && (vnode.element.parentNode as Element)
          assert(vnode.element instanceof Element)
          assert.equal(vnode.element.children && vnode.element.children.length, 2)
          assert.equal(parent.children && parent.children.length, 2)
          result.push(vnode)
          rm()
          assert.equal(parent.children.length, 1)
        }

        const vnode1 = div([
          span('First sibling'),
          div({ remove: cb }, [ span('Child 1'), span('Child 2') ]),
        ]) as ElementVNode

        const vnode2 = div([ span('First sibling') ])

        patch(vnode0, vnode1)
        patch(vnode1, vnode2)
        assert.equal(1, result.length)
      })

      it('calls `init` and `prepatch` listeners on root', function() {
        let count = 0
        /* tslint:disable */

        function init(_: VNode) {
          count += 1
        }

        function prepatch(_: VNode, __: VNode) {
          count += 1
        }

        /* tslint:enable */
        let vnode1 = div({ init, prepatch }) as ElementVNode
        vnode1 = patch(vnode0, vnode1)

        assert.equal(1, count)

        const vnode2 = span({ init, prepatch })

        patch(vnode1, vnode2)
        assert.equal(2, count)
      })

      it('removes element when all remove listeners are done', function() {
        let rm1: any
        let rm2: any
        let rm3: any

        class RemoveModule1 extends BaseModule<Element> {
          constructor() {
            super()
          }

          public remove(_: any, rm: Function) {
            rm1 = rm
          }
        }

        class RemoveModule2 extends BaseModule<Element> {
          constructor() {
            super()
          }

          public remove(_: any, rm: Function) {
            rm2 = rm
          }
        }

        const _patch = init([ new RemoveModule1(), new RemoveModule2() ])

        const vnode1 = div([
          a({
            remove(_: any, rm: Function) {
              rm3 = rm
            },
          }),
        ]) as ElementVNode

        const vnode2 = div([])

        elm = _patch(vnode0, vnode1).element as HTMLElement

        assert.equal(elm.children.length, 1)

        elm = _patch(vnode1, vnode2).element as HTMLElement

        assert.equal(elm.children.length, 1)

        rm1()

        assert.equal(elm.children.length, 1)

        rm3()

        assert.equal(elm.children.length, 1)

        rm2()

        assert.equal(elm.children.length, 0)
      })

      it('invokes remove hook on replaced root', function() {
        const result: Array<any> = []
        const parent = document.createElement('div')

        parent.appendChild(vnode0.element)

        function cb(vnode: VNode, rm: () => any) {
          result.push(vnode)
          rm()
        }

        const vnode1 = div({ remove: cb }, [ b('Child 1'), i('Child 2') ]) as ElementVNode

        const vnode2 = span([ b('Child 1'), i('Child 2') ])

        patch(vnode0, vnode1)
        patch(vnode1, vnode2)

        assert.equal(1, result.length)
      })
    })

    describe('module hooks', function() {
      it('invokes `pre` and `post` hook', function() {
        const result: Array<any> = []

        class Module extends BaseModule<Element> {
          public pre() {
            result.push('pre')
          }

          public post() {
            result.push('post')
          }
        }

        const _patch = init([ new Module() ])

        const vnode1 = div()

        _patch(vnode0, vnode1)

        assert.deepEqual(result, [ 'pre', 'post' ])
      })

      it('invokes global `destroy` hook for all removed children', function() {
        const result: Array<VNode> = []
        function cb(vnode: VNode) {
          result.push(vnode)
        }

        const vnode1 = div([
          span('First sibling'),
          div([ span({ destroy: cb }, 'Child 1'), span('Child 2') ]),
        ]) as ElementVNode

        const vnode2 = div()

        patch(patch(vnode0, vnode1), vnode2)

        assert.equal(result.length, 1)
      })

      it('handles text vnodes with `undefined` `data` property', function() {
        const vnode1 = div([ ' ' ]) as ElementVNode

        const vnode2 = div([])

        patch(vnode0, vnode1)
        patch(vnode1, vnode2)
      })

      it('invokes `destroy` module hook for all removed children', function() {
        let created = 0
        let destroyed = 0

        class Module extends BaseModule<Element> {
          public create() {
            created++
          }

          public destroy() {
            destroyed++
          }
        }

        const _patch = init([ new Module() ])

        const vnode1 = div([
          span('First sibling'),
          div([ span('Child 1'), span('Child 2') ]),
        ]) as ElementVNode

        const vnode2 = div()

        _patch(vnode0, vnode1)
        _patch(vnode1, vnode2)

        assert.equal(created, 4)
        assert.equal(destroyed, 4)
      })

      it('does not invoke `create` and `remove` module hook for text nodes', function() {
        let created = 0
        let removed = 0

        class Module extends BaseModule<Element> {
          public create() {
            created++
          }

          public remove() {
            removed++
          }
        }

        const _patch = init([ new Module() ])

        const vnode1 = div([ span('First child'), '', span('Third child') ]) as ElementVNode

        const vnode2 = div()

        _patch(vnode0, vnode1)
        _patch(vnode1, vnode2)

        assert.equal(created, 2)
        assert.equal(removed, 2)
      })

      it('does not invoke `destroy` module hook for text nodes', function() {
        let created = 0
        let destroyed = 0

        const _patch = init([
          // tslint:disable-next-line:max-classes-per-file
          new class extends BaseModule<Element> {
            public create() {
              created++
            }
            public destroy() {
              destroyed++
            }
          }(),
        ])

        const vnode1 = div([
          span('First sibling'),
          div([ span('Child 1'), span([ 'Text 1', 'Text 2' ]) ]),
        ]) as ElementVNode

        const vnode2 = div()

        _patch(vnode0, vnode1)
        _patch(vnode1, vnode2)

        assert.equal(created, 4)
        assert.equal(destroyed, 4)
      })
    })
  })

  describe('short circuiting', function() {
    it('does not update strictly equal vnodes', function() {
      const result: Array<any> = []
      function cb(vnode: VNode) {
        result.push(vnode)
      }

      const vnode1 = div([ span({ update: cb }, 'Hello'), span('there') ]) as ElementVNode

      patch(vnode0, vnode1)
      patch(vnode1, vnode1)

      assert.equal(result.length, 0)
    })

    it('does not update strictly equal children', function() {
      const result: Array<any> = []

      function cb(vnode: VNode) {
        result.push(vnode)
      }

      const vnode1 = div([ span({ update: cb }, 'Hello'), span('there') ]) as ElementVNode

      const vnode2 = div()

      vnode2.children = vnode1.children

      patch(vnode0, vnode1)
      patch(vnode1, vnode2)

      assert.equal(result.length, 0)
    })
  })
})

export function shuffle(array: Array<any>): Array<any> {
  let currentIndex = array.length
  let temporaryValue: any
  let randomIndex: any

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
// tslint:disable:max-file-line-count

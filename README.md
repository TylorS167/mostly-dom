# Mostly DOM

> A Type-Safe virtual-dom implementation. A virtual-dom implementation that works for you.

Mostly-dom a virtual-dom implementation that provides strong types for everyday things
like CSS values and HTML properties, you will be able to use itellisense to make your
life easier. Say goodbye to a great deal of spelling mistakes.

Mostly DOM is written in and for TypeScript, it will work in plain JS environments, but
it is not recommended as you will lose all benefits of strong types. If you're in a plain
JS environment I would highly recommend the project [snabbdom](https://github.com/snabbdom/snabbdom).

### Credit where credit is due

This project is mostly a deriviation of [snabbdom](https://github.com/snabbdom/snabbdom)
with some rather large breaking changes an design differences. Mostly DOM has been written
with [Motorcycle.js](https://github.com/motorcyclejs) in mind, but is not useful for only this one project.

Typings for CSS is humbly reused from the amazing project [TypeStyle](https://github.com/typestyle/typestyle).

I **highly** recommend both projects if they suit your needs!

## Let me have it
```sh
npm install --save mostly-dom
```

## Basic Usage

```typescript
import { init, elementToVNode, h } from 'mostly-dom';

const patch = init([]);

const initialVNode = elementToVNode(document.querySelector('#app') as Element);

const vNode = h('div', [ h('h1', 'Hello, World') ]);

patch(initialVNode, vNode);
```

## API

#### `init(modules: Array<Module>): patch`

The main function of the library, given an array of modules, it returns to you a `patch` function.

#### `patch(elementVNode: ElementVNode, vNode: VNode): ElementVNode`

The patch function is the workhorse of the library, taking 2 arguments.
First it takes a vNode that has an `Element` associated to it, an `ElementVNode`, and a vNode that currently does not,
returning to you an `ElementVNode`.

One noticable difference from Snabbdom, is that the patch function is no longer polymorphic. This function
is designed to be used very well with Streams, such as [Most.js](https://github.com/cujojs/most), in particular
in a `scan` or `reduce` operator.

#### h(selector: string): VNode;
#### h(selector: string, data: VNodeProps): VNode;
#### h(selector: string, children: HyperscriptChildren): VNode;
#### h(selector: string, data: VNodeProps, children: HyperscriptChildren): VNode;

The recommended way to created a `VNode`. `h` accepts a CSS selector, containing no spaces, but most start with a tag name.
Optionally it accepts both `VNodeProps` and `HyperscriptChildren` to further represent your view.

```typescript
import { h } from 'mostly-dom';

const vNode = h('div', { style: { color: '#000' } }, [
  h('h1', 'Headline'),
  h('p', 'A paragraph'),
]);
```

Also available a multitude of type-safe hyperscript-helper functions.

```typescript
import { div, h1, p } from 'mostly-dom';

const vNode = div({ style: { color: '#000' } }, [
  h1('Headline'),
  p('A paragraph'),
]);
```

#### elementToVNode(element: Element): ElementVNode

Converts an element to an ElementVNode. particularly useful for an initial patch call.

```typescript
const div = document.createElement('div');

div.id = 'hello';
div.className = 'test';

const divVNode = elementToVNode(div);

/*
{
  tagName: 'div',
  id: 'hello',
  className: 'test',
  props: {},
  children: [],
  element: HTMLDivElement // the original element
  text: undefined,
  key; undefined,
  scope: undefined,
  namespace: undefined,
  parent: undefined
}
*/
```

#### <a id="hasCssSelector"></a> `hasCssSelector(cssSelector: string, vNode: VNode): boolean`

Given a CSS selector **without** spaces, this function does not search children, it
will return `true` if the given CSS selector matches that of the VNode and `false`
if it does not. If a CSS selector **with** spaces is given it will throw an error.

```typescript
import { hasCssSelector, div } from '@motorcycle/dom';

console.log(hasCssSelector('.foo', div('.foo'))) // true
console.log(hasCssSelector('.bar', div('.foo'))) // false
console.log(hasCssSelector('div', div('.foo'))) // true
console.log(hasCssSelector('#foo', div('#foo'))) // true
console.log(hasCssSelector('.foo .bar'), div('.foo.bar')) // ERROR!

## Types

There are a very large number of types in use in Mostly DOM, and it would be
crazy to put even a small amount of them into this README, if you're interested
or need more information about these types please browse through the
[`types folder`](https://github.com/TylorS/mostly-dom/tree/master/src/types).

Some very useful typings to learn are that of [`VNodeProps`](https://github.com/TylorS/mostly-dom/blob/master/src/types/VirtualNode.ts#L43)
which is the type for the optional second parameter to `h`.
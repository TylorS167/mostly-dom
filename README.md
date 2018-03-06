# Mostly DOM


> A Type-Safe virtual-dom implementation. A virtual-dom implementation that works for you.

Mostly DOM is a virtual-dom implementation that provides strong types for everyday things
like CSS values and HTML properties, you will be able to use itellisense to make your
life easier. Say goodbye to a great deal of spelling mistakes.

## Let me have it
```sh
npm install --save mostly-dom
```

## Basic Usage

```typescript
import { init, elementToVNode, h } from 'mostly-dom';

const patch = init([]);
const rootElement = document.querySelector('#app')

if (!rootElement) throw new Error('Unable to find root element')

const initialVNode = elementToVNode(rootElement);
const vNode = h('div', [ h('h1', 'Hello, World') ]);

patch(initialVNode, vNode);
```


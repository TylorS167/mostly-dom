import * as assert from 'assert';
import { updateElement } from './updateElement';
import { h, ElementVNode, SCOPE_ATTRIBUTE } from '../';

describe('updateElement', () => {
  it('updates a change to scope', () => {
    const element = document.createElement('div');
    element.setAttribute(SCOPE_ATTRIBUTE, 'hi');

    const formerVNode = h('div', { scope: 'hi' }, []) as ElementVNode;

    formerVNode.element = element;

    const vNode = h('div', { scope: 'hello' }, []);

    const elementVNode = updateElement(formerVNode, vNode);

    assert.strictEqual(elementVNode.element.getAttribute(SCOPE_ATTRIBUTE), 'hello');
  });
});

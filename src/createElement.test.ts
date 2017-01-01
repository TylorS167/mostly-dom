import * as assert from 'assert';
import { h, MostlyVNode, ElementVNode } from './';
import { createElement } from './createElement';
import { ModuleCallbacks } from './modules/ModuleCallbacks';

const moduleCallbacks = new ModuleCallbacks([]);

describe('createElement', () => {
  it('creates an basic element from VNode', () => {
    const vNode = h('div');

    const element = createElement(vNode, moduleCallbacks,  []).element;

    assert.strictEqual((element as Element).tagName, 'DIV');
  });

  it('creates an element with an id', () => {
    const vNode = h('div#id');

    const element = createElement(vNode, moduleCallbacks,  []).element as HTMLDivElement;

    assert.strictEqual(element.id, 'id');
  });

  it('creates an element with a className', () => {
    const vNode = h('div.className');

    const element = createElement(vNode, moduleCallbacks,  []).element as HTMLDivElement;

    assert.strictEqual(element.className, 'className');
  });

  it('creates an element with children', () => {
    const vNode = h('div', {}, [
      h('h1', 'Hello'),
      h('h2', 'World'),
    ]);

    const element = createElement(vNode, moduleCallbacks,  []).element as HTMLDivElement;

    assert.strictEqual(element.children.length, 2);
  });

  it('adds VNodes to given array if insert hook is present', () => {
    const vNode = h('div', { insert () {} }, []);

    const vNodeQueue: ElementVNode[] = [];

    createElement(vNode, moduleCallbacks, vNodeQueue);

    assert.strictEqual(vNodeQueue.length, 1);
  });

  it('creates text elements', () => {
    const vNode = MostlyVNode.createText('hello');

    const text = createElement(vNode, moduleCallbacks,  []).element as Text;

    assert.strictEqual(text.nodeName, '#text');
  });

  it('creates an svg element', () => {
    const vNode = h('svg', {}, []);

    assert.strictEqual(vNode.namespace, 'http://www.w3.org/2000/svg');

    const element = createElement(vNode, moduleCallbacks,  []).element as SVGElement;

    assert.strictEqual(element.namespaceURI, 'http://www.w3.org/2000/svg');
  });

  describe('given a vNode with scope', () => {
    it('creates an element with data-mostly-dom-scope attribute', () => {
      const vNode = h('div', { scope: 'hello' }, []);

      const element = createElement(vNode, moduleCallbacks, []).element as Element;

      assert.strictEqual(element.getAttribute('data-mostly-dom-scope'), 'hello');
    });

    it('creates children elements with data-mostly-dom-scope attribute', () => {
      const vNode = h('div', { scope: 'hello' }, [ h('h1', {}, []) ]);

      createElement(vNode, moduleCallbacks, []);

      const element = vNode.children[0].element as Element;

      assert.strictEqual(element.getAttribute('data-mostly-dom-scope'), 'hello');
    });
  });

  describe('hooks', () => {
    describe('init', () => {
      it('calls init hook if present', () => {
        let called = 0;

        function init () {
          ++called;
        }

        const vNode = h('div', { init });

        createElement(vNode, moduleCallbacks,  []);

        assert.strictEqual(called, 1);
      });
    });

    describe('create', () => {
      it('calls create hook if present', () => {
        let called = 0;

        function create () {
          ++called;
        }

        const vNode = h('div', { create });

        createElement(vNode, moduleCallbacks,  []);

        assert.strictEqual(called, 1);
      });
    });
  });
});

import { Module, ElementVNode, VNode, InsertHook } from './';
import { ModuleCallbacks } from './modules/ModuleCallbacks';
import { AttributesModule } from './modules/attributes';
import { PropsModule } from './modules/props';
import { StylesModule } from './modules/styles';
import { vNodesAreEqual } from './helpers';
import { patchVNode } from './patchVNode';
import { createElement } from './createElement';
import { removeVNodes } from './removeVNodes';

export function init (modules: Array<Module>) {
  const attributesModule = new AttributesModule();
  const propsModule = new PropsModule();
  const stylesModule = new StylesModule();

  const defaultModules = [ attributesModule, propsModule, stylesModule ];

  const moduleCallbacks = new ModuleCallbacks(defaultModules.concat(modules));

  return function patch (formerVNode: ElementVNode, vNode: VNode): ElementVNode {
    const insertedVNodeQueue: Array<ElementVNode> = [];

    moduleCallbacks.pre(vNode);

    if (vNodesAreEqual(formerVNode, vNode))
      patchVNode(formerVNode, vNode, moduleCallbacks, insertedVNodeQueue);
    else {
      const element = formerVNode.element;
      const parentNode = element.parentNode;

      vNode = createElement(vNode, moduleCallbacks, insertedVNodeQueue) as ElementVNode;

      if (parentNode) {
        parentNode.insertBefore(vNode.element as Element, element.nextSibling);
        removeVNodes(parentNode, [formerVNode], 0, 0, moduleCallbacks);
      }
    }

    for (let i = 0; i < insertedVNodeQueue.length; ++i)
      (insertedVNodeQueue[i].props.insert as InsertHook)(insertedVNodeQueue[i]);

    moduleCallbacks.post(vNode as ElementVNode);

    return vNode as ElementVNode;
  };
}

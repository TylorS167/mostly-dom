import { ElementVNode, VNode, TextVNode } from '../';
import { ModuleCallbacks } from '../modules/ModuleCallbacks';
import { vNodesAreEqual } from '../helpers';

import { updateElement } from './updateElement';
import { patchVNodeChildren } from './patchVNodeChildren';
import { replacePreviousElement } from './replacePreviousElement';
import { prepatchHooks, updateHooks, postpatchHooks } from './hooks';

export function patchVNode(
  formerVNode: VNode,
  vNode: VNode,
  moduleCallbacks: ModuleCallbacks,
  insertedVNodeQueue: Array<ElementVNode>): void
{
  prepatchHooks(formerVNode, vNode, moduleCallbacks);

  vNode = updateElement(formerVNode, vNode);

  if (formerVNode === vNode) return;

  if (!vNodesAreEqual(formerVNode, vNode))
    return replacePreviousElement(formerVNode, vNode, moduleCallbacks, insertedVNodeQueue);

  updateHooks(formerVNode, vNode, moduleCallbacks);

  if (!vNode.text)
    patchVNodeChildren(formerVNode, vNode, moduleCallbacks, insertedVNodeQueue);
  else if (formerVNode.text !== (vNode as TextVNode).text)
    (vNode.element as Element).textContent = vNode.text;

  postpatchHooks(formerVNode, vNode, moduleCallbacks);
}

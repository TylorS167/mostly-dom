import { ElementVNode } from '../';
import { ModuleCallbacks } from '../modules/ModuleCallbacks';
import { vNodesAreEqual } from '../helpers';
import { patchVNode } from '../patchVNode';
import { createElement } from '../createElement';
import { addVNodes } from '../addVNodes';
import { removeVNodes } from '../removeVNodes';

export function updateChildren(
  parentElement: Element,
  formerChildren: Array<ElementVNode>,
  children: Array<ElementVNode>,
  moduleCallbacks: ModuleCallbacks,
  insertedVNodeQueue: Array<ElementVNode>)
{
  // indexes
  let formerStartIndex = 0;
  let startIndex = 0;
  let formerEndIndex = formerChildren.length - 1;
  let endIndex = children.length - 1;

  // VNodes
  let formerStartVNode = formerChildren[formerStartIndex];
  let startVNode = children[startIndex];
  let formerEndVNode = formerChildren[formerEndIndex];
  let endVNode = children[endIndex];

  // an object mapping keys to indexes in formerChildren array
  let mappedKeyToFormerIndex: any;

  while (formerStartIndex <= formerEndIndex && startIndex <= endIndex) {
    if (!formerStartVNode)
      formerStartVNode = formerChildren[++formerStartIndex];

    else if (!formerEndVNode)
      formerEndVNode = formerChildren[--formerEndIndex];

    else if (vNodesAreEqual(formerStartVNode, startVNode)) {
      patchVNode(formerStartVNode, startVNode, moduleCallbacks, insertedVNodeQueue);
      formerStartVNode = formerChildren[++formerStartIndex];
      startVNode = children[++startIndex];
    }

    else if (vNodesAreEqual(formerEndVNode, endVNode)) {
      patchVNode(formerEndVNode, endVNode, moduleCallbacks, insertedVNodeQueue);
      formerEndVNode = formerChildren[--formerEndIndex];
      endVNode = children[--endIndex];
    }

    else if (vNodesAreEqual(formerStartVNode, endVNode)) {
      patchVNode(formerStartVNode, endVNode, moduleCallbacks, insertedVNodeQueue);
      parentElement.insertBefore(formerStartVNode.element, formerEndVNode.element.nextSibling);
      formerStartVNode = formerChildren[++formerStartIndex];
      endVNode = children[--endIndex];
    }

    else if (vNodesAreEqual(formerEndVNode, startVNode)) {
      patchVNode(formerEndVNode, startVNode, moduleCallbacks, insertedVNodeQueue);
      parentElement.insertBefore(formerEndVNode.element, formerStartVNode.element);
      formerEndVNode = formerChildren[--formerEndIndex];
      startVNode = children[++startIndex];
    }

    else {
      if (!mappedKeyToFormerIndex) mappedKeyToFormerIndex =
        mapKeyToFormerIndex(formerChildren, formerStartIndex, formerEndIndex);

      const formerIndexKey = mappedKeyToFormerIndex[startVNode.key as string | number];

      if (!formerIndexKey) { // new element
        const element = createElement(startVNode, moduleCallbacks, insertedVNodeQueue).element;
        parentElement.insertBefore(element, formerStartVNode.element);
        startVNode = children[++startIndex];
      }

      else {
        const reorderableVNode = formerChildren[formerIndexKey];

        patchVNode(reorderableVNode, startVNode, moduleCallbacks, insertedVNodeQueue);

        // WARNING: hack for performance optimization
        formerChildren[formerIndexKey] = void 0 as any;

        parentElement.insertBefore(reorderableVNode.element, formerStartVNode.element);

        startVNode = children[++startIndex];
      }

    }
  }

  if (formerStartIndex > formerEndIndex) {
    const referenceNode = children[endIndex + 1] ? children[endIndex + 1].element : null;
    addVNodes(
      parentElement, referenceNode,
      children, startIndex, endIndex,
      moduleCallbacks, insertedVNodeQueue,
    );
  }
  else if (startIndex > endIndex)
    removeVNodes(parentElement, formerChildren, formerStartIndex, formerEndIndex, moduleCallbacks);
}

function mapKeyToFormerIndex(
  children: Array<ElementVNode>,
  startIndex: number,
  endIndex: number): any {
  let index: number = startIndex;
  let map: any = {};
  let key: any;

  for (; index <= endIndex; ++index) {
    key = children[index].key;

    if (key)
      map[key] = index;
  }

  return map;
}

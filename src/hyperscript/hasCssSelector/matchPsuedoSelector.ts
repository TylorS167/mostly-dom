import { VNode } from '../../';

const defaultParent = Object.freeze({ children: [] as VNode[] });

export function matchPsuedoSelector(cssSelector: string, vNode: VNode) {
  const parent = vNode.parent || defaultParent;
  const children = parent.children;

  if (cssSelector.indexOf(`:nth-child`) === 0)
    return matchNthChild(cssSelector.slice(11).split(')')[0], vNode);

  if (cssSelector.indexOf(`:contains`) === 0)
    return vNodeContainsText(cssSelector.slice(10).split(')')[0], vNode);

  switch (cssSelector) {
    case ':first-child': return children[0] === vNode;
    case ':last-child': return children[children.length - 1] === vNode;
    case ':empty': return !vNode.children || vNode.children.length === 0;
    case ':root': return isRoot(vNode);
    default: return false;
  };
}

function vNodeContainsText(text: string, vNode: VNode) {
  if (vNode.text) return text === vNode.text;

  const children = vNode.children;

  if (!children || children.length === 0) return false;

  for (let i = 0; i < children.length; ++i) {
    const child = children[i];

    if (child.text === text) return true;
  }

  return false;
}

function isRoot(vNode: VNode) {
  return !vNode.parent;
}

function matchNthChild(index: string, vNode: VNode) {
  const parent = vNode.parent || defaultParent;
  const children = parent.children;

  if (!children || children.length === 0) return false;

  if (index.indexOf('+') === -1 && !isNaN(parseInt(index)))
    return children[parseInt(index)] === vNode;

  const childIndex = children.indexOf(vNode);

  if (index === 'odd')
    return childIndex % 2 !== 0;

  if (index === 'even')
    return childIndex % 2 === 0;

  if (index.indexOf('+') > -1) {
    let [multipleString, offsetString] = index.split('+');
    const multiple = parseInt(multipleString.split('n')[0]);
    const offset = parseInt(offsetString);

    if (multiple === 0)
      return true;

    return childIndex !== 0 && childIndex % (multiple + offset) === 0;
  }

  return false;
}

function isNaN (x: number): x is number {
  return (x | 0) !== x;
}

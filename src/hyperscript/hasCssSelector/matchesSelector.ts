import { VNode } from '../../';
import { matchAttribute } from './matchAttribute';
import { matchPsuedoSelector } from './matchPsuedoSelector';
import { matchBasicCssSelector } from './matchBasicCssSelector';

const EMPTY: any = Object.freeze({});

export function matchesSelector(cssSelector: string, vNode: VNode) {
  cssSelector = cssSelector.trim();

  // if working with an ElementVNode return use native implementation
  if (vNode.element && (vNode.element as Element).matches)
    return (vNode.element as Element).matches(cssSelector);

  if (cssSelector[0] === '[' && cssSelector[cssSelector.length - 1] === ']')
    return matchAttribute(cssSelector.slice(1, -1), vNode.props.attrs || EMPTY);

  if (cssSelector.indexOf(':') > -1) {
    return matchPsuedoSelector(cssSelector, vNode);
  }

  if (cssSelector.indexOf(' ') > -1)
    throw new Error('Basic CSS selectors can not contain spaces');

  return matchBasicCssSelector(cssSelector, vNode);
}

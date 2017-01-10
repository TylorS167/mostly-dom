import { curry2, CurriedFunction2 } from '@most/prelude';
import { VNode } from '../types';
import { hasCssSelector } from './hasCssSelector';

export const querySelectorAll: QuerySelectorAll = curry2(
  function querySelectorAll(cssSelector: string, vNode: VNode): Array<VNode> {
    const matches: Array<VNode> = [];
    const scope = vNode.scope;

    const children: Array<VNode> = [vNode];

    while (children.length > 0) {
      const child = children.shift() as VNode;

      if (child.scope !== scope)
        continue;

      if (hasCssSelector(cssSelector, child))
        matches.push(child);

      if (!child.children) continue;

      children.push(...child.children);
    }

    return matches;
  },
);

export interface QuerySelectorAll extends CurriedFunction2<string, VNode, Array<VNode>> {};

import { CurriedFunction2, curry2 } from '@most/prelude'

import { VNode } from '../types'
import { hasCssSelector } from './hasCssSelector'

export const querySelector: QuerySelector = curry2(
  function(cssSelector: string, vNode: VNode): VNode | null {
    const scope = vNode.scope

    const children: Array<VNode> = [ vNode ]

    while (children.length > 0) {
      const child = children.shift() as VNode

      if (child.scope !== scope)
        continue

      if (hasCssSelector(cssSelector, child))
        return child

      if (!child.children) continue

      children.push(...child.children)
    }

    return null
  },
)

export interface QuerySelector extends CurriedFunction2<string, VNode, VNode | null> {}

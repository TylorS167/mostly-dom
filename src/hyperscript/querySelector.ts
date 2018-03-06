import { VNode } from '../types'
import { hasCssSelector } from './hasCssSelector'

export const querySelector: QuerySelector = ((cssSelector: string, vNode?: VNode) => vNode
  ? _querySelector(cssSelector, vNode)
  : (_vNode: VNode) => _querySelector(cssSelector, _vNode)) as QuerySelector

function _querySelector(cssSelector: string, vNode: VNode): VNode | null {
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
}

export interface QuerySelector {
  (cssSelector: string, vNode: VNode): VNode | null
  (cssSelector: string): (vNode: VNode) => VNode | null
}

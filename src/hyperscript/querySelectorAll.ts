import { VNode } from '../types'
import { hasCssSelector } from './hasCssSelector'

export const querySelectorAll: QuerySelectorAll = function(cssSelector: string, vNode: VNode) {
  if (!vNode) return (_vNode: VNode) => _querySelectorAll(cssSelector, vNode)

  return _querySelectorAll(cssSelector, vNode)
} as QuerySelectorAll

function _querySelectorAll(cssSelector: string, vNode: VNode): Array<VNode> {
  const matches: Array<VNode> = []
  const scope = vNode.scope

  const children: Array<VNode> = [ vNode ]

  while (children.length > 0) {
    const child = children.shift() as VNode

    if (child.scope !== scope) continue

    if (hasCssSelector(cssSelector, child)) matches.push(child)

    if (!child.children) continue

    children.push(...child.children)
  }

  return matches
}

export interface QuerySelectorAll {
  (cssSelector: string, vNode: VNode): Array<VNode>
  (cssSelector: string): (vNode: VNode) => Array<VNode>
}

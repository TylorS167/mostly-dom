import { VNode } from '../../'
import { matchesSelector } from './matchesSelector'

// tslint:disable-next-line:cyclomatic-complexity
export function hasCssSelector(cssSelector: string, vNode: VNode): boolean {
  cssSelector = cssSelector.trim()

  if (cssSelector === '*')
    return true

  if (cssSelector.indexOf(',') > -1) {
    const cssSelectors = cssSelector.split(',').map((str) => str.trim())

    for (let i = 0; i < cssSelectors.length; ++i)
      if (hasCssSelector(cssSelectors[i], vNode))
        return true

    return false
  } else if (cssSelector.indexOf('>') > -1) {
    const [ parentSelector, childSelector ] = splitByLastIndex(cssSelector, '>')

    if (!vNode.parent)
      return false

    return hasCssSelector(parentSelector, vNode.parent) &&
      hasCssSelector(childSelector, vNode)
  } else if (cssSelector.indexOf(' + ') > -1) {
    const [ siblingSelector, selector ] = splitByLastIndex(cssSelector, '+')

    const parent = vNode.parent

    if (!parent || !hasCssSelector(selector, vNode))
      return false

    const children = parent.children

    if (!children) return false

    const index = children.indexOf(vNode)

    if (index === 0 || !hasCssSelector(siblingSelector, children[index - 1]))
      return false

    return true
  } else if (cssSelector.indexOf(' ~ ') > -1) {
    const [ siblingSelector, selector ] = splitByLastIndex(cssSelector, '~')

    const parent = vNode.parent

    if (!parent || !hasCssSelector(selector, vNode))
      return false

    const children = parent.children

    if (!children) return false

    const index = children.indexOf(vNode)

    if (index === 0)
      return false

    for (let i = 0; i < index; ++i)
      if (hasCssSelector(siblingSelector, children[i]))
        return true

    return false
  } else if (cssSelector.indexOf(' ') > -1) {
    const cssSelectors: Array<string> =
      cssSelector.split(' ').filter(Boolean).map((str) => str.trim())

    let i = cssSelectors.length - 1

    if (!hasCssSelector(cssSelectors[i], vNode))
      return false

    while (--i >= 0) {
      const parentMatches =
        traverseParentVNodes((parent) => hasCssSelector(cssSelectors[i], parent), vNode)

      if (!parentMatches)
        return false
    }

    return true
  }

  return matchesSelector(cssSelector, vNode)
}

function splitByLastIndex(cssSelector: string, token: string): [string, string] {
  const index = cssSelector.lastIndexOf(token)

  return [
    cssSelector.substring(0, index).trim(),
    cssSelector.substring(index + 1).trim(),
  ]
}

function traverseParentVNodes(
  predicate: (vNode: VNode) => boolean,
  vNode: VNode): boolean
{
  const parent = vNode.parent

  if (!parent) return false

  if (predicate(parent))
    return true

  return traverseParentVNodes(predicate, parent)
}

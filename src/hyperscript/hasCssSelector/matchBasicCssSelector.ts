import { VNode } from '../../'
import { parseSelector } from '../parseSelector'

export function matchBasicCssSelector(cssSelector: string, vNode: VNode) {
  const hasTagName = cssSelector[0] !== '#' && cssSelector[0] !== '.'

  const { tagName, className, id } =
    hasTagName ?
      parseSelector(cssSelector) :
      parseSelector(vNode.tagName + cssSelector)

  if (tagName !== vNode.tagName)
    return false

  const parsedClassNames = className && className.split(' ') || []

  const vNodeClassNames = vNode.className && vNode.className.split(' ') || []

  const { props: { className: propsClassName = '', id: propsId } } = vNode

  vNodeClassNames.push(...propsClassName.split(' '))

  for (let i = 0; i < parsedClassNames.length; ++i) {
    const parsedClassName = parsedClassNames[i]

    if (vNodeClassNames.indexOf(parsedClassName) === -1)
      return false
  }

  return propsId ? id === propsId : id === vNode.id
}

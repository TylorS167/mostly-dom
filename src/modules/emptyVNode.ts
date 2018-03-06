import { ElementVNode, MostlyVNode, VNodeProps } from '../'

export const emptyVNode: ElementVNode<Element, VNodeProps<Element>> = new MostlyVNode(
  undefined,
  {},
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined
) as ElementVNode<Element, VNodeProps<Element>>

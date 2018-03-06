import { ElementVNode, MostlyVNode, VNodeProps } from '../'

import { VOID } from '../helpers'

export const emptyVNode: ElementVNode<Element, VNodeProps<Element>> = new MostlyVNode(
  VOID,
  {},
  VOID,
  VOID,
  VOID,
  VOID,
  VOID,
  VOID,
) as any as ElementVNode<Element, VNodeProps<Element>>

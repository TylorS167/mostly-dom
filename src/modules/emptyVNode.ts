import { MostlyVNode, ElementVNode } from '../'
import { VOID } from '../helpers'

export const emptyVNode =
  new MostlyVNode(VOID, VOID, VOID, {}, VOID, VOID, VOID, VOID, VOID, VOID) as ElementVNode

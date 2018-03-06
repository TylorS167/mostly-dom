import { ElementVNode, EventHandler, Module, VNodeEvent } from '../'

import { BaseModule } from './BaseModule'
import { emptyVNode } from './emptyVNode'

export function createEventsModule(): Module {
  return new EventsModule()
}

class EventsModule extends BaseModule {
  public create(vNode: ElementVNode) {
    updateEventHandlers(emptyVNode, vNode)
  }

  public update(formerVNode: ElementVNode, vNode: ElementVNode) {
    updateEventHandlers(formerVNode, vNode)
  }

  public destroy(vNode: ElementVNode) {
    updateEventHandlers(vNode, emptyVNode)
  }
}

function updateEventHandlers<T extends Element>(
  formerVNode: ElementVNode<T>,
  vNode: ElementVNode<T>
)
{
  const {
    element: formerElement,
    props: {
      on: formerOn = {},
      onCapture: formerOnCapture = {},
      listener: formerListener = createListener(vNode)
    }
  } = formerVNode

  const { element, props: { on = {}, onCapture = {} } } = vNode

  if (formerOn === on) return

  const listener = (vNode.props.listener = formerListener)

  for (const name in formerOn)
    if (!(on as any)[name]) formerElement.removeEventListener(name, listener, false)

  for (const name in on)
    if (!(formerOn as any)[name]) element.addEventListener(name, listener, false)

  for (const name in formerOnCapture)
    if (!(onCapture as any)[name]) formerElement.removeEventListener(name, listener, true)

  for (const name in onCapture)
    if (!(formerOnCapture as any)[name]) element.addEventListener(name, listener, true)
}

function createListener<T extends Element>(vNode: ElementVNode<T>): EventListener {
  return function(event: Event) {
    handleEvent<T>(event, vNode)
  }
}

function handleEvent<T extends Element>(event: Event, vNode: ElementVNode<T>) {
  const { type, eventPhase, bubbles } = event
  const { props: { on = {}, onCapture = {} } } = vNode
  const capturingHandler = onCapture[type] as EventHandler<T, Event>
  const bubblingHandler = (on as any)[type] as EventHandler<T, Event>

  if (eventPhase === Event.CAPTURING_PHASE && capturingHandler)
    return capturingHandler(event as VNodeEvent<T, Event>, vNode)

  if (eventPhase === Event.BUBBLING_PHASE && bubblingHandler)
    return bubblingHandler(event as VNodeEvent<T, Event>, vNode)

  // Target Phase
  if (capturingHandler) capturingHandler(event as VNodeEvent<T, Event>, vNode)
  if (bubblingHandler && bubbles) bubblingHandler(event as VNodeEvent<T, Event>, vNode)
}

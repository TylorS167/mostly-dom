import { ElementVNode, EventHandler, Module } from '../'

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
    props: { on: formerOn = {}, listener: formerListener = createListener(vNode) }
  } = formerVNode

  const { element, props: { on = {} } } = vNode

  if (formerOn === on) return

  const listener = vNode.props.listener = formerListener

  for (const name in formerOn)
    if (!(on as any)[name]) formerElement.removeEventListener(name, listener, false)

  for (const name in on)
    if (!(formerOn as any)[name]) element.addEventListener(name, listener, false)
}

function createListener<T extends Element>(vNode: ElementVNode<T>): EventListener {
  return function(event: Event) {
    handleEvent<T>(event, vNode)
  }
}

function handleEvent<T extends Element>(event: Event, vNode: ElementVNode<T>) {
  const { type } = event
  const { props: { on = {} } } = vNode
  const handler = (on as any)[type] as EventHandler<T, Event>

  if (handler) handler(event as any, vNode)
}

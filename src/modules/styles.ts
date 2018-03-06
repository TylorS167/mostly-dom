import { ElementVNode, Module } from '../'

import { BaseModule } from './BaseModule'
import { emptyVNode } from './emptyVNode'

export function createStylesModule(): Module {
  return new StylesModule()
}

class StylesModule extends BaseModule {
  public pre() {
    setRequestAnimationFrame()
  }

  public create(vNode: ElementVNode) {
    updateStyle(emptyVNode, vNode)
  }

  public update(formerVNode: ElementVNode, vNode: ElementVNode) {
    updateStyle(formerVNode, vNode)
  }

  public remove(vNode: ElementVNode, removeElement: Function) {
    applyRemoveStyle(vNode, removeElement)
  }

  public destroy(vNode: ElementVNode) {
    applyDestroyStyle(vNode)
  }
}

let requestAnimationFrame: any

function setRequestAnimationFrame() {
  if (!requestAnimationFrame)
    requestAnimationFrame =
      (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout
}

function nextFrame(fn: any) {
  requestAnimationFrame(function() {
    requestAnimationFrame(fn)
  })
}

function setValueOnNextFrame(obj: any, prop: string, value: any) {
  nextFrame(function() {
    obj[prop] = value
  })
}

function updateStyle(formerVNode: ElementVNode, vNode: ElementVNode): void {
  let styleValue: any
  const element: any = vNode.element
  let formerStyle: any = formerVNode.props.style
  let style: any = vNode.props.style

  if (!formerStyle && !style) return

  formerStyle = formerStyle || {}
  style = style || {}

  const formerHasDelayedProperty: boolean =
    !!formerStyle.delayed

  // tslint:disable-next-line:prefer-const
  for (let key in formerStyle)
    if (!style[key])
      element.style[key] = ''

  for (const key in style) {
    styleValue = style[key]

    if (key === 'delayed') {
      // tslint:disable-next-line:prefer-const
      for (let delayKey in style.delayed) {
        styleValue = style.delayed[delayKey]

        if (!formerHasDelayedProperty || styleValue !== formerStyle.delayed[delayKey])
          setValueOnNextFrame((element as any).style, delayKey, styleValue)
      }
    } else if (key !== 'remove') {
      element.style[key] = styleValue
    }
  }
}

function applyDestroyStyle(vNode: ElementVNode) {
  const element: any = vNode.element
  const style: any = vNode.props.style

  if (!style || !style.destroy) return

  const destroy: any = style.destroy

  for (const key in destroy)
    element.style[key] = destroy[key]
}

function applyRemoveStyle(vNode: ElementVNode, callback: Function) {
  const style: any = vNode.props.style

  if (!style || !style.remove)
    return callback()

  const element: any = vNode.element
  let index = 0
  let computedStyle: any
  let listenerCount = 0
  const appliedStyles: Array<string> = []

  for (const key in style) {
    appliedStyles.push(key)
    element.style[key] = style[key]
  }

  computedStyle = getComputedStyle(element)

  const transitionProperties: Array<string> =
    computedStyle['transition-property'].split(', ')

  for (; index < transitionProperties.length; ++index)
    if (appliedStyles.indexOf(transitionProperties[index]) !== -1)
      listenerCount++

  element.addEventListener('transitionend', function(event: TransitionEvent) {
    if (event.target === element)
      --listenerCount

    if (listenerCount === 0)
      callback()
  })
}

export {
  setRequestAnimationFrame as pre,
  updateStyle as create,
  updateStyle as update,
  applyDestroyStyle as destroy,
  applyRemoveStyle as remove,
}

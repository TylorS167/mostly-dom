import { ElementVNode } from '../';
import { BaseModule } from './BaseModule';
import { emptyVNode } from './emptyVNode';

export class StylesModule extends BaseModule {
  public pre () {
    setRequestAnimationFrame();
  }

  public create(vNode: ElementVNode) {
    updateStyle(emptyVNode, vNode);
  }

  public update (formerVNode: ElementVNode, vNode: ElementVNode) {
    updateStyle(formerVNode, vNode);
  }

  public remove(vNode: ElementVNode, removeElement: Function) {
    applyRemoveStyle(vNode, removeElement);
  }

  public destroy(vNode: ElementVNode) {
    applyDestroyStyle(vNode);
  }
}

let requestAnimationFrame: any;

function setRequestAnimationFrame() {
  if (!requestAnimationFrame)
    requestAnimationFrame =
      (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
}

function nextFrame(fn: any) {
  requestAnimationFrame(function () {
    requestAnimationFrame(fn);
  });
};

function setValueOnNextFrame(obj: any, prop: string, value: any) {
  nextFrame(function () {
    obj[prop] = value;
  });
}

function updateStyle(formerVNode: ElementVNode, vNode: ElementVNode): void {
  let styleValue: any;
  let key: string;
  let element: any = vNode.element;
  let formerStyle: any = formerVNode.props.style;
  let style: any = vNode.props.style;

  if (!formerStyle && !style) return;

  formerStyle = formerStyle || {};
  style = style || {};

  let formerHasDelayedProperty: boolean =
    !!formerStyle.delayed;

  for (key in formerStyle)
    if (!style[key])
      element.style[key] = '';

  for (key in style) {
    styleValue = style[key];

    if (key === 'delayed') {
      for (key in style.delayed) {
        styleValue = style.delayed[key];

        if (!formerHasDelayedProperty || styleValue !== formerStyle.delayed[key])
          setValueOnNextFrame((element as any).style, key, styleValue);
      }
    } else if (key !== 'remove' && styleValue !== formerStyle[key]) {
      element.style[key] = styleValue;
    }
  }
}

function applyDestroyStyle(vNode: ElementVNode) {
  let key: string;
  let element: any = vNode.element;
  let style: any = vNode.props.style;

  if (!style || !style.destroy) return;

  const destroy: any = style.destroy;

  for (key in destroy)
    element.style[key] = destroy[key];
}

function applyRemoveStyle(vNode: ElementVNode, callback: Function) {
  const style: any = vNode.props.style;

  if (!style || !style.remove)
    return callback();

  let key: string;
  let element: any = vNode.element;
  let index = 0;
  let computedStyle: any;
  let listenerCount = 0;
  let appliedStyles: Array<string> = [];

  for (key in style) {
    appliedStyles.push(key);
    element.style[key] = style[key];
  }

  computedStyle = getComputedStyle(element);

  const transitionProperties: Array<string> =
    computedStyle['transition-property'].split(', ');

  for (; index < transitionProperties.length; ++index)
    if (appliedStyles.indexOf(transitionProperties[index]) !== -1)
      listenerCount++;

  element.addEventListener('transitionend', function (event: TransitionEvent) {
    if (event.target === element)
      --listenerCount;

    if (listenerCount === 0)
      callback();
  });
}

export {
  setRequestAnimationFrame as pre,
  updateStyle as create,
  updateStyle as update,
  applyDestroyStyle as destroy,
  applyRemoveStyle as remove,
}

import { BaseModule } from './BaseModule';
import { ElementVNode } from '../';

export class FocusModule extends BaseModule {
  public insert(vNode: ElementVNode) {
    setFocus(vNode);
  }

  public update(_: ElementVNode, vNode: ElementVNode) {
    setFocus(vNode);
  }
}

function setFocus(vNode: ElementVNode) {
  const { props: { focus = false }, element } = vNode;

  if (focus && typeof (element as HTMLElement).focus === 'function') {
    (element as HTMLElement).focus();

    if (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'text')
      (element as HTMLInputElement).selectionStart = (element as HTMLInputElement).value.length;
  }
}

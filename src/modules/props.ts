import { BaseModule } from './BaseModule';
import { ElementVNode } from '../';
import { emptyVNode } from './emptyVNode';

const PROPERTIES_TO_SKIP: Array<string> =
  [
    'class',
    'focus',
    'style',
    'attrs',
    'key',
    'module',
    'init',
    'create',
    'update',
    'insert',
    'remove',
    'destroy',
    'prepatch',
    'postpatch',
  ];

export class PropsModule extends BaseModule {
  public create (vNode: ElementVNode) {
    updateProps(emptyVNode as ElementVNode, vNode);
  }

  public update (formerVNode: ElementVNode, vNode: ElementVNode) {
    updateProps(formerVNode, vNode);
  }
}

function updateProps(formerVNode: ElementVNode, vNode: ElementVNode): void {
  let key: string;
  let element: any = vNode.element;
  let formerProps: any = formerVNode.props;
  let props: any = vNode.props;

  if (!formerProps && !props) return;

  formerProps = formerProps || {};
  props = props || {};

  for (key in formerProps)
    if (!props[key])
      delete element[key];

  for (key in props) {
    const property = props[key];
    const formerProperty = formerProps[key];

    if (PROPERTIES_TO_SKIP.indexOf(property) > -1) return;

    const shouldSetProperty: boolean =
      formerProperty !== property &&
      (key !== 'value' || element[key] !== property);

    if (shouldSetProperty)
      element[key] = property;
  }
}

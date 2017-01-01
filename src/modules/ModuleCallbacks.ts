import { Module, VNode, ElementVNode } from '../';

export class ModuleCallbacks implements Module {
  private _modules: Array<Module>;
  private _moduleCount: number;

  constructor (modules: Array<Module>) {
    this._modules = modules;
    this._moduleCount = modules.length;
  }

  public createRemoveElementFn (element: Element) {
    let listeners = this._moduleCount + 1;

    return function removeElement() {
      if (--listeners === 0) {
        const parent = element.parentNode as Node;
        parent.removeChild(element);
      }
    };
  }

  // module hooks
  public pre(vNode: VNode) {
    const modules = this._modules;
    const moduleCount = this._moduleCount;

    for (let i = 0; i < moduleCount; ++i)
      modules[i].pre(vNode);
  }

  public post(vNode: ElementVNode) {
    const modules = this._modules;
    const moduleCount = this._moduleCount;

    for (let i = 0; i < moduleCount; ++i)
      modules[i].post(vNode);
  }

  public init(vNode: VNode) {
    const modules = this._modules;
    const moduleCount = this._moduleCount;

    for (let i = 0; i < moduleCount; ++i)
      modules[i].init(vNode);
  }

  public create(vNode: ElementVNode) {
    const modules = this._modules;
    const moduleCount = this._moduleCount;

    for (let i = 0; i < moduleCount; ++i)
      modules[i].create(vNode);
  }

  public update(formerVNode: ElementVNode, vNode: ElementVNode) {
    const modules = this._modules;
    const moduleCount = this._moduleCount;

    for (let i = 0; i < moduleCount; ++i)
      modules[i].update(formerVNode, vNode);
  }

  public remove (vNode: ElementVNode, removeElement: Function) {
    const modules = this._modules;
    const moduleCount = this._moduleCount;

    for (let i = 0; i < moduleCount; ++i)
      modules[i].remove(vNode, removeElement);
  }

  public destroy(vNode: ElementVNode) {
    const modules = this._modules;
    const moduleCount = this._moduleCount;

    for (let i = 0; i < moduleCount; ++i)
      modules[i].destroy(vNode);
  }

  public prepatch (formerVNode: VNode, vNode: VNode) {
    const modules = this._modules;
    const moduleCount = this._moduleCount;

    for (let i = 0; i < moduleCount; ++i)
      modules[i].prepatch(formerVNode, vNode);
  }

  public postpatch (formerVNode: VNode, vNode: VNode) {
    const modules = this._modules;
    const moduleCount = this._moduleCount;

    for (let i = 0; i < moduleCount; ++i)
      modules[i].postpatch(formerVNode, vNode);
  }
}

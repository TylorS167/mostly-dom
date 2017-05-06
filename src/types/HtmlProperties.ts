// tslint:disable:max-file-line-count
import * as hooks from './hooks'

import { VNodeStyle } from './VirtualNode'

export interface NodeProperties {
  nodeValue?: string | null,
  textContent?: string | null,
}

export interface ElementProperties extends NodeProperties {
  className?: string,
  id?: string,
  innerHTML?: string,
  scrollLeft?: number,
  scrollTop?: number,
  slot?: string,
}

export interface HTMLElementProperties extends ElementProperties {
  accessKey?: string,
  contentEditable?: string,
  dir?: string,
  draggable?: boolean,
  hidden?: boolean,
  hideFocus?: boolean,
  innerText?: string,
  lang?: string,
  outerText?: string,
  spellcheck?: boolean,
  tabIndex?: boolean,
  title?: string,
}

export type VNodeProperties<T extends Element> = HTMLElementProperties &
  {
    // key for dom diffing
    key?: string | number,

    // classes
    class?: { [className: string]: Boolean },

    // attributes for setAttribute()
    attrs?: { [attributeName: string]: any },

    // styling
    style?: VNodeStyle,

    // declarative focusing
    focus?: boolean,

    scope?: string,

    // hooks
    init?: hooks.InitHook
    create?: hooks.CreateHook<T>,
    update?: hooks.UpdateHook<T>,
    insert?: hooks.InsertHook<T>,
    remove?: hooks.RemoveHook<T>,
    destroy?: hooks.DestroyHook<T>,
    prepatch?: hooks.PrepatchHook<T>,
    postpatch?: hooks.PostpatchHook<T>,

    // TODO: maybe find a better name
    // this is a namespace for custom modules
    module?: any,
  }

export interface HTMLAnchorElementProperties extends VNodeProperties<HTMLAnchorElement> {
  Methods?: string,
  charset?: string,
  coords?: string,
  download?: string,
  hash?: string,
  host?: string,
  hostname?: string,
  href?: string,
  hreflang?: string,
  name?: string,
  pathname?: string,
  port?: string,
  protocol?: string,
  rel?: string,
  rev?: string,
  search?: string,
  shape?: string,
  target?: string,
  text?: string,
  type?: string,
  urn?: string,
}

export interface HTMLAppletElementProperties extends VNodeProperties<HTMLAppletElement> {
  align?: string,
  alt?: string,
  altHtml?: string,
  archive?: string,
  border?: string,
  code?: string,
  codeBase?: string,
  codeType?: string,
  data?: string,
  declare?: boolean,
  height?: string,
  hspace?: number,
  name?: string,
  object?: string | null,
  standby?: string,
  type?: string,
  vspace?: number,
  width?: number,
}

export interface HTMLAreaElementProperties extends VNodeProperties<HTMLAreaElement> {
  alt?: string,
  coords?: string,
  download?: string,
  hash?: string,
  host?: string,
  hostname?: string,
  href?: string,
  noHref?: string,
  pathname?: string,
  port?: string,
  protocol?: string,
  rel?: string,
  search?: string,
  shape?: string,
  target?: string,
}

export interface HTMLAudioElementProperties extends VNodeProperties<HTMLAudioElement> { }

export interface HTMLBRElementProperties extends VNodeProperties<HTMLBRElement> {
  clear?: string,
}

export interface HTMLBaseElementProperties extends VNodeProperties<HTMLBaseElement> {
  href?: string,
  target?: string,
}

export interface HTMLBaseFontElementProperties extends VNodeProperties<HTMLBaseFontElement> {
  face?: string,
  size?: number,
}

export interface HTMLBodyElementProperties extends VNodeProperties<HTMLBodyElement> {
  aLink?: any,
  background?: string,
  bgColor?: any,
  bgProperties?: string,
  link?: any,
  noWrap?: boolean,
  text?: any,
  vLink?: any,
}

export interface HTMLButtonElementProperties extends VNodeProperties<HTMLButtonElement> {
  autofocus?: boolean,
  disabled?: boolean,
  formAction?: string,
  formEnctype?: string,
  formMethod?: string,
  formNoValidate?: string,
  formTarget?: string,
  name?: string,
  status?: any,
  type?: string,
  value?: string,
}

export interface HTMLCanvasElementProperties extends VNodeProperties<HTMLCanvasElement> {
  height?: number,
  width?: number,
}

export interface HTMLDListElementProperties extends VNodeProperties<HTMLDListElement> {
  compact?: boolean,
}

export interface HTMLDataElementProperties extends VNodeProperties<HTMLDataElement> {
  value?: string,
}

export interface HTMLDataListElementProperties extends VNodeProperties<HTMLDataListElement> {
  options?: HTMLCollectionOf<HTMLOptionElement>,
}

export interface HTMLDirectoryElementProperties extends VNodeProperties<HTMLDirectoryElement> {
  compact?: boolean,
}

export interface HTMLDivElementProperties extends VNodeProperties<HTMLDivElement> {
  align?: string,
  noWrap?: boolean,
}

export interface HTMLEmbedElementProperties extends VNodeProperties<HTMLEmbedElement> {
  height?: string,
  hidden?: any,
  msPlayToDisabled?: boolean,
  msPlayToPreferredSourceUri?: string,
  msPlayToPrimary?: boolean,
  name?: string,
  src?: string,
  units?: string,
  width?: string,
}

export interface HTMLFieldSetElementProperties extends VNodeProperties<HTMLFieldSetElement> {
  align?: string,
  disabled?: boolean,
  name?: string,
}

export interface HTMLFontElementProperties extends VNodeProperties<HTMLFontElement> {
  face?: string,
}

export interface HTMLFormElementProperties extends VNodeProperties<HTMLFormElement> {
  acceptCharset?: string,
  action?: string,
  autocomplete?: string,
  encoding?: string,
  enctype?: string,
  method?: string,
  name?: string,
  noValidate?: boolean,
  target?: string,
}

export interface HTMLFrameElementProperties extends VNodeProperties<HTMLFrameElement> {
  border?: string,
  borderColor?: any,
  frameBorder?: string,
  frameSpacing?: any,
  height?: string | number,
  longDesc?: string,
  marginHeight?: string,
  marginWidth?: string,
  name?: string,
  noResize?: boolean,
  scrolling?: string,
  src?: string,
  width?: string | number,
}

export interface HTMLFrameSetElementProperties extends VNodeProperties<HTMLFrameSetElement> {
  border?: string,
  borderColor?: string,
  cols?: string,
  frameBorder?: string,
  frameSpacing?: any,
  name?: string,
  rows?: string,
}

export interface HTMLHRElementProperties extends VNodeProperties<HTMLHRElement> {
  align?: string,
  noShade?: boolean,
  width?: number,
}

export interface HTMLHeadElementProperties extends VNodeProperties<HTMLHeadElement> {
  profile?: string,
}

export interface HTMLHeadingElementProperties extends VNodeProperties<HTMLHeadingElement> {
  align?: string,
}

export interface HTMLHtmlElementProperties extends VNodeProperties<HTMLHtmlElement> {
  version?: string,
}

export interface HTMLIFrameElementProperties extends VNodeProperties<HTMLIFrameElement> {
  align?: string,
  allowFullscreen?: boolean,
  allowPaymentRequest?: boolean,
  border?: string,
  frameBorder?: string,
  frameSpacing?: any,
  height?: string,
  hspace?: number,
  longDesc?: string,
  marginHeight?: string,
  marginWidth?: string,
  name?: string,
  noResize?: boolean,
  scrolling?: string,
  src?: string,
  vspace?: number,
  width?: string,
}

export interface HTMLImageElementProperties extends VNodeProperties<HTMLImageElement> {
  align?: string,
  alt?: string,
  border?: string,
  crossOrigin?: string | null,
  height?: number,
  hspace?: number,
  isMap?: boolean,
  longDesc?: string,
  lowsrc?: string,
  msPlayToDisabled?: boolean,
  msPlayToPreferredSourceUri?: string,
  msPlayToPrimary?: boolean,
  name?: string,
  sizes?: string,
  src?: string,
  srcset?: string,
  useMap?: string,
  vspace?: number,
  width?: number,
}

export interface HTMLInputElementProperties extends VNodeProperties<HTMLInputElement> {
  accept?: string,
  align?: string,
  alt?: string,
  autocomplete?: string,
  autofocus?: boolean,
  border?: string,
  checked?: boolean,
  defaultChecked?: boolean,
  defaultValue?: string,
  disabled?: boolean,
  formAction?: string,
  formEnctype?: string,
  formMethod?: string,
  formNoValidate?: string,
  formTarget?: string,
  height?: string,
  hspace?: number,
  indeterminate?: boolean,
  max?: string,
  maxLength?: number,
  min?: string,
  minLength?: number,
  multiple?: boolean,
  name?: string,
  pattern?: string,
  placeholder?: string,
  readOnly?: string,
  required?: boolean,
  selectionDirection?: string,
  selectionEnd?: number,
  selectionStart?: number,
  size?: number,
  src?: string,
  status?: boolean,
  step?: string,
  type?: string,
  useMap?: string,
  value?: string,
  valueAsDate?: Date,
  valueAsNumber?: number,
  vspace?: number,
  webkitdirectory?: boolean,
  width?: string,
}

export interface HTMLLIElementProperties extends VNodeProperties<HTMLLIElement> {
  type?: string,
  value?: number,
}

export interface HTMLLabelElementProperties extends VNodeProperties<HTMLLabelElement> {
  htmlFor?: string,
}

export interface HTMLLegendElementProperties extends VNodeProperties<HTMLLegendElement> {
  align?: string,
}

export interface HTMLLinkElementProperties extends VNodeProperties<HTMLLinkElement> {
  charset?: string,
  disabled?: boolean,
  href?: string,
  hreflang?: string,
  media?: string,
  rel?: string,
  rev?: string,
  target?: string
  type?: string,
  import?: Document,
  integrity?: string,
}

export interface HTMLMapElementProperties extends VNodeProperties<HTMLMapElement> {
  name?: string,
}

export interface HTMLMarqueeElementProperties extends VNodeProperties<HTMLMarqueeElement> {
  behavior?: string,
  bgColor?: any,
  direction?: string,
  height?: string,
  hspace?: number,
  loop?: number,
  scrollAmount?: number,
  scrollDelay?: number,
  trueSpeed?: boolean,
  vspace?: number,
  width?: string,
}

export interface HTMLMediaElementProperties extends VNodeProperties<HTMLMediaElement> {
  autoplay?: boolean,
  controls?: boolean,
  crossOrigin?: string | null,
  currentTime?: number,
  defaultMuted?: boolean,
  defaultPlaybackRate?: number,
  loop?: boolean,
  msAudioCategory?: string,
  msAudioDeviceType?: string,
  msPlayToDisabled?: boolean,
  msPlayToPreferredSourceUri?: string,
  msPlayToPrimary?: string,
  msRealTime?: boolean,
  muted?: boolean,
  playbackRate?: number,
  preload?: string,
  readyState?: number,
  src?: string,
  srcObject?: MediaStream | null,
  volume?: number,
}

export interface HTMLMenuElementProperties extends VNodeProperties<HTMLMenuElement> {
  compact?: boolean,
  type?: string,
}

export interface HTMLMetaElementProperties extends VNodeProperties<HTMLMetaElement> {
  charset?: string,
  content?: string,
  httpEquiv?: string,
  name?: string,
  scheme?: string,
  url?: string,
}

export interface HTMLMeterElementProperties extends VNodeProperties<HTMLMeterElement> {
  high?: number,
  low?: number,
  max?: number,
  min?: number,
  optimum?: number,
  value?: number,
}

export interface HTMLModElementProperties extends VNodeProperties<HTMLModElement> {
  cite?: string,
  dateTime?: string,
}

export interface HTMLOListElementProperteis extends VNodeProperties<HTMLOListElement> {
  compact?: boolean,
  start?: number,
  type?: string,
}

export interface HTMLObjectElementProperties extends VNodeProperties<HTMLObjectElement> {
  align?: string,
  alt?: string,
  altHtml?: string,
  archive?: string,
  border?: string,
  code?: string,
  codeBase?: string,
  codeType?: string,
  data?: string,
  declare?: boolean,
  height?: string,
  hspace?: number,
  msPlayToDisabled?: boolean,
  msPlayToPreferredSourceUri?: string,
  msPlayToPrimary?: boolean,
  name?: string,
  standby?: string,
  type?: string,
  useMap?: string,
  vspace?: number,
  width?: string,
}

export interface HTMLOptGroupElementProperties extends VNodeProperties<HTMLOptGroupElement> {
  defaultSelected?: boolean,
  disabled?: boolean,
  label?: string,
  selected?: boolean,
  value?: string,
}

export interface HTMLOptionElementProperties extends VNodeProperties<HTMLOptionElement> {
  defaultSelected?: boolean,
  disabled?: boolean,
  label?: string,
  selected?: boolean,
  text?: string,
  value?: string,
}

export interface HTMLOutputElementProperties extends VNodeProperties<HTMLOutputElement> {
  defaultValue?: string,
  name?: string,
  value?: string,
}

export interface HTMLParagraphElementProperties extends VNodeProperties<HTMLParagraphElement> {
  align?: string,
  clear?: string,
}

export interface HTMLParamElementProperties extends VNodeProperties<HTMLParamElement> {
  name?: string,
  type?: string,
  value?: string,
  valueType?: string,
}

export interface HTMLPictureElementProperties extends VNodeProperties<HTMLPictureElement> { }

export interface HTMLPreElementProperties extends VNodeProperties<HTMLPreElement> {
  width?: number,
}

export interface HTMLProgressElementProperties extends VNodeProperties<HTMLProgressElement> {
  max?: number,
  value?: number,
}

export interface HTMLQuoteElementProperties extends VNodeProperties<HTMLQuoteElement> {
  cite?: string,
}

export interface HTMLScriptElementProperties extends VNodeProperties<HTMLScriptElement> {
  async?: boolean,
  charset?: string,
  crossOrigin?: string | null,
  defer?: boolean,
  event?: string,
  htmlFor?: string,
  src?: string,
  text?: string,
  type?: string,
  integrity?: string,
}

export interface HTMLSelectElementProperties extends VNodeProperties<HTMLSelectElement> {
  autofocus?: boolean,
  disabled?: boolean,
  length?: number,
  multiple?: boolean,
  name?: string,
  required?: boolean,
  selectedIndex?: number,
  selectedOptions?: HTMLCollectionOf<HTMLOptionElement>,
  size?: number,
  value?: string,
}

export interface HTMLSourceElementProperties extends VNodeProperties<HTMLSourceElement> {
  media?: string,
  msKeySystem?: string,
  sizes?: string,
  src?: string,
  srcset?: string,
  type?: string,
}

export interface HTMLSpanElementProperties extends VNodeProperties<HTMLSpanElement> { }

export interface HTMLStyleElementProperties extends VNodeProperties<HTMLStyleElement> {
  disabled?: boolean,
  media?: string,
  type?: string,
}

export interface HTMLTableCaptionElementProperties extends
  VNodeProperties<HTMLTableCaptionElement> {
  align?: string,
  vAlign?: string,
}

export interface HTMLTableCellElementProperties extends VNodeProperties<HTMLTableCellElement> {
  abbr?: string,
  align?: string,
  axis?: string,
  bgColor?: any,
  colSpan?: number,
  headers?: string,
  height?: any,
  noWrap?: boolean,
  rowSpan?: number,
  scope?: string,
  width?: string,
}

export interface HTMLTableColElementProperties extends VNodeProperties<HTMLTableColElement> {
  align?: string,
  span?: number,
  width?: any,
}

export interface HTMLTableDataCellElementProperties
  extends VNodeProperties<HTMLTableDataCellElement> { }

export interface HTMLTableElementProperties extends VNodeProperties<HTMLTableElement> {
  align?: string,
  bgColor?: any,
  border?: string,
  borderColor?: any,
  caption?: HTMLTableCaptionElement,
  cellPadding?: string,
  cellSpacing?: string,
  cols?: number,
  frame?: string,
  height?: any,
  rows?: HTMLCollectionOf<HTMLTableRowElement>,
  rules?: string,
  summary?: string,
  tBodies?: HTMLCollectionOf<HTMLTableSectionElement>,
  tFoot?: HTMLTableSectionElement,
  tHead?: HTMLTableSectionElement,
  width?: string,
}

export interface HTMLTableHeaderCellElementProperties
  extends VNodeProperties<HTMLTableHeaderCellElement>
{
  scope?: string,
}

export interface HTMLTableRowElementProperties extends VNodeProperties<HTMLTableRowElement> {
  align?: string,
  bgColor?: any,
  cells?: HTMLCollectionOf<HTMLTableDataCellElement | HTMLTableHeaderCellElement>,
  height?: any,
}

export interface HTMLTableSectionElementProperties
  extends VNodeProperties<HTMLTableSectionElement>
{
  align?: string,
  rows?: HTMLCollectionOf<HTMLTableRowElement>,
}

export interface HTMLTemplateElementProperties extends VNodeProperties<HTMLTemplateElement> { }

export interface HTMLTextAreaElementProperties extends VNodeProperties<HTMLTextAreaElement> {
  autofocus?: boolean,
  cols?: number,
  defaultValue?: string,
  disabled?: boolean,
  maxLength?: number,
  minLength?: number,
  name?: string,
  placeholder?: string,
  readOnly?: boolean,
  required?: boolean,
  rows?: number,
  selectionEnd?: number,
  selectedStart?: number,
  status?: any,
  value?: string,
  wrap?: string,
}

export interface HTMLTimeElementProperties extends VNodeProperties<HTMLTimeElement> {
  dateTime?: string,
}

export interface HTMLTitleElementProperties extends VNodeProperties<HTMLTimeElement> {
  text?: string,
}

export interface HTMLTrackElementProperties extends VNodeProperties<HTMLTrackElement> {
  default?: boolean,
  kind?: string,
  label?: string,
  src?: string,
  srclang?: string,
}

export interface HTMLUListElementProperties extends VNodeProperties<HTMLUListElement> {
  compact?: boolean,
  type?: string,
}

export interface HTMLUnknownElementProperties extends VNodeProperties<HTMLUnknownElement> { }

export interface HTMLVideoElementProperties extends VNodeProperties<HTMLVideoElement> {
  height?: number,
  msHorizontalMirror?: boolean,
  msStereo3DPackingMode?: string,
  msStereo3DRenderMode?: string,
  msZoom?: boolean,
  poster?: string,
  width?: number,
}

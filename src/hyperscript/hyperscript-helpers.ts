import { ElementEvents, HtmlTagNames, VNode, VNodeEvents, VNodeProps } from '../'
import {
  HTMLAnchorElementProperties,
  HTMLAppletElementProperties,
  HTMLAreaElementProperties,
  HTMLAudioElementProperties,
  HTMLBRElementProperties,
  HTMLBaseElementProperties,
  HTMLBaseFontElementProperties,
  HTMLBodyElementProperties,
  HTMLButtonElementProperties,
  HTMLCanvasElementProperties,
  HTMLDListElementProperties,
  HTMLDataElementProperties,
  HTMLDataListElementProperties,
  HTMLDirectoryElementProperties,
  HTMLDivElementProperties,
  HTMLEmbedElementProperties,
  HTMLFieldSetElementProperties,
  HTMLFontElementProperties,
  HTMLFormElementProperties,
  HTMLFrameElementProperties,
  HTMLFrameSetElementProperties,
  HTMLHRElementProperties,
  HTMLHeadElementProperties,
  HTMLHeadingElementProperties,
  HTMLHtmlElementProperties,
  HTMLIFrameElementProperties,
  HTMLImageElementProperties,
  HTMLInputElementProperties,
  HTMLLIElementProperties,
  HTMLLabelElementProperties,
  HTMLLegendElementProperties,
  HTMLLinkElementProperties,
  HTMLMapElementProperties,
  HTMLMarqueeElementProperties,
  HTMLMenuElementProperties,
  HTMLMetaElementProperties,
  HTMLMeterElementProperties,
  HTMLOListElementProperteis,
  HTMLObjectElementProperties,
  HTMLOptGroupElementProperties,
  HTMLOptionElementProperties,
  HTMLOutputElementProperties,
  HTMLParagraphElementProperties,
  HTMLParamElementProperties,
  HTMLPictureElementProperties,
  HTMLPreElementProperties,
  HTMLProgressElementProperties,
  HTMLQuoteElementProperties,
  HTMLScriptElementProperties,
  HTMLSelectElementProperties,
  HTMLSourceElementProperties,
  HTMLSpanElementProperties,
  HTMLStyleElementProperties,
  HTMLTableElementProperties,
  HTMLTableRowElementProperties,
  HTMLTemplateElementProperties,
  HTMLTextAreaElementProperties,
  HTMLTimeElementProperties,
  HTMLTitleElementProperties,
  HTMLTrackElementProperties,
  HTMLUListElementProperties,
  HTMLVideoElementProperties,
} from '../types/HtmlProperties'
import { HyperscriptChildren, h } from './h'

// tslint:disable:max-line-length
// tslint:disable:no-shadowed-variable
export interface HyperscriptHelperFn<
  T extends Element,
  Props extends VNodeProps<T> = VNodeProps<T>,
  Events extends ElementEvents<T> = ElementEvents<T>
>
{
  (): VNode<T, Props>
  (classNameOrId: string, data: Props, children: HyperscriptChildren): VNode<T, Props>
  (classNameOrId: string, data: Props): VNode<T, Props & VNodeProps<T>>
  (classNameOrId: string, children: HyperscriptChildren): VNode<T, Props>
  (classNameOrId: string): VNode<T, Props>
  (data: Props): VNode<T, Props & VNodeProps<T>>
  (data: Props, children: HyperscriptChildren): VNode<T, Props>
  (children: HyperscriptChildren): VNode<T, Props>
}
// tslint:enable:max-line-length

export function hh<T extends Element, Props extends VNodeProps<Element> = VNodeProps<T>>(
  tagName: HtmlTagNames
): HyperscriptHelperFn<T, Props>
{
  return function(): VNode<T, Props> {
    const selector = arguments[0]
    const data = arguments[1]
    const children = arguments[2]

    if (isSelector(selector))
      if (Array.isArray(data)) return h<T, Props>(tagName + selector, {} as Props, data)
      else if (typeof data === 'object') return h<T, Props>(tagName + selector, data, children)
      else return h<T, Props>(tagName + selector, data || {}) as VNode<T, Props>

    if (Array.isArray(selector)) return h<T, Props>(tagName, {} as Props, selector)
    else if (typeof selector === 'object') return h<T, Props>(tagName, selector, data)
    else return h<T, Props>(tagName, selector || {}) as VNode<T, Props>
  }
}

function isValidString(param: any): boolean {
  return typeof param === 'string' && param.length > 0
}

function isSelector(param: any): boolean {
  return isValidString(param) && (param[0] === '.' || param[0] === '#')
}

export const a = hh<HTMLAnchorElement, HTMLAnchorElementProperties>('a')
export const abbr = hh('abbr')
export const acronym = hh('acronym')
export const address = hh('address')
export const applet = hh<HTMLAppletElement, HTMLAppletElementProperties>('applet')
export const area = hh<HTMLAreaElement, HTMLAreaElementProperties>('area')
export const article = hh('article')
export const aside = hh('aside')
export const audio = hh<HTMLAudioElement, HTMLAudioElementProperties>('audio')
export const b = hh('b')
export const base = hh<HTMLBaseElement, HTMLBaseElementProperties>('base')
export const basefont = hh<HTMLBaseFontElement, HTMLBaseFontElementProperties>('basefont')
export const bdi = hh('bdi')
export const bdo = hh('bdo')
export const bgsound = hh('bgsound')
export const big = hh('big')
export const blink = hh('blink')
export const blockquote = hh('blockquote')
export const body = hh<HTMLBodyElement, HTMLBodyElementProperties>('body')
export const br = hh<HTMLBRElement, HTMLBRElementProperties>('br')
export const button = hh<HTMLButtonElement, HTMLButtonElementProperties>('button')
export const canvas = hh<HTMLCanvasElement, HTMLCanvasElementProperties>('canvas')
export const caption = hh('caption')
export const center = hh('center')
export const cite = hh('cite')
export const code = hh('code')
export const col = hh('col')
export const colgroup = hh('colgroup')
export const command = hh('command')
export const content = hh('content')
export const data = hh<HTMLDataElement, HTMLDataElementProperties>('data')
export const datalist = hh<HTMLDataListElement, HTMLDataListElementProperties>('datalist')
export const dd = hh('dd')
export const del = hh('del')
export const details = hh('details')
export const dfn = hh('dfn')
export const dialog = hh('dialog')
export const dir = hh<HTMLDirectoryElement, HTMLDirectoryElementProperties>('dir')
export const div = hh<HTMLDivElement, HTMLDivElementProperties>('div')
export const dl = hh<HTMLDListElement, HTMLDListElementProperties>('dl')
export const dt = hh('dt')
export const element = hh('element')
export const em = hh('em')
export const embed = hh<HTMLEmbedElement, HTMLEmbedElementProperties>('embed')
export const fieldset = hh<HTMLFieldSetElement, HTMLFieldSetElementProperties>('fieldset')
export const figcaption = hh('figcaption')
export const figure = hh('figure')
export const font = hh<HTMLFontElement, HTMLFontElementProperties>('font')
export const form = hh<HTMLFormElement, HTMLFormElementProperties>('form')
export const footer = hh('footer')
export const frame = hh<HTMLFrameElement, HTMLFrameElementProperties>('frame')
export const frameset = hh<HTMLFrameSetElement, HTMLFrameSetElementProperties>('frameset')
export const h1 = hh<HTMLHeadingElement, HTMLHeadingElementProperties>('h1')
export const h2 = hh<HTMLHeadingElement, HTMLHeadingElementProperties>('h2')
export const h3 = hh<HTMLHeadingElement, HTMLHeadingElementProperties>('h3')
export const h4 = hh<HTMLHeadingElement, HTMLHeadingElementProperties>('h4')
export const h5 = hh<HTMLHeadingElement, HTMLHeadingElementProperties>('h5')
export const h6 = hh<HTMLHeadingElement, HTMLHeadingElementProperties>('h6')
export const head = hh<HTMLHeadElement, HTMLHeadElementProperties>('head')
export const header = hh('header')
export const hgroup = hh('hgroup')
export const hr = hh<HTMLHRElement, HTMLHRElementProperties>('hr')
export const html = hh<HTMLHtmlElement, HTMLHtmlElementProperties>('html')
export const i = hh<HTMLHtmlElement, HTMLHtmlElementProperties>('i')
export const iframe = hh<HTMLIFrameElement, HTMLIFrameElementProperties>('iframe')
export const img = hh<HTMLImageElement, HTMLImageElementProperties>('img')
export const input = hh<HTMLInputElement, HTMLInputElementProperties>('input')
export const ins = hh('ins')
export const isindex = hh('isindex')
export const kbd = hh('kbd')
export const keygen = hh('keygen')
export const label = hh<HTMLLabelElement, HTMLLabelElementProperties>('label')
export const legend = hh<HTMLLegendElement, HTMLLegendElementProperties>('legend')
export const li = hh<HTMLLIElement, HTMLLIElementProperties>('li')
export const link = hh<HTMLLinkElement, HTMLLinkElementProperties>('link')
export const listing = hh('listing')
export const main = hh('main')
export const map = hh<HTMLMapElement, HTMLMapElementProperties>('map')
export const mark = hh('mark')
export const marquee = hh<HTMLMarqueeElement, HTMLMarqueeElementProperties>('marquee')
export const math = hh('math')
export const menu = hh<HTMLMenuElement, HTMLMenuElementProperties>('menu')
export const menuitem = hh('menuitem')
export const meta = hh<HTMLMetaElement, HTMLMetaElementProperties>('meta')
export const meter = hh<HTMLMeterElement, HTMLMeterElementProperties>('meter')
export const multicol = hh('multicol')
export const nav = hh('nav')
export const nextid = hh('nextid')
export const nobr = hh('nobr')
export const noembed = hh('noembed')
export const noframes = hh('noframes')
export const noscript = hh('noscript')
export const object = hh<HTMLObjectElement, HTMLObjectElementProperties>('object')
export const ol = hh<HTMLOListElement, HTMLOListElementProperteis>('ol')
export const optgroup = hh<HTMLOptGroupElement, HTMLOptGroupElementProperties>('optgroup')
export const option = hh<HTMLOptionElement, HTMLOptionElementProperties>('option')
export const output = hh<HTMLOutputElement, HTMLOutputElementProperties>('output')
export const p = hh<HTMLParagraphElement, HTMLParagraphElementProperties>('p')
export const param = hh<HTMLParamElement, HTMLParamElementProperties>('param')
export const picture = hh<HTMLPictureElement, HTMLPictureElementProperties>('picture')
export const plaintext = hh('plaintext')
export const pre = hh<HTMLPreElement, HTMLPreElementProperties>('pre')
export const progress = hh<HTMLProgressElement, HTMLProgressElementProperties>('progress')
export const q = hh<HTMLQuoteElement, HTMLQuoteElementProperties>('q')
export const rb = hh('rb')
export const rbc = hh('rbc')
export const rp = hh('rp')
export const rt = hh('rt')
export const rtc = hh('rtc')
export const ruby = hh('ruby')
export const s = hh('s')
export const samp = hh('samp')
export const script = hh<HTMLScriptElement, HTMLScriptElementProperties>('script')
export const section = hh('section')
export const select = hh<HTMLSelectElement, HTMLSelectElementProperties>('select')
export const shadow = hh('shadow')
export const small = hh('small')
export const source = hh<HTMLSourceElement, HTMLSourceElementProperties>('source')
export const spacer = hh('spacer')
export const span = hh<HTMLSpanElement, HTMLSpanElementProperties>('span')
export const strike = hh('strike')
export const strong = hh('strong')
export const style = hh<HTMLStyleElement, HTMLStyleElementProperties>('style')
export const sub = hh('sub')
export const summary = hh('summary')
export const sup = hh('sup')
export const slot = hh('slot')
export const table = hh<HTMLTableElement, HTMLTableElementProperties>('table')
export const tbody = hh('tbody')
export const td = hh('td')
export const template = hh<HTMLTemplateElement, HTMLTemplateElementProperties>('template')
export const textarea = hh<HTMLTextAreaElement, HTMLTextAreaElementProperties>('textarea')
export const tfoot = hh('tfoot')
export const th = hh('th')
export const time = hh<HTMLTimeElement, HTMLTimeElementProperties>('time')
export const title = hh<HTMLTitleElement, HTMLTitleElementProperties>('title')
export const tr = hh<HTMLTableRowElement, HTMLTableRowElementProperties>('tr')
export const track = hh<HTMLTrackElement, HTMLTrackElementProperties>('track')
export const tt = hh('tt')
export const u = hh('u')
export const ul = hh<HTMLUListElement, HTMLUListElementProperties>('ul')
export const video = hh<HTMLVideoElement, HTMLVideoElementProperties>('video')
export const wbr = hh('wbr')
export const xmp = hh('xmp')

import { VNode, VNodeProps } from '../types'
import { h, ValidTagNames, HyperscriptChildren } from './h'
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
  HTMLVideoElementProperties
} from '../types/HtmlProperties'

function flatten(arr: Array<any>): Array<any> {
  return [].concat(...arr)
}

export interface ComponentFn {
  (props: VNodeProps, children: Array<string | VNode>): VNode
}

export interface HyperscriptJsxFn {
  (
    componentFn: ComponentFn | ValidTagNames,
    props: VNodeProps<any> | null,
    children: Array<string | VNode>
  ): VNode
}

export function hJsx(
  element: ValidTagNames | ComponentFn,
  props: VNodeProps<any> | null, ...children: Array<string | VNode>
): VNode
{
  if (typeof element === 'function') {
    return element(props === null ? {} : props, flatten(children))
  }

  return h(element, props === null ? {} : props, flatten(children))
}

// tslint:disable:no-mixed-interface
declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface IntrinsicElements {
      [tag: string]: any
      a: HTMLAnchorElementProperties
      applet: HTMLAppletElementProperties
      area: HTMLAreaElementProperties
      audio: HTMLAudioElementProperties
      base: HTMLBaseElementProperties
      basefont: HTMLBaseFontElementProperties
      body: HTMLBodyElementProperties
      br: HTMLBRElementProperties
      button: HTMLButtonElementProperties
      canvas: HTMLCanvasElementProperties
      data: HTMLDataElementProperties
      datalist: HTMLDataListElementProperties
      dir: HTMLDirectoryElementProperties
      div: HTMLDivElementProperties
      dl: HTMLDListElementProperties
      embed: HTMLEmbedElementProperties
      fieldset: HTMLFieldSetElementProperties
      font: HTMLFontElementProperties
      form: HTMLFormElementProperties
      frame: HTMLFrameElementProperties
      frameset: HTMLFrameSetElementProperties
      h1: HTMLHeadingElementProperties
      h2: HTMLHeadingElementProperties
      h3: HTMLHeadingElementProperties
      h4: HTMLHeadingElementProperties
      h5: HTMLHeadingElementProperties
      h6: HTMLHeadingElementProperties
      head: HTMLHeadElementProperties
      hr: HTMLHRElementProperties
      html: HTMLHtmlElementProperties
      i: HTMLHtmlElementProperties
      iframe: HTMLIFrameElementProperties
      img: HTMLImageElementProperties
      input: HTMLInputElementProperties
      label: HTMLLabelElementProperties
      legend: HTMLLegendElementProperties
      li: HTMLLIElementProperties
      link: HTMLLinkElementProperties
      map: HTMLMapElementProperties
      marquee: HTMLMarqueeElementProperties
      menu: HTMLMenuElementProperties
      meta: HTMLMetaElementProperties
      meter: HTMLMeterElementProperties
      object: HTMLObjectElementProperties
      ol: HTMLOListElementProperteis
      optgroup: HTMLOptGroupElementProperties
      option: HTMLOptionElementProperties
      output: HTMLOutputElementProperties
      p: HTMLParagraphElementProperties
      param: HTMLParamElementProperties
      picture: HTMLPictureElementProperties
      pre: HTMLPreElementProperties
      progress: HTMLProgressElementProperties
      q: HTMLQuoteElementProperties
      script: HTMLScriptElementProperties
      select: HTMLSelectElementProperties
      source: HTMLSourceElementProperties
      span: HTMLSpanElementProperties
      style: HTMLStyleElementProperties
      table: HTMLTableElementProperties
      template: HTMLTemplateElementProperties
      textarea: HTMLTextAreaElementProperties
      time: HTMLTimeElementProperties
      title: HTMLTitleElementProperties
      tr: HTMLTableRowElementProperties
      track: HTMLTrackElementProperties
      ul: HTMLUListElementProperties
      video: HTMLVideoElementProperties
    }
  }
}

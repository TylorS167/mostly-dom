// tslint:disable:max-file-line-count
import * as hooks from './hooks'

import { VNodeStyle } from './VirtualNode'

export type NodeProperties =
  {
    nodeValue?: string | null,
    textContent?: string | null,
  }

export type ElementProperties = NodeProperties &
  {
    className?: string,
    id?: string,
    innerHTML?: string,
    scrollLeft?: number,
    scrollTop?: number,
    slot?: string,
  }

export type HTMLElementProperties = ElementProperties &
  {
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

export type HTMLAnchorElementProperties = VNodeProperties<HTMLAnchorElement> &
  {
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

export type HTMLAppletElementProperties = VNodeProperties<HTMLAppletElement> &
  {
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

export type HTMLAreaElementProperties = VNodeProperties<HTMLAreaElement> &
  {
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

export type HTMLAudioElementProperties = VNodeProperties<HTMLAudioElement>

export type HTMLBRElementProperties = VNodeProperties<HTMLBRElement> &
  {
    clear?: string,
  }

export type HTMLBaseElementProperties = VNodeProperties<HTMLBaseElement> &
  {
    href?: string,
    target?: string,
  }

export type HTMLBaseFontElementProperties = VNodeProperties<HTMLBaseFontElement> &
  {
    face?: string,
    size?: number,
  }

export type HTMLBodyElementProperties = VNodeProperties<HTMLBodyElement> &
  {
    aLink?: any,
    background?: string,
    bgColor?: any,
    bgProperties?: string,
    link?: any,
    noWrap?: boolean,
    text?: any,
    vLink?: any,
  }

export type HTMLButtonElementProperties = VNodeProperties<HTMLButtonElement> &
  {
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

export type HTMLCanvasElementProperties = VNodeProperties<HTMLCanvasElement> &
  {
    height?: number,
    width?: number,
  }

export type HTMLDListElementProperties = VNodeProperties<HTMLDListElement> &
  {
    compact?: boolean,
  }

export type HTMLDataElementProperties = VNodeProperties<HTMLDataElement> &
  {
    value?: string,
  }

export type HTMLDataListElementProperties = VNodeProperties<HTMLDataListElement> &
  {
    options?: HTMLCollectionOf<HTMLOptionElement>,
  }

export type HTMLDirectoryElementProperties = VNodeProperties<HTMLDirectoryElement> &
  {
    compact?: boolean,
  }

export type HTMLDivElementProperties = VNodeProperties<HTMLDivElement> &
  {
    align?: string,
    noWrap?: boolean,
  }

export type HTMLEmbedElementProperties = VNodeProperties<HTMLEmbedElement> &
  {
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

export type HTMLFieldSetElementProperties = VNodeProperties<HTMLFieldSetElement> &
  {
    align?: string,
    disabled?: boolean,
    name?: string,
  }

export type HTMLFontElementProperties = VNodeProperties<HTMLFontElement> &
  {
    face?: string,
  }

export type HTMLFormElementProperties = VNodeProperties<HTMLFormElement> &
  {
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

export type HTMLFrameElementProperties = VNodeProperties<HTMLFrameElement> &
  {
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

export type HTMLFrameSetElementProperties = VNodeProperties<HTMLFrameSetElement> &
  {
    border?: string,
    borderColor?: string,
    cols?: string,
    frameBorder?: string,
    frameSpacing?: any,
    name?: string,
    rows?: string,
  }

export type HTMLHRElementProperties = VNodeProperties<HTMLHRElement> &
  {
    align?: string,
    noShade?: boolean,
    width?: number,
  }

export type HTMLHeadElementProperties = VNodeProperties<HTMLHeadElement> &
  {
    profile?: string,
  }

export type HTMLHeadingElementProperties = VNodeProperties<HTMLHeadingElement> &
  {
    align?: string,
  }

export type HTMLHtmlElementProperties = VNodeProperties<HTMLHtmlElement> &
  {
    version?: string,
  }

export type HTMLIFrameElementProperties = VNodeProperties<HTMLIFrameElement> &
  {
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

export type HTMLImageElementProperties = VNodeProperties<HTMLImageElement> &
  {
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

export type HTMLInputElementProperties = VNodeProperties<HTMLInputElement> &
  {
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

export type HTMLLIElementProperties = VNodeProperties<HTMLLIElement> &
  {
    type?: string,
    value?: number,
  }

export type HTMLLabelElementProperties = VNodeProperties<HTMLLabelElement> &
  {
    htmlFor?: string,
  }

export type HTMLLegendElementProperties = VNodeProperties<HTMLLegendElement> &
  {
    align?: string,
  }

export type HTMLLinkElementProperties = VNodeProperties<HTMLLinkElement> &
  {
    charset?: string,
    disabled?: boolean,
    href?: string,
    hreflang?: string,
    media?: string,
    rel?: string,
    rev?: string,
    target?: string,
    type?: string,
    import?: Document,
    integrity?: string,
  }

export type HTMLMapElementProperties = VNodeProperties<HTMLMapElement> &
  {
    name?: string,
  }

export type HTMLMarqueeElementProperties = VNodeProperties<HTMLMarqueeElement> &
  {
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

export type HTMLMediaElementProperties = VNodeProperties<HTMLMediaElement> &
  {
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

export type HTMLMenuElementProperties = VNodeProperties<HTMLMenuElement> &
  {
    compact?: boolean,
    type?: string,
  }

export type HTMLMetaElementProperties = VNodeProperties<HTMLMetaElement> &
  {
    charset?: string,
    content?: string,
    httpEquiv?: string,
    name?: string,
    scheme?: string,
    url?: string,
  }

export type HTMLMeterElementProperties = VNodeProperties<HTMLMeterElement> &
  {
    high?: number,
    low?: number,
    max?: number,
    min?: number,
    optimum?: number,
    value?: number,
  }

export type HTMLModElementProperties = VNodeProperties<HTMLModElement> &
  {
    cite?: string,
    dateTime?: string,
  }

export type HTMLOListElementProperteis = VNodeProperties<HTMLOListElement> &
  {
    compact?: boolean,
    start?: number,
    type?: string,
  }

export type HTMLObjectElementProperties = VNodeProperties<HTMLObjectElement> &
  {
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

export type HTMLOptGroupElementProperties = VNodeProperties<HTMLOptGroupElement> &
  {
    defaultSelected?: boolean,
    disabled?: boolean,
    label?: string,
    selected?: boolean,
    value?: string,
  }

export type HTMLOptionElementProperties = VNodeProperties<HTMLOptionElement> &
  {
    defaultSelected?: boolean,
    disabled?: boolean,
    label?: string,
    selected?: boolean,
    text?: string,
    value?: string,
  }

export type HTMLOutputElementProperties = VNodeProperties<HTMLOutputElement> &
  {
    defaultValue?: string,
    name?: string,
    value?: string,
  }

export type HTMLParagraphElementProperties = VNodeProperties<HTMLParagraphElement> &
  {
    align?: string,
    clear?: string,
  }

export type HTMLParamElementProperties = VNodeProperties<HTMLParamElement> &
  {
    name?: string,
    type?: string,
    value?: string,
    valueType?: string,
  }

export type HTMLPictureElementProperties = VNodeProperties<HTMLPictureElement>

export type HTMLPreElementProperties = VNodeProperties<HTMLPreElement> &
  {
    width?: number,
  }

export type HTMLProgressElementProperties = VNodeProperties<HTMLProgressElement> &
  {
    max?: number,
    value?: number,
  }

export type HTMLQuoteElementProperties = VNodeProperties<HTMLQuoteElement> &
  {
    cite?: string,
  }

export type HTMLScriptElementProperties = VNodeProperties<HTMLScriptElement> &
  {
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

export type HTMLSelectElementProperties = VNodeProperties<HTMLSelectElement> &
  {
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

export type HTMLSourceElementProperties = VNodeProperties<HTMLSourceElement> &
  {
    media?: string,
    msKeySystem?: string,
    sizes?: string,
    src?: string,
    srcset?: string,
    type?: string,
  }

export type HTMLSpanElementProperties = VNodeProperties<HTMLSpanElement>

export type HTMLStyleElementProperties = VNodeProperties<HTMLStyleElement> &
  {
    disabled?: boolean,
    media?: string,
    type?: string,
  }

export type HTMLTableCaptionElementProperties = VNodeProperties<HTMLTableCaptionElement> &
  {
    align?: string,
    vAlign?: string,
  }

export type HTMLTableCellElementProperties = VNodeProperties<HTMLTableCellElement> &
  {
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

export type HTMLTableColElementProperties = VNodeProperties<HTMLTableColElement> &
  {
    align?: string,
    span?: number,
    width?: any,
  }

export type HTMLTableDataCellElementProperties = VNodeProperties<HTMLTableDataCellElement>

export type HTMLTableElementProperties = VNodeProperties<HTMLTableElement> &
  {
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

export type HTMLTableHeaderCellElementProperties = VNodeProperties<HTMLTableHeaderCellElement> &
  {
    scope?: string,
  }

export type HTMLTableRowElementProperties = VNodeProperties<HTMLTableRowElement> &
  {
    align?: string,
    bgColor?: any,
    cells?: HTMLCollectionOf<HTMLTableDataCellElement | HTMLTableHeaderCellElement>,
    height?: any,
  }

export type HTMLTableSectionElementProperties = VNodeProperties<HTMLTableSectionElement> &
  {
    align?: string,
    rows?: HTMLCollectionOf<HTMLTableRowElement>,
  }

export type HTMLTemplateElementProperties = VNodeProperties<HTMLTemplateElement>

export type HTMLTextAreaElementProperties = VNodeProperties<HTMLTextAreaElement> &
  {
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

export type HTMLTimeElementProperties = VNodeProperties<HTMLTimeElement> &
  {
    dateTime?: string,
  }

export type HTMLTitleElementProperties = VNodeProperties<HTMLTimeElement> &
  {
    text?: string,
  }

export type HTMLTrackElementProperties = VNodeProperties<HTMLTrackElement> &
  {
    default?: boolean,
    kind?: string,
    label?: string,
    src?: string,
    srclang?: string,
  }

export type HTMLUListElementProperties = VNodeProperties<HTMLUListElement> &
  {
    compact?: boolean,
    type?: string,
  }

export type HTMLUnknownElementProperties = VNodeProperties<HTMLUnknownElement>

export type HTMLVideoElementProperties = VNodeProperties<HTMLVideoElement> &
  {
    height?: number,
    msHorizontalMirror?: boolean,
    msStereo3DPackingMode?: string,
    msStereo3DRenderMode?: string,
    msZoom?: boolean,
    poster?: string,
    width?: number,
  }

// ~ and * : value contains
// | and ^ : value starts with
// $ : value ends with

const attrModifiers: Array<string> =
  [ '~', '*', '|', '^', '$' ]

export function matchAttribute(cssSelector: string, attrs: any) {
  // tslint:disable-next-line:prefer-const
  let [ attribute, value ] = cssSelector.split('=')

  const attributeLength = attribute.length - 1

  const modifier = attribute[attributeLength]
  const modifierIndex = attrModifiers.indexOf(modifier)

  if (modifierIndex > -1) {
    attribute = attribute.slice(0, attributeLength)
    const attrModifier = attrModifiers[modifierIndex]

    const attrValue = String(attrs[attribute])

    if (!attrValue) return false

    switch (attrModifier) {
    case '~': return attrValue.indexOf(value) > -1
    case '*': return attrValue.indexOf(value) > -1
    case '|': return attrValue.indexOf(value) === 0
    case '^': return attrValue.indexOf(value) === 0
    case '$': return attrValue.slice(-value.length) === value
    default: return false
    }
  }

  if (value)
    return value === attrs[attribute]

  return !!attrs[attribute]
}

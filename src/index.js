import {filter,curryN,isString} from '@roseys/futils'

// import isString from '@roseys/futils/es/isString'
// import curryN from '@roseys/futils/es/curryN'
// import filter from '@roseys/futils/es/filter'


import memoize from './memoize'

const T = {
  '*':
    'children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|checkedLink|innerHTML|suppressContentEditableWarning|className|about|acceptCharset|accessKey|allowFullScreen|allowTransparency|autoComplete|autoFocus|autoPlay|capture|cellPadding|cellSpacing|charSet|classID|className|colSpan|contentEditable|contextMenu|crossOrigin|dangerouslySetInnerHTML|datatype|dateTime|dir|draggable|encType|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|hidden|hrefLang|htmlFor|httpEquiv|icon|id|inlist|inputMode|is|itemID|itemProp|itemRef|itemScope|itemType|keyParams|keyType|lang|marginHeight|marginWidth|maxLength|mediaGroup|minLength|noValidate|prefix|property|radioGroup|readOnly|resource|role|rowSpan|scoped|seamless|security|spellCheck|srcDoc|srcLang|srcSet|style|suppressContentEditableWarning|tabIndex|title|typeof|unselectable|useMap|vocab|wmode',
  a: 'coords|download|href|name|rel|shape|target|type|onClick',
  abbr: 'title',
  applet: 'alt|height|name|width',
  area: 'alt|coords|download|href|rel|shape|target|type',
  audio: 'controls|loop|muted|preload|src',
  base: 'href|target',
  basefont: 'size',
  bdo: 'dir',
  blockquote: 'cite',
  button: 'disabled|form|name|type|value',
  canvas: 'height|width',
  col: 'span|width',
  colgroup: 'span|width',
  data: 'value',
  del: 'cite',
  details: 'open',
  dfn: 'title',
  dialog: 'open',
  embed: 'height|src|type|width',
  fieldset: 'disabled|form|name',
  font: 'size',
  form: 'accept|action|method|name|target|onChange|onInput|onInvalid|onSubmit',
  frame: 'name|scrolling|src',
  frameset: 'cols|rows',
  head: 'profile',
  hr: 'size|width',
  html: 'manifest',
  iframe: 'height|name|sandbox|scrolling|src|width',
  img: 'alt|height|name|sizes|src|width',
  input:
    'accept|alt|autoCapitalize|autoCorrect|autoSave|checked|defaultChecked|defaultValue|disabled|form|height|list|max|min|multiple|name|onChange|pattern|placeholder|required|results|size|src|step|title|type|value|width',
  ins: 'cite',
  keygen: 'challenge|disabled|form|name',
  label: 'form',
  li: 'type|value',
  link: 'color|href|integrity|media|nonce|rel|scope|sizes|target|title|type',
  map: 'name',
  meta: 'content|name',
  meter: 'high|low|max|min|optimum|value',
  object: 'data|form|height|name|type|width',
  ol: 'reversed|start|type',
  optgroup: 'disabled|label',
  option: 'disabled|label|selected|value',
  output: 'form|name',
  param: 'name|type|value',
  pre: 'width',
  progress: 'max|value',
  q: 'cite',
  script: 'async|defer|integrity|nonce|src|type',
  select:
    'defaultValue|disabled|form|multiple|name|onChange|required|size|value',
  slot: 'name',
  source: 'media|sizes|src|type',
  style: 'media|nonce|title|type',
  table: 'summary|width',
  td: 'headers|height|scope|width',
  textarea:
    'autoCapitalize|autoCorrect|cols|defaultValue|disabled|form|name|onChange|placeholder|required|rows|value|wrap',
  th: 'headers|height|scope|width',
  track: 'default|kind|label|src',
  ul: 'type',
  video: 'controls|height|loop|muted|playsInline|poster|preload|src|width',
  svg:
    'accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baseProfile|baselineShift|bbox|begin|bias|by|calcMode|capHeight|clip|clipPath|clipPathUnits|clipRule|color|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|height|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerHeight|markerMid|markerStart|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|paintOrder|panose1|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textLength|textRendering|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|width|widths|wordSpacing|writingMode|x|x1|x2|xChannelSelector|xHeight|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlLang|xmlSpace|xmlns|xmlnsXlink|y|y1|y2|yChannelSelector|z|zoomAndPan',
}


export const shouldForwardProp =  memoize((tag, prop) =>
  isString(tag) && new RegExp(`^((${T[tag]})|(${T['*']})|(on[A-Z].*)|((data|aria)-.*))$`).test(
    prop,
  ))


export const cleanPropsbyTag= curryN(2, (tagName, props) =>
  filter((val, key) => shouldForwardProp(tagName, key))(props),
)

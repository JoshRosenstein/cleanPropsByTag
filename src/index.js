import reactProps from './react-props'
import htmlAttributes from 'react-html-attributes'

import { propOr, contains, pickBy, curry } from 'ramda'
import memoize from 'fast-memoize'
const globalHtmlProps = htmlAttributes['*']

// Mostly from the Shades library: https://github.com/bupa-digital/shades/

const isHtmlProp = (tagName, propName) =>
  contains(propName, globalHtmlProps) ||
  contains(propName, propOr({}, tagName, htmlAttributes))

const isReactProp = propName => reactProps.includes(propName)

const shouldForwardProp_ = (tagName, propName) =>
  typeof tagName !== 'string' ||
  isReactProp(propName) ||
  isHtmlProp(tagName, propName)

export const shouldForwardProp = memoize(shouldForwardProp_)

export default curry((tagName, props) =>
  pickBy((val, key) => shouldForwardProp(tagName, key))(props)
)

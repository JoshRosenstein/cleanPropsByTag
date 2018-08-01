// import {
//   propOr,
//   contains,
//   curryN,
//   startsWith,
//   anyPass,
//   pipe,
//   mapValues,
//   filter,
// } from '@roseys/futils/es'
import propOr from '@roseys/futils/es/propOr'
import contains from '@roseys/futils/es/contains'
import curryN from '@roseys/futils/es/curryN'
import startsWith from '@roseys/futils/es/startsWith'
import anyPass from '@roseys/futils/es/anyPass'
import pipe from '@roseys/futils/es/pipe'
import mapValues from '@roseys/futils/es/mapValues'
import filter from '@roseys/futils/es/filter'

import memoize from 'fast-memoize'
import Attrs from './attributesByTag'

export const startsWithAny = (...searchStrs) =>
  pipe(
    mapValues(startsWith),
    anyPass,
  )(searchStrs)

export const isHtmlProp = (tagName, propName) =>
  contains(propName, propOr([], tagName, Attrs))

export const shouldForwardProp_ = (tagName, propName) =>
  typeof tagName !== 'string' ||
  isHtmlProp(tagName, propName) ||
  startsWithAny('aria-', 'data-')(propName)

export const shouldForwardProp = memoize(shouldForwardProp_)

export const cleanPropsbyTag= curryN(2, (tagName, props) =>
  filter((val, key) => shouldForwardProp(tagName, key))(props),
)

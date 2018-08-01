import { cleanPropsbyTag, startsWithAny, isHtmlProp } from '../src/'

describe('startsWithAny', () => {
  test('works', () => {
    expect(startsWithAny('a', 'b', 'c')('ab')).toBeTruthy()
    expect(startsWithAny('a', 'b', 'c')('dc')).toBeFalsy()
  })
})

describe('isHtmlProp', () => {
  test('works', () => {
    expect(isHtmlProp('button', 'disabled')).toBeTruthy()
    expect(isHtmlProp('button', 'primary')).toBeFalsy()
  })
})

describe('cleanPropsbyTag', () => {
  test('works', () => {
    expect(
      cleanPropsbyTag('button', { disabled: true, color: 'red' }),
    ).toEqual({
      disabled: true,
    })

    expect(
      cleanPropsbyTag('div', { 'data-disabled': true, color: 'red' }),
    ).toEqual({
      'data-disabled': true,
    })

    expect(cleanPropsbyTag('div', { disabled: true, color: 'red' })).toEqual(
      {},
    )
  })
})

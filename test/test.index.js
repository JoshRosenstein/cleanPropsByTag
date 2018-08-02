import { cleanPropsbyTag, shouldForwardProp} from '../src/'


describe('isHtmlProp', () => {
  test('works', () => {
    expect(shouldForwardProp('button', 'disabled')).toBeTruthy()
    expect(shouldForwardProp('button', 'primary')).toBeFalsy()
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
 

// import React from 'react'
import { act, render, screen } from '@testing-library/react'

import { Icon } from '../components/shared/Icon'

describe('<Icon />', () => {
  test('test', () => {
    const component = render(
      <Icon
        name='ico'
        className='mySvg'
        data-testid='icoSvg'
        onClick={() => {}}
        active
      />
    )
    const element = component.getByTestId('icoSvg')
    expect(element).toHaveClass('mySvg')
    expect(element).toHaveClass('active')
  })
})

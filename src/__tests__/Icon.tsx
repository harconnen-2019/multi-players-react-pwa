// import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { Icon } from '../components/platforms/default/Icon'

describe('<Icon />', () => {
  test('test', () => {
    const component = render(
      <Icon name='ico' className='class' onClick={() => {}} />
    )
    expect(component).toHaveClass('class')
  })
})

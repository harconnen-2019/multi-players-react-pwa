import './css/miniPanelPlay.css'

import React from 'react'

import { IRadio } from '../../../interfaces/radio'

interface Props {
  radio: IRadio | undefined
  pause: () => void
  toggleMenu: (event: string) => void
}

const miniPanelPlay = ({ radio, pause, toggleMenu }: Props) => {
  return (
    <div className='mini-play'>
      <section>
        <img src={radio?.cover} alt={radio?.name} />
        <article>
          <div>{radio?.name}</div>
          <span>{radio?.note}</span>
        </article>
      </section>
      <div className='svg'>
        <div className='play'>
          <svg>
            <use xlinkHref='#play'></use>
          </svg>
        </div>
        <div className='cancel'>
          <svg
            onClick={() => {
              pause()
            }}
          >
            <use xlinkHref='#cancel'></use>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default miniPanelPlay

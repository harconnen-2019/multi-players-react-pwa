import './css/list.css'

import React from 'react'

import { IRadio } from '../../../interfaces/radio'

interface Props {
  radio: IRadio
  favoritesChange: (change: boolean, radio: IRadio) => void
  playSelectRadio: (radio: IRadio) => void
  toggleMenu: (event: string) => void
}

const List = ({
  radio,
  favoritesChange,
  playSelectRadio,
  toggleMenu,
}: Props) => {
  const selectRadio = (radio: IRadio) => {
    toggleMenu('null')
    playSelectRadio(radio)
  }

  return (
    <div className='list'>
      <div className='list-radio'>
        <img
          src={radio.cover}
          alt={radio.name}
          loading='lazy'
          onClick={() => selectRadio(radio)}
        />
        <div className={`ico-favorites ${!radio.favorite ? 'f-muted' : ''}`}>
          <svg
            onClick={() => {
              favoritesChange(radio.favorite, radio)
            }}
          >
            <use xlinkHref={`#favorites${!radio.favorite ? '-add' : ''}`}></use>
          </svg>
        </div>
      </div>
      <div className='title'>{radio.name}</div>
      <div className='genres'>
        {radio.genres.length !== 0 && <span>{radio.genres.join()}</span>}
      </div>
    </div>
  )
}

export default List

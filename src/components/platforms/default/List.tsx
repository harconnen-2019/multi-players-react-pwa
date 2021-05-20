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
    <section className='list'>
      <img
        src={radio.cover}
        alt={radio.name}
        loading='lazy'
        onClick={() => selectRadio(radio)}
      />
      <article onClick={() => selectRadio(radio)}>
        <div>
          {radio.name} / {radio.fm}
        </div>
        {radio.genres.length !== 0 && <span>{radio.genres.join()}</span>}
      </article>
      <div className='fav'>
        <svg
          onClick={() => {
            favoritesChange(radio.favorite, radio)
          }}
        >
          <use xlinkHref={`#favorites${!radio.favorite ? '-add' : ''}`}></use>
        </svg>
      </div>
    </section>
  )
}

export default List

import React from 'react'
import { IRadio } from '../../../interfaces/radio'
import './css/list.css'

interface Props {
  favoritesID: string[]
  radio: IRadio
  favoritesChange: (change: boolean, radio: IRadio) => void
  playSelectRadio: (radio: IRadio) => void
  toggleMenu: (event: string) => void
}

const List = ({
  favoritesID,
  radio,
  favoritesChange,
  playSelectRadio,
  toggleMenu,
}: Props) => {
  const displayFavorite = favoritesID.find((item) => {
    return item === radio.id
  })
    ? true
    : false

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
            favoritesChange(displayFavorite, radio)
          }}
        >
          <use xlinkHref={`#favorites${!displayFavorite ? '-add' : ''}`}></use>
        </svg>
      </div>
    </section>
  )
}

export default List

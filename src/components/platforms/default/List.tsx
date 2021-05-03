import React from 'react'
import { IRadio } from '../../../interfaces/radio'
import './css/list.css'

interface Props {
  favoritesID: string[]
  radio: IRadio
  favoritesChange: (change: boolean, radioId: string) => void
}

const List = ({ favoritesID, radio, favoritesChange }: Props) => {
  const displayFavorite = favoritesID.find((item) => {
    return item === radio.id
  })
    ? true
    : false

  return (
    <section className='list'>
      <img src={radio.cover} alt={radio.name} loading='lazy' />
      <article>
        <div>
          {radio.name} / {radio.fm}
        </div>
        {radio.genres.length !== 0 && <span>{radio.genres}</span>}
      </article>
      <div className='fav'>
        {displayFavorite ? (
          <svg
            onClick={() => {
              favoritesChange(displayFavorite, radio.id)
            }}
          >
            <use xlinkHref={`#favorites`}></use>
          </svg>
        ) : (
          <svg
            onClick={() => {
              favoritesChange(displayFavorite, radio.id)
            }}
          >
            <use xlinkHref={`#favorite-add`}></use>
          </svg>
        )}
      </div>
    </section>
  )
}

export default List

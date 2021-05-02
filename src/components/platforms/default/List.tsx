import React from 'react'
import { IRadio } from '../../../interfaces/radio'
import './css/list.css'

interface Props {
  favoritesID: string[]
  radio: IRadio
}

const List = ({ favoritesID, radio }: Props) => {
  return (
    <section className='list'>
      <img src={radio.cover} alt={radio.name} />
      <article>
        <div>
          {radio.name} / {radio.fm}
        </div>
        {radio.genres.length !== 0 && <span>{radio.genres}</span>}
      </article>
      <div className='fav'>
        <svg>
          <use xlinkHref={`#favorites`}></use>
        </svg>
      </div>
    </section>
  )
}

export default List

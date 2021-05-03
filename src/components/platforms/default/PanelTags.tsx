import React, { useState } from 'react'
import { IRadio } from '../../../interfaces/radio'
import './css/panelTags.css'

interface Props {
  tag: string
  allTags: Set<string> | undefined
  favoritesId: Array<string>
  playList: IRadio[] | undefined
  favoritesChange: (change: boolean, radioId: string) => void
}

const PanelTags = ({
  tag,
  allTags,
  favoritesId,
  playList,
  favoritesChange,
}: Props) => {
  //   const [genresRadio, setGenresRadio] = useState<IRadio[] | undefined>([])
  const [selectTags, setSelectTags] = useState<IRadio[] | undefined>([])
  //TODO: может можно обойтись без перевода set() в массив (дает ошибку)
  const listGenres = allTags !== undefined ? Array.from(allTags) : []
  return (
    <section>
      <ul className='ul-props'>
        {listGenres.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default PanelTags

import './css/panelVkm.css'

import React from 'react'

import { ILocalization } from '../../../interfaces/localization'
import InputSearch from './InputSearch'

interface Props {
  lang: ILocalization
  input: string
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchSubmit: () => void
  toggleMenu: (event: string) => void
  single: boolean | undefined
  visibleTag: { [key: string]: boolean }
}
const PanelVkm = ({
  lang,
  input,
  inputChange,
  searchSubmit,
  toggleMenu,
  single,
  visibleTag,
}: Props) => {
  const handleSearch = () => {
    searchSubmit()
    toggleMenu('search')
  }
  return (
    <section className='panelVkm'>
      {single !== undefined && !single && (
        <>
          <p onClick={() => toggleMenu('favorites')}>
            <svg>
              <use xlinkHref='#favorites'></use>
            </svg>
            {lang ? lang.favorites.message : 'Favorites'}
          </p>
          <InputSearch
            lang={lang}
            input={input}
            inputChange={inputChange}
            searchSubmit={handleSearch}
          />
          {visibleTag.genres && (
            <p onClick={() => toggleMenu('genres')}>
              <svg>
                <use xlinkHref='#genres'></use>
              </svg>
              {lang ? lang.searchByGenre.message : 'Search by genre'}
            </p>
          )}
          {visibleTag.moods && (
            <p onClick={() => toggleMenu('moods')}>
              <svg>
                <use xlinkHref='#moods'></use>
              </svg>
              {lang ? lang.searchByMood.message : 'Search by mood'}
            </p>
          )}
        </>
      )}
      <p onClick={() => toggleMenu('setting')}>
        <svg>
          <use xlinkHref='#setting'></use>
        </svg>
        Settings
      </p>
    </section>
  )
  //TODO: нет перевода Settings
}
export default PanelVkm

import './css/panelCanvas.css'

import React from 'react'

import { ILocalization } from '../../../interfaces/localization'

interface Props {
  lang: ILocalization
  toggleMenu: (event: string) => void
  visibleTag: { [key: string]: boolean }
}

const Canvas = ({ lang, toggleMenu, visibleTag }: Props) => {
  return (
    <div className='panel'>
      <section>
        <p onClick={() => toggleMenu('favorites')}>
          <svg>
            <use xlinkHref='#favorites'></use>
          </svg>
          {lang ? lang.favorites.message : 'Favorites'}
        </p>
        {visibleTag.genres && (
          <p onClick={() => toggleMenu('genres')}>
            <svg>
              <use xlinkHref='#genres'></use>
            </svg>
            {lang ? lang.genres.message : 'Genres'}
          </p>
        )}
        {visibleTag.moods && (
          <p onClick={() => toggleMenu('moods')}>
            <svg>
              <use xlinkHref='#moods'></use>
            </svg>
            {lang ? lang.mood.message : 'Mood'}
          </p>
        )}
        <p onClick={() => toggleMenu('setting')}>
          <svg>
            <use xlinkHref='#setting'></use>
          </svg>
          Settings
        </p>
      </section>
    </div>
  )
  //TODO: нет перевода Settings
}

export default Canvas

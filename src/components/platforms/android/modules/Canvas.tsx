import React from 'react'

import { ILocalization } from '../../../../interfaces/localization'
import styles from './Canvas.module.css'

interface Props {
  lang: ILocalization
  toggleMenu: (event: string) => void
  visibleTag: { [key: string]: boolean }
}

const Canvas = ({ lang, toggleMenu, visibleTag }: Props) => {
  return (
    <section className={styles.canvas}>
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
      <p onClick={() => toggleMenu('recommend')}>
        <svg>
          <use xlinkHref='#like'></use>
        </svg>
        Recommendations
      </p>
      <p onClick={() => toggleMenu('top')}>
        <svg>
          <use xlinkHref='#star'></use>
        </svg>
        Popular radio station
      </p>
      <hr />
      <p onClick={() => toggleMenu('user')}>
        <svg>
          <use xlinkHref='#user'></use>
        </svg>
        {lang ? lang.profile.message : 'Profile'}
      </p>
      <p onClick={() => toggleMenu('favorites')}>
        <svg>
          <use xlinkHref='#favorites'></use>
        </svg>
        {lang ? lang.favorites.message : 'Favorites'}
      </p>
      {/* <p onClick={() => toggleMenu('wallet')}>
          <svg>
            <use xlinkHref='#wallet'></use>
          </svg>
          Payment method
        </p> */}
      <hr />
      <p onClick={() => toggleMenu('setting')}>
        <svg>
          <use xlinkHref='#setting'></use>
        </svg>
        Settings
      </p>
    </section>
  )
  //TODO: нет перевода Settings
  //TODO: нет перевода Popular radio station & Recommendations & Payment method
}

export default Canvas

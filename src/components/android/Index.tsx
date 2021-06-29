import React from 'react'

import { ILocalization } from '../../interfaces/localization'
import { IRadio } from '../../interfaces/radio'
import styles from './Index.module.css'
import List from './modules/List'

interface Props {
  lang: ILocalization
  toggleMenu: (event: string) => void
  playSelectRadio: (radio: IRadio) => void
  playList: IRadio[] | undefined
  favoritesChange: (change: boolean, radio: IRadio) => void
  visibleTag: { [key: string]: boolean }
}

export const Index = ({
  lang,
  playList,
  toggleMenu,
  favoritesChange,
  playSelectRadio,
  visibleTag,
}: Props) => {
  const favorites = playList?.filter((item) => item.favorite === true)
  const recommend = playList?.filter((item) => item.recommend === true)
  const top = playList?.filter((item) => item.top === true)
  return (
    <section>
      {favorites !== undefined && favorites.length !== 0 && (
        <>
          <p className={styles.index}>
            {lang.favorites ? lang.favorites.message : 'Favorites'}
            <svg>
              <use xlinkHref='#fast'></use>
            </svg>
          </p>
          <div className={styles.slider}>
            <div style={{ display: 'inline-flex' }}>
              {favorites.map((radio) => (
                <List
                  key={radio.id}
                  radio={radio}
                  favoritesChange={favoritesChange}
                  playSelectRadio={playSelectRadio}
                  toggleMenu={toggleMenu}
                  listFavorites={true}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {recommend !== undefined && recommend.length !== 0 && (
        <>
          <p className={styles.index}>
            Recommendations
            <svg>
              <use xlinkHref='#fast'></use>
            </svg>
          </p>
          <div className={styles.slider}>
            <div style={{ display: 'inline-flex' }}>
              {recommend.map((radio) => (
                <List
                  key={radio.id}
                  radio={radio}
                  favoritesChange={favoritesChange}
                  playSelectRadio={playSelectRadio}
                  toggleMenu={toggleMenu}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {top !== undefined && top.length !== 0 && (
        <>
          <p className={styles.index}>
            Popular radio station
            <svg>
              <use xlinkHref='#fast'></use>
            </svg>
          </p>
          <div className={styles.slider}>
            <div style={{ display: 'inline-flex' }}>
              {top.map((radio) => (
                <List
                  key={radio.id}
                  radio={radio}
                  favoritesChange={favoritesChange}
                  playSelectRadio={playSelectRadio}
                  toggleMenu={toggleMenu}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
  //TODO: нет перевода Popular radio station & Recommendations
}

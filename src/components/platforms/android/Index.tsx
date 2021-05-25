import './css/index.css'

import React from 'react'

import { ILocalization } from '../../../interfaces/localization'
import { IRadio } from '../../../interfaces/radio'
import List from './List'

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
    <div className='panel'>
      <section>
        {favorites !== undefined && favorites.length !== 0 && (
          <>
            <p className='index'>
              {lang.favorites ? lang.favorites.message : 'Favorites'}
              <svg>
                <use xlinkHref='#fast'></use>
              </svg>
            </p>
            <div className='slider'>
              <div className='line-list-flex'>
                {favorites.map((radio) => (
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
        {recommend !== undefined && recommend.length !== 0 && (
          <>
            <p className='index'>
              Recommendations
              <svg>
                <use xlinkHref='#fast'></use>
              </svg>
            </p>
            <div className='slider'>
              <div className='line-list-flex'>
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
            <p className='index'>
              Popular radio station
              <svg>
                <use xlinkHref='#fast'></use>
              </svg>
            </p>
            <div className='slider'>
              <div className='line-list-flex'>
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
    </div>
  )
  //TODO: нет перевода Popular radio station & Recommendations
}

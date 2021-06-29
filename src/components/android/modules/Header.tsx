import React from 'react'

import { ILocalization } from '../../../interfaces/localization'
import { IRadio } from '../../../interfaces/radio'
import styles from './Header.module.css'

interface Props {
  menu: { [key: string]: boolean }
  radio: IRadio | undefined
  lang: ILocalization
  favoritesChange: (change: boolean, radio: IRadio) => void
}

const Header = ({ menu, radio, lang, favoritesChange }: Props) => {
  return (
    <>
      <div className={styles.bread}>
        {menu.favorites &&
          (lang.favorites ? lang.favorites.message : 'Favorites')}
        {menu.recommend && 'Recommendations'}
        {menu.top && 'Popular radio station'}
        {menu.genres &&
          (lang.searchByGenre ? lang.searchByGenre.message : 'Search by genre')}
        {menu.moods &&
          (lang.searchByMood ? lang.searchByMood.message : 'Search by mood')}
        {menu.search &&
          (lang.searchByStation
            ? lang.searchByStation.message
            : 'Search station')}
        {menu.user && (lang.profile ? lang.profile.message : 'Profile')}
        {menu.setting && 'Setting'}
        {menu.eula && (lang.eula ? lang.eula.message : 'Terms of use')}
        {menu.terms && (lang.terms ? lang.terms.message : 'Privacy policy')}
      </div>
      {menu.player && (
        <>
          <div className={styles.player}>
            <img src={radio?.cover} alt={radio?.name} />
            <article>
              <div>{radio?.name}</div>
              <span>{radio?.note}</span>
            </article>
          </div>
          {radio !== undefined && (
            <div>
              <svg
                className=''
                onClick={() => {
                  favoritesChange(radio.favorite, radio)
                }}
              >
                <use
                  xlinkHref={radio?.favorite ? `#favorites` : `#favorites-add`}
                ></use>
              </svg>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Header

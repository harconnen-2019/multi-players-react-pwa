import React from 'react'

import { ILocalization } from '../../../interfaces/localization'
import { IRadio } from '../../../interfaces/radio'

interface Props {
  menu: { [key: string]: boolean }
  radio: IRadio | undefined
  lang: ILocalization
}

const Header = ({ menu, radio, lang }: Props) => {
  return (
    <>
      {menu.favorites && (
        <div className='bread'>
          {lang.favorites ? lang.favorites.message : 'Favorites'}
        </div>
      )}
      {menu.recommend && <div className='bread'>Recommendations</div>}
      {menu.top && <div className='bread'>Popular radio station</div>}
      {menu.genres && (
        <div className='bread'>
          {lang.searchByGenre ? lang.searchByGenre.message : 'Search by genre'}
        </div>
      )}
      {menu.moods && (
        <div className='bread'>
          {lang.searchByMood ? lang.searchByMood.message : 'Search by mood'}
        </div>
      )}
      {menu.search && (
        <div className='bread'>
          {lang.searchByStation
            ? lang.searchByStation.message
            : 'Search station'}
        </div>
      )}
      {menu.user && (
        <div className='bread'>
          {lang.profile ? lang.profile.message : 'Profile'}
        </div>
      )}
      {menu.setting && <div className='bread'>Setting</div>}
      {menu.eula && (
        <div className='bread'>
          {lang.eula ? lang.eula.message : 'Terms of use'}
        </div>
      )}
      {menu.terms && (
        <div className='bread'>
          {lang.terms ? lang.terms.message : 'Privacy policy'}
        </div>
      )}
      {menu.player && (
        <section className='header-player'>
          <img src={radio?.cover} alt={radio?.name} />
          <article>
            <div>{radio?.name}</div>
            <span>{radio?.note}</span>
          </article>
        </section>
      )}
    </>
  )
}

export default Header

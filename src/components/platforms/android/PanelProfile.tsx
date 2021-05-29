import React from 'react'

import { ILocalization } from '../../../interfaces/localization'

interface Props {
  toggleMenu: (event: string) => void
  lang: ILocalization
}

const PanelProfile = ({ toggleMenu, lang }: Props) => {
  return (
    <section>
      <p>
        <svg>
          <use xlinkHref='#user'></use>
        </svg>
        {lang.loginTitle ? lang.loginTitle.message : 'Login'}
      </p>
      <p>
        <svg>
          <use xlinkHref='#add'></use>
        </svg>
        {lang.newStationTitle ? lang.newStationTitle.message : 'New Station'}
      </p>
      <p onClick={() => toggleMenu('setting')}>
        <svg>
          <use xlinkHref='#setting'></use>
        </svg>
        Settings
      </p>
      <p>
        <svg>
          <use xlinkHref='#logout'></use>
        </svg>
        {lang.logout ? lang.logout.message : 'Logout'}
      </p>
      <hr />
      <p onClick={() => toggleMenu('eula')}>
        {lang.eula ? lang.eula.message : 'Terms of use'}
      </p>
      <p onClick={() => toggleMenu('terms')}>
        {lang.terms ? lang.terms.message : 'Privacy policy'}
      </p>
    </section>
  )
  //TODO: нет перевода Settings
}

export default PanelProfile

import './css/panelSetting.css'

import React from 'react'

import { ILocalization } from '../../../interfaces/localization'
import { IRadio } from '../../../interfaces/radio'
import { listLocales } from '../../../lib/lang'

interface Props {
  radio: IRadio | undefined
  bitrateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  lang: ILocalization
  langChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const PanelSetting = ({
  radio,
  bitrateChange,
  lang,
  langChange,
}: Props): React.ReactElement => {
  return (
    <div className='panel'>
      <section>
        <p>
          <svg>
            <use xlinkHref='#quality'></use>
          </svg>
          <span>Quality:</span>
          {/* //TODO: нет перевода "Quality" */}
          <select value={radio?.activeBitRate} onChange={bitrateChange}>
            {radio?.streams !== undefined &&
              Object.keys(radio.streams).map((item) => (
                <option key={item} value={item}>
                  {item} kbps
                </option>
              ))}
          </select>
        </p>
        <p>
          <svg>
            <use xlinkHref='#language'></use>
          </svg>
          <span>{lang.lang ? lang.lang.message : 'Language'}:</span>
          <select value={lang.activeLang.message} onChange={langChange}>
            {listLocales.map((item, key) => (
              <option key={key} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </p>
      </section>
    </div>
  )
}

export default PanelSetting

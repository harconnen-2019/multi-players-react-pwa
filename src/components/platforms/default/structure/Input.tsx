import React from 'react'

import { ILocalization } from '../../../../interfaces/localization'
import styles from './Input.module.css'

interface Props {
  lang: ILocalization
  input: string | undefined
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchSubmit: () => void
}

const InputSearch = ({ lang, input, inputChange, searchSubmit }: Props) => {
  /**
   * Нажатие на Enter в поле поиска
   * @param e
   */
  const enterSubmit = (e: { keyCode: number }) => {
    e.keyCode === 13 && document?.getElementById('btnSearch')?.click()
  }
  return (
    <>
      <div className={styles.input}>
        <svg>
          <use xlinkHref='#search'></use>
        </svg>
        <input
          onKeyDown={(e) => enterSubmit(e)}
          type='search'
          value={input}
          onChange={inputChange}
          placeholder={
            lang.searchByStation
              ? lang.searchByStation.message
              : 'Search station'
          }
        />
      </div>
      <div className={styles.button}>
        <button id='btnSearch' onClick={searchSubmit} type='submit'>
          {lang.search ? lang.search.message : 'Search'}
        </button>
      </div>
    </>
  )
}

export default InputSearch

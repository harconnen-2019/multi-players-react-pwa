import React from 'react'
import { ILocalization } from '../../../interfaces/localization'

interface Props {
  lang: ILocalization
}

const InputSearch = ({ lang }: Props) => {
  return (
    <>
      <div className='input'>
        <svg>
          <use xlinkHref='#search'></use>
        </svg>
        <input
          //   onKeyDown={(e) => props.navStore.enterSubmit(e)}
          type='search'
          //   value={props.navStore.inputSearch}
          //   onChange={props.navStore.searchChange.bind(this)}
          placeholder={
            lang.searchByStation
              ? lang.searchByStation.message
              : 'Search station'
          }
        />
      </div>
      <div className='button'>
        <button
          id='btnSearch'
          //   onClick={props.navStore.searchSubmit.bind(this, props.navStore.inputSearch)}
          type='submit'
        >
          {lang.search ? lang.search.message : 'Search'}
        </button>
      </div>
    </>
  )
}

export default InputSearch

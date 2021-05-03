import React from 'react'
import { IRadio } from '../../../interfaces/radio'
import { ILocalization } from '../../../interfaces/localization'
import List from './List'
import './css/search.css'
import InputSearch from './InputSearch'

interface Props {
  lang: ILocalization
  favoritesId: Array<string>
  playList: IRadio[] | undefined
  favoritesChange: (change: boolean, radioId: string) => void
  input: string
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchPlayList: IRadio[] | undefined
  searchSubmit: () => void
}

const PanelSearch = ({
  lang,
  favoritesId,
  playList,
  favoritesChange,
  input,
  inputChange,
  searchPlayList,
  searchSubmit,
}: Props) => {
  const list =
    searchPlayList !== undefined && searchPlayList?.length > 0
      ? searchPlayList
      : playList
  return (
    <section className='search'>
      <InputSearch
        lang={lang}
        input={input}
        inputChange={inputChange}
        searchSubmit={searchSubmit}
      />

      {list !== undefined &&
        list.map((radio) => (
          <List
            key={radio.id}
            favoritesID={favoritesId}
            radio={radio}
            favoritesChange={favoritesChange}
          />
        ))}
      {list !== undefined && list.length >= 20 && (
        <footer>
          <p>
            {/* //TODO: фраза не переведена */}
            Didn't find the right station in the list? Use the search for + 50
            000 stations from all over the world
          </p>
          <InputSearch
            lang={lang}
            input={input}
            inputChange={inputChange}
            searchSubmit={searchSubmit}
          />
        </footer>
      )}
    </section>
  )
}

export default PanelSearch

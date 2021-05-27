import './css/search.css'

import React from 'react'

import { ILocalization } from '../../../interfaces/localization'
import { IRadio } from '../../../interfaces/radio'
import InputSearch from './InputSearch'
import List from './List'

interface Props {
  lang: ILocalization
  playList: IRadio[] | undefined
  favoritesChange: (change: boolean, radio: IRadio) => void
  input: string
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchPlayList: IRadio[] | undefined
  searchSubmit: () => void
  playSelectRadio: (radio: IRadio) => void
  toggleMenu: (event: string) => void
}

//TODO: 1. Показать прогресс поиска. 2. Вывести сообщение если пусто
const PanelSearch = ({
  lang,
  playList,
  favoritesChange,
  input,
  inputChange,
  searchPlayList,
  searchSubmit,
  playSelectRadio,
  toggleMenu,
}: Props) => {
  const list =
    searchPlayList !== undefined && searchPlayList?.length > 0
      ? searchPlayList
      : playList
  return (
    <div className='panel'>
      <section className='search'>
        <InputSearch
          lang={lang}
          input={input}
          inputChange={inputChange}
          searchSubmit={searchSubmit}
        />
        <br />
        <br />
        <div className='list-flex'>
          {list !== undefined &&
            list.map((radio) => (
              <List
                key={radio.id}
                radio={radio}
                favoritesChange={favoritesChange}
                playSelectRadio={playSelectRadio}
                toggleMenu={toggleMenu}
              />
            ))}
        </div>
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
    </div>
  )
}

export default PanelSearch
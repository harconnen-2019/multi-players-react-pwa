import React, { useState } from 'react'
import { IRadio } from '../../../interfaces/radio'
import { ILocalization } from '../../../interfaces/localization'
import List from './List'
import './css/search.css'
import InputSearch from './InputSearch'
// import { fetchFromApi } from '../../../lib/utils'
// import { ApiRadioListRequest } from '../../../interfaces/api'
// import * as CONFIG from '../../../config'

interface Props {
  lang: ILocalization
  favoritesId: Array<string>
  playList: IRadio[] | undefined
  favoritesChange: (change: boolean, radioId: string) => void
  apiSearch: string | undefined
}

const PanelSearch = ({
  lang,
  favoritesId,
  playList,
  favoritesChange,
  apiSearch,
}: Props) => {
  const [input, setInput] = useState<string>('')
  //   const [searchPlaylist, setSearchPlayList] = useState<IRadio[]>()
  const searchSubmit = async () => {
    // const searchFromApi = await fetchFromApi<ApiRadioListRequest>(
    //   `${CONFIG.PREFIX}${apiSearch}${input}`
    // )
    // console.log(searchFromApi)
  }
  return (
    <section className='search'>
      <InputSearch
        lang={lang}
        input={input}
        inputChange={(event) => setInput(event.target.value)}
        searchSubmit={searchSubmit}
      />

      {playList !== undefined &&
        playList.map((radio) => (
          <List
            key={radio.id}
            favoritesID={favoritesId}
            radio={radio}
            favoritesChange={favoritesChange}
          />
        ))}
      {playList !== undefined && playList.length >= 20 && (
        <footer>
          <p>
            {/* //TODO: фраза не переведена */}
            Didn't find the right station in the list? Use the search for + 50
            000 stations from all over the world
          </p>
          <InputSearch
            lang={lang}
            input={input}
            inputChange={(event) => setInput(event.target.value)}
            searchSubmit={searchSubmit}
          />
        </footer>
      )}
    </section>
  )
}

export default PanelSearch

import React, { useEffect, useState } from 'react'

import { listIdFavoritesContext } from '../../../App'
import { ILocalization } from '../../../interfaces/localization'
import { IRadio } from '../../../interfaces/radio'
import List from './List'

interface Props {
  playList: IRadio[] | undefined
  lang: ILocalization
  favoritesChange: (change: boolean, radio: IRadio) => void
  playSelectRadio: (radio: IRadio) => void
  toggleMenu: (event: string) => void
}

const PanelFavorites = ({
  playList,
  lang,
  favoritesChange,
  playSelectRadio,
  toggleMenu,
}: Props) => {
  const [favorites, setFavorites] = useState<IRadio[] | undefined>([])
  const favoritesId = React.useContext(listIdFavoritesContext)
  useEffect(() => {
    const result = playList?.filter(
      (item) => favoritesId.indexOf(item.id) !== -1
    )
    setFavorites(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritesId])
  return (
    <section>
      {favorites !== undefined && favorites.length !== 0 ? (
        favorites.map((item) => (
          <List
            key={item.id}
            radio={item}
            favoritesChange={favoritesChange}
            playSelectRadio={playSelectRadio}
            toggleMenu={toggleMenu}
          />
        ))
      ) : lang.favoritesEmpty ? (
        <p>
          {lang.favoritesEmpty.message.replace(
            '%add%',
            lang.favoritesEmptyAdd.message
          )}
        </p>
      ) : (
        <p>First add stations to your favorites</p>
      )}
    </section>
  )
}

export default PanelFavorites

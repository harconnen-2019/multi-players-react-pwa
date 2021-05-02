import React, { useState, useEffect } from 'react'
import { IRadio } from '../../../interfaces/radio'
import { ILocalization } from '../../../interfaces/localization'

interface Props {
  favoritesId: Array<string>
  playList: IRadio[] | undefined
  lang: ILocalization
}

const PanelFavorites = ({ favoritesId, playList, lang }: Props) => {
  const [favorites, setFavorites] = useState<IRadio[] | undefined>([])
  useEffect(() => {
    const result = playList?.filter(
      (item) => favoritesId.indexOf(item.id) !== -1
    )
    setFavorites(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <section>
      {favorites !== undefined && favorites.length !== 0 ? (
        favorites.map((item, key) => <div key={key}>{item.id}</div>)
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

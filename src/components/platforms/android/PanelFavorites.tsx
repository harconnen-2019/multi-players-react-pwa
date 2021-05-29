import { ILocalization } from '../../../interfaces/localization'
import { IRadio } from '../../../interfaces/radio'
import List from './modules/List'

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
  const favorites = playList?.filter((item) => item.favorite === true)
  return (
    <section className='list-flex'>
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

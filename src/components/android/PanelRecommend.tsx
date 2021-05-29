import { IRadio } from '../../interfaces/radio'
import List from './modules/List'

interface Props {
  playList: IRadio[] | undefined
  favoritesChange: (change: boolean, radio: IRadio) => void
  playSelectRadio: (radio: IRadio) => void
  toggleMenu: (event: string) => void
}

const PanelRecommend = ({
  playList,
  favoritesChange,
  playSelectRadio,
  toggleMenu,
}: Props) => {
  const recommend = playList?.filter((item) => item.recommend === true)
  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {recommend !== undefined &&
        recommend.map((item) => (
          <List
            key={item.id}
            radio={item}
            favoritesChange={favoritesChange}
            playSelectRadio={playSelectRadio}
            toggleMenu={toggleMenu}
          />
        ))}
    </section>
  )
}

export default PanelRecommend

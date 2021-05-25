import { IRadio } from '../../../interfaces/radio'
import List from './List'

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
    <div className='panel'>
      <section className='list-flex'>
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
    </div>
  )
}

export default PanelRecommend

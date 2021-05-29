import { IRadio } from '../../../interfaces/radio'
import List from './modules/List'

interface Props {
  playList: IRadio[] | undefined
  favoritesChange: (change: boolean, radio: IRadio) => void
  playSelectRadio: (radio: IRadio) => void
  toggleMenu: (event: string) => void
}

const PanelTop = ({
  playList,
  favoritesChange,
  playSelectRadio,
  toggleMenu,
}: Props) => {
  const top = playList?.filter((item) => item.top === true)
  return (
    <section className='list-flex'>
      {top !== undefined &&
        top.map((item) => (
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

export default PanelTop

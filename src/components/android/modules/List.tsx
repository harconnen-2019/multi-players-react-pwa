import { IRadio } from '../../../interfaces/radio'
import styles from './List.module.css'

interface Props {
  radio: IRadio
  favoritesChange: (change: boolean, radio: IRadio) => void
  playSelectRadio: (radio: IRadio) => void
  toggleMenu: (event: string) => void
}

const List = ({
  radio,
  favoritesChange,
  playSelectRadio,
  toggleMenu,
}: Props) => {
  const selectRadio = (radio: IRadio) => {
    toggleMenu('player')
    playSelectRadio(radio)
  }

  return (
    <div className={styles.list}>
      <div className={styles.listRadio}>
        <img
          className={styles.img}
          src={radio.cover.replace('100x100', '150x150')}
          alt={radio.name}
          loading='lazy'
          onClick={() => selectRadio(radio)}
        />
        <div
          className={`${styles.favorites} ${
            !radio.favorite ? styles.muted : ''
          }`}
        >
          <svg
            onClick={() => {
              favoritesChange(radio.favorite, radio)
            }}
          >
            <use xlinkHref={`#favorites${!radio.favorite ? '-add' : ''}`}></use>
          </svg>
        </div>
      </div>
      <div className={styles.title}>{radio.name}</div>
      <div className={styles.genres}>
        {radio.genres.length !== 0 && <span>{radio.genres.join()}</span>}
      </div>
    </div>
  )
}

export default List

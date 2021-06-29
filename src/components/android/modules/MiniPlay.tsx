import React from 'react'

import { IRadio } from '../../../interfaces/radio'
import styles from './MiniPlay.module.css'

interface Props {
  radio: IRadio | undefined
  pause: () => void
  toggleMenu: (event: string) => void
}

const miniPlay = ({ radio, pause, toggleMenu }: Props) => {
  return (
    <div className={styles.mini}>
      <div
        className={styles.radio}
        onClick={() => {
          toggleMenu('player')
        }}
      >
        <img src={radio?.cover} alt={radio?.name} />
        <article>
          <div>{radio?.name}</div>
          <span>{radio?.note}</span>
        </article>
      </div>
      <div className={styles.svg}>
        <div className={styles.play}>
          <svg>
            <use xlinkHref='#play'></use>
          </svg>
        </div>
        <div className={styles.cancel}>
          <svg
            onClick={() => {
              pause()
            }}
          >
            <use xlinkHref='#cancel'></use>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default miniPlay

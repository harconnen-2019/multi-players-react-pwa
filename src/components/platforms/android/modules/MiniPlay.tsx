import React from 'react'

import { IRadio } from '../../../../interfaces/radio'
import styles from './MiniPlay.module.css'

interface Props {
  radio: IRadio | undefined
  pause: () => void
}

const miniPlay = ({ radio, pause }: Props) => {
  return (
    <div className={styles.mini}>
      <div className={styles.radio}>
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

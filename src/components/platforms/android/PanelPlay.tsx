import React from 'react'

import { ThemeRequest } from '../../../interfaces/init'
import { IRadio } from '../../../interfaces/radio'
import Banner from '../../Banner'
import styles from './PanelPlay.module.css'

interface Props {
  banner: string | null | undefined
  radio: IRadio | undefined
  theme: ThemeRequest | undefined
  getIndexRadio: (index: number | undefined, act: string) => void
  play: () => void
  pause: () => void
  isPlay: boolean
}

const PanelPlay = (props: Props) => {
  return (
    <section>
      <Banner banner={props.banner} genres={props.radio?.genres} />
      <div className={styles.main}>
        <div className={styles.backward}>
          {props.theme !== undefined && !props.theme.single && (
            <svg
              onClick={() => props.getIndexRadio(props.radio?.index, 'prev')}
            >
              <use xlinkHref='#step-backward'></use>
            </svg>
          )}
        </div>
        <div className={styles.play}>
          {!props.isPlay ? (
            <svg
              onClick={() => {
                props.play()
              }}
            >
              <use xlinkHref='#play'></use>
            </svg>
          ) : (
            <svg
              onClick={() => {
                props.pause()
              }}
            >
              <use xlinkHref='#pause'></use>
            </svg>
          )}
        </div>
        <div className={styles.forward}>
          {props.theme !== undefined && !props.theme.single && (
            <svg
              onClick={() => props.getIndexRadio(props.radio?.index, 'next')}
            >
              <use xlinkHref='#step-forward'></use>
            </svg>
          )}
        </div>
      </div>
    </section>
  )
}

export default PanelPlay

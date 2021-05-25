import './css/panelPlay.css'

import React from 'react'

import { ThemeRequest } from '../../../interfaces/init'
import { IRadio } from '../../../interfaces/radio'
import Banner from '../../Banner'

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
    <div className='panel'>
      <section>
        <Banner banner={props.banner} genres={props.radio?.genres} />
        <main>
          <div className='backward'>
            {props.theme !== undefined && !props.theme.single && (
              <svg
                onClick={() => props.getIndexRadio(props.radio?.index, 'prev')}
              >
                <use xlinkHref='#step-backward'></use>
              </svg>
            )}
          </div>
          <div className='play'>
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
          <div className='forward'>
            {props.theme !== undefined && !props.theme.single && (
              <svg
                onClick={() => props.getIndexRadio(props.radio?.index, 'next')}
              >
                <use xlinkHref='#step-forward'></use>
              </svg>
            )}
          </div>
        </main>
      </section>
    </div>
  )
}

export default PanelPlay

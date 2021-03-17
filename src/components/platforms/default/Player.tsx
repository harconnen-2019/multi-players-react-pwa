import React from 'react'
import { IPlayer } from '../../../interfaces/player'
// import { listLocales } from '../../../lib/lang'
import './Player.css'
import Sprite from './Sprite'
import Volume from './Volume'

export const Player: React.FC<IPlayer> = (props) => {
  // console.log({})
  return (
    <>
      <div className='container'>
        <header>
          <div className='title'>
            <img src={props.radio?.cover} alt='' />
            <div>
              <div>{props.radio?.name}</div>
              <span>{props.radio?.note}</span>
            </div>
          </div>
          <nav>
            <Volume
              volume={props.volume}
              volumeChange={props.volumeChange}
              isMuted={props.isMuted}
              muted={props.muted}
            />
            {!props.theme.single && (
              <>
                <svg>
                  <use xlinkHref='#favorite'></use>
                </svg>
                <svg>
                  <use xlinkHref='#genres'></use>
                </svg>
                <svg>
                  <use xlinkHref='#moods'></use>
                </svg>
              </>
            )}
            <svg>
              <use xlinkHref='#setting'></use>
            </svg>
            {!props.theme.single && (
              <svg>
                <use xlinkHref='#bars'></use>
              </svg>
            )}
          </nav>
        </header>
        <div className='player'>
          <div className='backward'>
            <svg onClick={() => props.getIndexRadio(2, 'prev')}>
              <use xlinkHref='#step-backward'></use>
            </svg>
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
            <svg onClick={() => props.getIndexRadio(3, 'next')}>
              <use xlinkHref='#step-forward'></use>
            </svg>
          </div>
        </div>
        {/* <div style={{ marginTop: '200px', position: 'absolute' }}>
          <div>
            <select
              value={props.lang.activeLang.message}
              onChange={props.langChange}
            >
              {listLocales.map((item, key) => (
                <option key={key} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div> */}
      </div>
      <Sprite />
    </>
  )
}

export default Player
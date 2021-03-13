import React from 'react'
import { IPlayer } from '../../../interfaces/player'
import { listLocales } from '../../../lib/lang'

export const Player: React.FC<IPlayer> = (props) => {
  // console.log({})
  return (
    <>
      <div className='bg-gray-800 text-white h-screen'>
        <div>
          <img src={props.radio?.cover} alt='' />
          <p>
            <b>{props.radio?.name}</b>
          </p>
          <p>{props.radio?.note}</p>
        </div>
        <div>
          <span onClick={() => props.getIndexRadio(2, 'prev')}>Назад</span>
          <br />
          {!props.isPlay ? (
            <span
              onClick={() => {
                props.play()
              }}
            >
              Воспроизведение
            </span>
          ) : (
            <span
              onClick={() => {
                props.pause()
              }}
            >
              Пауза
            </span>
          )}
          <br />
          <span onClick={() => props.getIndexRadio(3, 'next')}>Вперед</span>
          <br />
          {!props.isMuted ? (
            <span
              onClick={() => {
                props.muted(true)
              }}
            >
              Звук выключить
            </span>
          ) : (
            <span
              onClick={() => {
                props.muted(false)
              }}
            >
              Звук включить
            </span>
          )}
          <br />
          <span>
            <input
              type='range'
              min='1'
              max='100'
              value={props.volume}
              onChange={props.volumeChange}
            />
          </span>
        </div>
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
      </div>
    </>
  )
}

export default Player

import React from 'react'
import './css/volume.css'

interface Props {
  volume: number
  volumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  muted: (stat: boolean) => void
  isMuted: boolean
}

function Volume({
  volume,
  volumeChange,
  muted,
  isMuted,
}: Props): React.ReactElement {
  return (
    <>
      {!isMuted ? (
        <svg
          className='no-mobile'
          onClick={() => {
            muted(true)
          }}
        >
          <use xlinkHref='#volume'></use>
        </svg>
      ) : (
        <svg
          className='no-mobile'
          onClick={() => {
            muted(false)
          }}
        >
          <use xlinkHref='#mute'></use>
        </svg>
      )}
      <input
        className='no-mobile'
        type='range'
        min='1'
        max='100'
        value={volume}
        onChange={volumeChange}
      />
    </>
  )
}

export default Volume

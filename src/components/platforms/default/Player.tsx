import React, { useState } from 'react'
import { IPlayer } from '../../../interfaces/player'
import './css/player.css'
import { Icon } from './Icon'
// import { listLocales } from '../../../lib/lang'
import Sprite from './Sprite'
import Volume from './Volume'
import Banner from '../../Banner'

type Menu = { [key: string]: boolean }

const Player: React.FC<IPlayer> = (props) => {
  const [menu, setMenu] = useState<Menu>({
    favorites: false,
    genres: false,
    moods: false,
    setting: false,
    search: false,
  })
  const toggleMenu = (event: string): void => {
    const newMenu: Menu = {}
    Object.keys(menu).forEach((key) => {
      if (key === event) {
        newMenu[key] = !menu[key]
      } else {
        newMenu[key] = false
      }
    })
    setMenu(newMenu)
  }
  return (
    <>
      <div className='container'>
        <header>
          <section onClick={() => toggleMenu('null')}>
            <img src={props.radio?.cover} alt={props.radio?.name} />
            <article>
              <div>{props.radio?.name}</div>
              <span>{props.radio?.note}</span>
            </article>
          </section>
          <nav>
            <Volume
              volume={props.volume}
              volumeChange={props.volumeChange}
              isMuted={props.isMuted}
              muted={props.muted}
            />
            {!props.theme.single && (
              <>
                <Icon
                  name='favorites'
                  active={menu.favorites}
                  onClick={() => toggleMenu('favorites')}
                />
                <Icon
                  name='genres'
                  active={menu.genres}
                  onClick={() => toggleMenu('genres')}
                />
                <Icon
                  name='moods'
                  active={menu.moods}
                  onClick={() => toggleMenu('moods')}
                />
              </>
            )}
            <Icon
              name='setting'
              active={menu.setting}
              onClick={() => toggleMenu('setting')}
            />
            {!props.theme.single && (
              <Icon
                name='bars'
                active={menu.search}
                onClick={() => toggleMenu('search')}
              />
            )}
          </nav>
        </header>
        <main className='player'>
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
        </main>
        <Banner />
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

import './css/player.css'

import React, { useState } from 'react'

import { IPlayer } from '../../../interfaces/player'
import Canvas from './Canvas'
import { Icon } from './Icon'
import { Index } from './Index'
import Sprite from './Sprite'

type Menu = { [key: string]: boolean }

const Player: React.FC<IPlayer> = (props) => {
  const [menu, setMenu] = useState<Menu>({
    canvas: false,
    favorites: false,
    genres: false,
    moods: false,
    setting: false,
    search: false,
  })
  const visibleTag = {
    genres: props.allGenres?.size !== 0 ? true : false,
    moods: props.allMoods?.size !== 0 ? true : false,
  }
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
      <header>
        {
          //TODO: Сделать крестик для отключения меню
        }
        <Icon
          name='bars'
          active={menu.canvas}
          onClick={() => toggleMenu('canvas')}
        />
        <img
          onClick={() => toggleMenu('null')}
          className='logo'
          src='static/images/logo-mini.png'
          alt='logo'
        />
      </header>
      {menu.canvas && (
        <Canvas
          lang={props.lang}
          toggleMenu={toggleMenu}
          visibleTag={visibleTag}
        />
      )}
      {!menu.canvas && (
        <Index
          lang={props.lang}
          toggleMenu={toggleMenu}
          visibleTag={visibleTag}
          playList={props.playList}
          favoritesChange={props.favoritesChange}
          playSelectRadio={props.playSelectRadio}
        />
      )}
      <Sprite />
    </>
  )
}

export default Player

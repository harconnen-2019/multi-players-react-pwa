import './css/player.css'

import React, { useState } from 'react'

import { IPlayer } from '../../../interfaces/player'
import Sprite from './Sprite'

type Menu = { [key: string]: boolean }

const Player: React.FC<IPlayer> = (props) => {
  const [menu, setMenu] = useState<Menu>({
    favorites: false,
    genres: false,
    moods: false,
    setting: false,
    search: false,
    vkm: false,
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
      <div className='container'>
        <header>Андроид</header>
      </div>
      <Sprite />
    </>
  )
}

export default Player

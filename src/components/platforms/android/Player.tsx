import './css/player.css'

import React, { useState } from 'react'

import { IPlayer } from '../../../interfaces/player'
import Canvas from './Canvas'
import { Icon } from './Icon'
import { Index } from './Index'
import MiniPanelPlay from './MiniPanelPlay'
import PanelFavorites from './PanelFavorites'
import PanelPlay from './PanelPlay'
import PanelRecommend from './PanelRecommend'
import PanelSetting from './PanelSetting'
import PanelTop from './PanelTop'
import Sprite from './Sprite'

type Menu = { [key: string]: boolean }

const Player: React.FC<IPlayer> = (props) => {
  const [menu, setMenu] = useState<Menu>({
    player: false,
    canvas: false,
    recommend: false,
    top: false,
    wallet: false,
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
      {!menu.player &&
        !menu.canvas &&
        !menu.recommend &&
        !menu.top &&
        !menu.wallet &&
        !menu.favorites &&
        !menu.genres &&
        !menu.moods &&
        !menu.setting &&
        !menu.search && (
          <Index
            lang={props.lang}
            toggleMenu={toggleMenu}
            visibleTag={visibleTag}
            playList={props.playList}
            favoritesChange={props.favoritesChange}
            playSelectRadio={props.playSelectRadio}
          />
        )}
      {menu.player && (
        <PanelPlay
          banner={props.banner}
          radio={props.radio}
          theme={props.theme}
          getIndexRadio={props.getIndexRadio}
          play={props.play}
          pause={props.pause}
          isPlay={props.isPlay}
        />
      )}
      <MiniPanelPlay />
      {menu.favorites && (
        <PanelFavorites
          playList={props.playList}
          lang={props.lang}
          favoritesChange={props.favoritesChange}
          playSelectRadio={props.playSelectRadio}
          toggleMenu={toggleMenu}
        />
      )}
      {menu.recommend && (
        <PanelRecommend
          playList={props.playList}
          favoritesChange={props.favoritesChange}
          playSelectRadio={props.playSelectRadio}
          toggleMenu={toggleMenu}
        />
      )}
      {menu.top && (
        <PanelTop
          playList={props.playList}
          favoritesChange={props.favoritesChange}
          playSelectRadio={props.playSelectRadio}
          toggleMenu={toggleMenu}
        />
      )}
      {menu.setting && (
        <PanelSetting
          radio={props.radio}
          bitrateChange={props.bitrateChange}
          lang={props.lang}
          langChange={props.langChange}
        />
      )}
      <Sprite />
    </>
  )
}

export default Player

import React, { useState } from 'react'

import { IPlayer } from '../../interfaces/player'
import { Icon } from '../shared/Icon'
import { Index } from './Index'
import Canvas from './modules/Canvas'
import Header from './modules/Header'
import MiniPlay from './modules/MiniPlay'
import Sprite from './modules/Sprite'
import PanelFavorites from './PanelFavorites'
import PanelPlay from './PanelPlay'
import PanelProfile from './PanelProfile'
import PanelRecommend from './PanelRecommend'
import PanelSearch from './PanelSearch'
import PanelSetting from './PanelSetting'
import PanelTags from './PanelTags'
import PanelText from './PanelText'
import PanelTop from './PanelTop'
import styles from './Player.module.css'

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
    user: false,
    terms: false,
    eula: false,
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
      <div className={styles.header}>
        <div>
          {menu.player ||
          menu.user ||
          menu.terms ||
          menu.eula ||
          menu.recommend ||
          menu.top ||
          menu.wallet ||
          menu.favorites ||
          menu.genres ||
          menu.moods ||
          menu.setting ||
          menu.search ? (
            <div style={{ display: 'inline-flex' }}>
              <Icon name='left' onClick={() => toggleMenu('null')} />
              <Header menu={menu} radio={props.radio} lang={props.lang} />
            </div>
          ) : (
            <>
              <Icon
                name='bars'
                active={menu.canvas}
                onClick={() => toggleMenu('canvas')}
              />
              <img
                onClick={() => toggleMenu('null')}
                className={styles.logo}
                src='static/images/logo-mini.png'
                alt='logo'
              />
            </>
          )}
        </div>
        <div>
          <Icon
            name='search'
            active={menu.search}
            onClick={() => toggleMenu('search')}
          />
        </div>
      </div>
      <div className={styles.panel}>
        {menu.canvas && (
          <Canvas
            lang={props.lang}
            toggleMenu={toggleMenu}
            visibleTag={visibleTag}
          />
        )}
        {!menu.player &&
          !menu.canvas &&
          !menu.user &&
          !menu.terms &&
          !menu.eula &&
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
        {!menu.player && props.isPlay && (
          <MiniPlay radio={props.radio} pause={props.pause} />
        )}
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
        {menu.genres && (
          <PanelTags
            tag='genres'
            allTags={props.allGenres}
            playList={props.playList}
            favoritesChange={props.favoritesChange}
            playSelectRadio={props.playSelectRadio}
            toggleMenu={toggleMenu}
          />
        )}
        {menu.moods && (
          <PanelTags
            tag='moods'
            allTags={props.allMoods}
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
        {menu.search && (
          <PanelSearch
            lang={props.lang}
            playList={props.playList}
            favoritesChange={props.favoritesChange}
            input={props.input}
            inputChange={props.inputChange}
            searchPlayList={props.searchPlayList}
            searchSubmit={props.searchSubmit}
            playSelectRadio={props.playSelectRadio}
            toggleMenu={toggleMenu}
          />
        )}
        {menu.user && (
          <PanelProfile toggleMenu={toggleMenu} lang={props.lang} />
        )}
        {menu.terms && <PanelText text='terms' radio={props.radio} />}
        {menu.eula && <PanelText text='eula' radio={props.radio} />}
        {!menu.player && props.isPlay && <div className={styles.down}></div>}
      </div>
      <Sprite />
    </>
  )
}

export default Player

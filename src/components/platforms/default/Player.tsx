import './css/player.css'

import React, { useState } from 'react'

import { IPlayer } from '../../../interfaces/player'
import Banner from '../../Banner'
import { Icon } from './Icon'
import PanelFavorites from './PanelFavorites'
import PanelSearch from './PanelSearch'
import PanelSetting from './PanelSetting'
import PanelTags from './PanelTags'
import PanelVkm from './PanelVkm'
import Sprite from './Sprite'
import Volume from './structure/Volume'

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
      <div className={`container theme-${props.theme?.theme || 'default'}`}>
        <header>
          {props.theme?.platform === 'vkm' && (
            <nav className='vkm'>
              <Icon
                name='bars'
                active={menu.vkm}
                onClick={() => toggleMenu('vkm')}
              />
            </nav>
          )}
          <section onClick={() => toggleMenu('null')}>
            <img src={props.radio?.cover} alt={props.radio?.name} />
            <article>
              <div>{props.radio?.name}</div>
              <span>{props.radio?.note}</span>
            </article>
          </section>
          {props.theme?.platform !== 'vkm' && (
            <nav>
              <Volume
                volume={props.volume}
                volumeChange={props.volumeChange}
                isMuted={props.isMuted}
                muted={props.muted}
              />
              {props.theme !== undefined && !props.theme.single && (
                <>
                  <Icon
                    name='favorites'
                    active={menu.favorites}
                    onClick={() => toggleMenu('favorites')}
                  />
                  {visibleTag.genres && (
                    <Icon
                      name='genres'
                      active={menu.genres}
                      onClick={() => toggleMenu('genres')}
                    />
                  )}
                  {visibleTag.moods && (
                    <Icon
                      name='moods'
                      active={menu.moods}
                      onClick={() => toggleMenu('moods')}
                    />
                  )}
                </>
              )}
              <Icon
                name='setting'
                active={menu.setting}
                onClick={() => toggleMenu('setting')}
              />
              {props.theme !== undefined && !props.theme.single && (
                <Icon
                  name='bars'
                  active={menu.search}
                  onClick={() => toggleMenu('search')}
                />
              )}
            </nav>
          )}
        </header>
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
        {menu.vkm && (
          <PanelVkm
            lang={props.lang}
            input={props.input}
            inputChange={props.inputChange}
            searchSubmit={props.searchSubmit}
            toggleMenu={toggleMenu}
            single={props.theme?.single}
            visibleTag={visibleTag}
          />
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
        {/* {menu.moods && <section></section>} */}
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
        {props.banner &&
          !menu.favorites &&
          !menu.genres &&
          !menu.moods &&
          !menu.setting &&
          !menu.search &&
          !menu.vkm && (
            <Banner banner={props.banner} genres={props.radio?.genres} />
          )}
      </div>
      <Sprite />
    </>
  )
}

export default Player

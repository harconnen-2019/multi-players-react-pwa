import React, { useState } from 'react'
import { IPlayer } from '../../../interfaces/player'
import './css/player.css'
import { Icon } from './Icon'
import Sprite from './Sprite'
import Volume from './Volume'
import Banner from '../../Banner'
import PanelSetting from './PanelSetting'
import PanelFavorites from './PanelFavorites'
import PanelTags from './PanelTags'
import PanelSearch from './PanelSearch'

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
      <div className='container theme-default'>
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
            {props.theme !== undefined && !props.theme.single && (
              <>
                <Icon
                  name='favorites'
                  active={menu.favorites}
                  onClick={() => toggleMenu('favorites')}
                />
                {props.allGenres?.size !== 0 && (
                  <Icon
                    name='genres'
                    active={menu.genres}
                    onClick={() => toggleMenu('genres')}
                  />
                )}
                {props.allMoods?.size !== 0 && (
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
        {menu.favorites && (
          <PanelFavorites
            favoritesId={props.favoritesId}
            playList={props.playList}
            lang={props.lang}
            favoritesChange={props.favoritesChange}
          />
        )}
        {menu.genres && (
          <PanelTags
            tag='genres'
            allTags={props.allGenres}
            favoritesId={props.favoritesId}
            playList={props.playList}
            favoritesChange={props.favoritesChange}
          />
        )}
        {menu.moods && (
          <PanelTags
            tag='moods'
            allTags={props.allMoods}
            favoritesId={props.favoritesId}
            playList={props.playList}
            favoritesChange={props.favoritesChange}
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
            favoritesId={props.favoritesId}
            playList={props.playList}
            favoritesChange={props.favoritesChange}
            input={props.input}
            inputChange={props.inputChange}
            searchPlayList={props.searchPlayList}
            searchSubmit={props.searchSubmit}
          />
        )}
        {props.banner &&
          //TODO: передать в баннер genres
          !menu.favorites &&
          !menu.genres &&
          !menu.moods &&
          !menu.setting &&
          !menu.search && <Banner banner={props.banner} />}
      </div>
      <Sprite />
    </>
  )
}

export default Player

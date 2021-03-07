/**
 * Контроллер плеера
 * @module components/App
 */
import React, { useState, useEffect } from 'react'
import * as CONFIG from './config'
import * as type from './interfaces/initializing'
import * as create from './lib/initializing'
import { ILocalization } from './interfaces/localization'
import {
  getCookie,
  fetchFromApi,
  STATUS,
  PLATFORM as DEFAULT_PLATFORM,
} from './lib/utils'
import { ApiRadioRequest, IRadio } from './interfaces/radio'
import { createPlayList } from './lib/radio'

// import {  } from './lib/lang'

const SESSION: string | undefined = getCookie('session')
const PLATFORM: string = process.env.REACT_APP_PLATFORM || DEFAULT_PLATFORM.PWA

/**
 * Сборка всего плеера и бизнес логика
 * @returns {void}
 */
function App() {
  const [initStatus, setInitStatus] = useState(STATUS.INIT)
  const [lang, setLang] = useState<ILocalization>({})
  const [playList, setPlayList] = useState<IRadio[]>()
  const [playRadio, setPlayRadio] = useState<IRadio>()

  let linkRadios: type.LinkRadiosRequest
  let linkFavoritesRadios: type.LinkFavoritesRequest
  let playerTheme: type.PlayerThemeRequest
  let countersForHead: type.CountersIdRequest
  let advertising: type.AdvertisingRequest

  useEffect(() => {
    consolTitle()
    setInitStatus(STATUS.LOADING)
    loadLocalization()
    loadInit()

    /**
     * //TODO: ТОП радио ???
     * //TODO: Список радио для поиска
     */
    /**
     * //TODO: Жанры
     * //TODO: Настроения
     */
    /**
     * //TODO: Тема плеера
     * //TODO: Кастомные стили плеера
     * //TODO: Favicon плеера
     */
    /**
     * //TODO: Установка заголовка из manifest.json
     */
    /**
     * //TODO: Deeplink
     */
    /**
     * //TODO: Запуск счетчиков
     */
    /**
     * //TODO: Авторизация в соцсетях
     */

    setInitStatus(STATUS.LOADED)
  }, [])

  /**
   * Консольный баннер для отображения данных о плеере
   * @function
   * @returns {void}
   */
  function consolTitle(): void {
    console.group('Init player:')
    console.info(CONFIG.VERSION, `Platform: ${PLATFORM}`)
    CONFIG.DEBUG && console.log('env : ' + process.env.NODE_ENV)
    CONFIG.DEBUG && console.log('session : %s', SESSION)
    console.groupEnd()
  }

  /**
   * Инициализация плеера, создание объекта Init  в состояние
   * @function
   * @returns {void}
   */
  async function loadInit() {
    // Инициализация
    const init = await fetchFromApi<type.ApiRequest>(
      `${CONFIG.PREFIX}${CONFIG.URL_INIT}?session=${SESSION}`
    )
    linkRadios = create.linkRadiosFromApi(init)
    linkFavoritesRadios = create.linkFavoritesFromApi(init)
    playerTheme = create.playerThemeFromApi(init, PLATFORM)
    countersForHead = create.countersIdFomApi(init)
    advertising = create.advertisingFromApi(init, PLATFORM)
    CONFIG.DEBUG && console.log('Инициализация : ', init)

    // Загрузка избранного
    const favoritesApiRadios = await fetchFromApi<ApiRadioRequest>(
      `${CONFIG.PREFIX}${linkFavoritesRadios.favoriteList}?session=${SESSION}`
    )
    let radioFavorites: Array<IRadio> = []
    if (favoritesApiRadios.data.list_radio.length !== 0) {
      radioFavorites = createPlayList(
        favoritesApiRadios.data.list_radio,
        PLATFORM
      )
      CONFIG.DEBUG && console.log('Загрузка избранного : ', radioFavorites)
    } else {
      CONFIG.DEBUG && console.log('В избранном пусто')
    }
    // Загрузка рекомендованных
    const recommendApiRadios = await fetchFromApi<ApiRadioRequest>(
      `${CONFIG.PREFIX}${linkRadios.recommend}&session=${SESSION}`
    )
    const radioRecommend: Array<IRadio> = createPlayList(
      recommendApiRadios.data.list_radio,
      PLATFORM
    )
    CONFIG.DEBUG && console.log('Загрузка рекомендованных : ', radioRecommend)

    // Полный Плейлист без дубликатов
    let fullPlayList: Array<IRadio>
    if (radioFavorites.length !== 0) {
      fullPlayList = Array.from(new Set(radioFavorites.concat(radioRecommend)))
      let i: number = 0
      fullPlayList.forEach((element) => {
        element.index = i
        i++
      })
    } else {
      fullPlayList = radioRecommend
    }
    setPlayList(fullPlayList)
    CONFIG.DEBUG && console.log('Совмещенный плейлист : ', fullPlayList)

    // .catch((err) => {
    //   setInitStatus(STATUS.ERROR)
    //   console.error('Loading init failed', err)
    // })
  }

  /**
   * Загрузка локализации из api или localStorage
   * @function
   * @returns {void}
   */
  function loadLocalization(): void {
    if (localStorage.getItem('player-localization')) {
      const getLocalization = localStorage.getItem('player-localization')
      if (typeof getLocalization === 'string') {
        setLang(JSON.parse(getLocalization))
        CONFIG.DEBUG &&
          console.log(
            'Локализация из localStorage : ',
            JSON.parse(getLocalization)
          )
      }
    } else {
      fetchFromApi<ILocalization>(`/static/locales/en/messages.json`)
        .then((result) => {
          result.activeLang = { message: 'en' }
          setLang(result)
          localStorage.setItem('player-localization', JSON.stringify(result))
          CONFIG.DEBUG && console.log('Локализация из api : ', result)
        })
        .catch((err) => {
          setInitStatus(STATUS.ERROR)
          console.error('Loading lang failed', err)
        })
    }
  }

  return (
    <div className='bg-gray-800 text-white h-screen'>
      <p>
        Edit 1<code>src/App.tsx</code> and save to reload.
      </p>
      <a href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
        Learn React
      </a>
    </div>
  )
}

export default App

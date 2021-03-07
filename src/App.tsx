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
  report,
} from './lib/utils'
import { ApiRadioRequest, IRadio } from './interfaces/radio'
import { createArrayTags, createPlayList } from './lib/radio'

// import {  } from './lib/lang'

/**
 * Сборка всего плеера и бизнес логика
 * @returns {void}
 */
function App() {
  const [initStatus, setInitStatus] = useState(STATUS.INIT)
  const [lang, setLang] = useState<ILocalization>({})
  const [playList, setPlayList] = useState<IRadio[]>()
  const [playRadio, setPlayRadio] = useState<IRadio>()

  const SESSION: string | undefined = getCookie('session')
  const PLATFORM: string =
    process.env.REACT_APP_PLATFORM || DEFAULT_PLATFORM.PWA

  let linkRadios: type.LinkRadiosRequest
  let linkFavoritesRadios: type.LinkFavoritesRequest
  let playerTheme: type.PlayerThemeRequest
  let countersForHead: type.CountersIdRequest
  let advertising: type.AdvertisingRequest
  let allGenresFromPlayList
  let allMoodsFromPlayList

  useEffect(() => {
    consolTitle()
    // setInitStatus(STATUS.LOADING)
    loadLocalization()
    loadInit()

    /**
     * //TODO: ТОП радио ???
     * //TODO: Список радио для поиска
     */
    /**
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

    // setInitStatus(STATUS.LOADED)
  }, [])

  /**
   * Консольный баннер для отображения данных о плеере
   * @function
   * @returns {void}
   */
  function consolTitle(): void {
    console.group('Init player:')
    console.info(CONFIG.VERSION, `Platform: ${PLATFORM}`)
    report('env : ' + process.env.NODE_ENV)
    report('session : %s', SESSION)
    console.groupEnd()
  }

  /**
   * Инициализация плеера, создание объекта Init  в состояние
   * @function
   * @returns {void}
   */
  async function loadInit() {
    try {
      // Инициализация
      const init = await fetchFromApi<type.ApiRequest>(
        `${CONFIG.PREFIX}${CONFIG.URL_INIT}?session=${SESSION}`
      )
      linkRadios = create.linkRadiosFromApi(init)
      linkFavoritesRadios = create.linkFavoritesFromApi(init)
      playerTheme = create.playerThemeFromApi(init, PLATFORM)
      countersForHead = create.countersIdFomApi(init)
      advertising = create.advertisingFromApi(init, PLATFORM)
      report('Инициализация : ', init)

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
        report('Загрузка избранного : ', radioFavorites.length)
      } else {
        report('В избранном пусто')
      }
      // Загрузка рекомендованных
      const recommendApiRadios = await fetchFromApi<ApiRadioRequest>(
        `${CONFIG.PREFIX}${linkRadios.recommend}&session=${SESSION}`
      )
      const radioRecommend: Array<IRadio> = createPlayList(
        recommendApiRadios.data.list_radio,
        PLATFORM
      )
      report('Загрузка рекомендованных : ', radioRecommend.length)

      // Полный Плейлист без дубликатов
      let fullPlayList: Array<IRadio>
      if (radioFavorites.length !== 0) {
        fullPlayList = Array.from(
          new Set(radioFavorites.concat(radioRecommend))
        )
        let i: number = 0
        fullPlayList.forEach((element) => {
          element.index = i
          i++
        })
      } else {
        fullPlayList = radioRecommend
      }
      setPlayList(fullPlayList)
      report('Совмещенный плейлист : ', fullPlayList.length)
      //Собираем жанры и настроения
      allGenresFromPlayList = createArrayTags(fullPlayList, 'genres')
      allMoodsFromPlayList = createArrayTags(fullPlayList, 'moods')

      //TODO: Кэшировать последнее радио (продумать индексы)
      setPlayRadio(fullPlayList[0])
      setInitStatus(STATUS.LOADED)
    } catch {
      setInitStatus(STATUS.ERROR)
      console.error('Loading init failed')
    }
  }

  /**
   * Загрузка локализации из api или localStorage
   * @function
   * @returns {void}
   */
  async function loadLocalization() {
    if (localStorage.getItem('player-localization')) {
      const getLocalization = localStorage.getItem('player-localization')
      if (typeof getLocalization === 'string') {
        setLang(JSON.parse(getLocalization))
        report('Локализация из localStorage : ', JSON.parse(getLocalization))
      }
    } else {
      try {
        const result = await fetchFromApi<ILocalization>(
          `/static/locales/en/messages.json`
        )
        result.activeLang = { message: 'en' }
        setLang(result)
        localStorage.setItem('player-localization', JSON.stringify(result))
        report('Локализация из api : ', result)
      } catch {
        setInitStatus(STATUS.ERROR)
        console.error('Loading lang failed')
      }
    }
  }

  if (initStatus === STATUS.INIT) {
    return <>Loading....</>
  } else if (initStatus === STATUS.ERROR) {
    return <>Error....</>
  } else {
    return (
      <div className='bg-gray-800 text-white h-screen'>
        <div>
          <img src={playRadio?.cover} />
          <p>
            <b>{playRadio?.name}</b>
          </p>
          <p>{playRadio?.note}</p>
        </div>
      </div>
    )
  }
}

export default App

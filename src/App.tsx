/**
 * Контроллер плеера
 * @module components/App
 */
import React, { useState, useEffect } from 'react'
import * as CONFIG from './config'
import { ApiInitRequest } from './api/init'
import { InitPlayer } from './interfaces/init'
import { createInitFromApi } from './lib/initializing'
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

  const apiPlayer: { [key: string]: string } = {}
  let allGenresFromPlayList
  let allMoodsFromPlayList

  useEffect(() => {
    consolTitle()
    // setInitStatus(STATUS.LOADING)
    loadLocalization()
    loadInit()

    /**
     * //TODO: ТОП радио ???
     * //TODO: Список радио для поиска ?? пока fullPlayList
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
   * Инициализация плеера
   * @function
   * @returns {void}
   */
  async function loadInit() {
    try {
      // Инициализация
      const init = await fetchFromApi<ApiInitRequest>(
        `${CONFIG.PREFIX}${CONFIG.URL_INIT}?session=${SESSION}`
      )
      const initPlayer: InitPlayer = createInitFromApi(init, PLATFORM)
      // Сохранить данные в "apiPlayer" для плеера
      apiPlayer.search = initPlayer.api.search
      report('Инициализация : ', init)

      // Загрузка избранного
      const favoritesListFromApi = await fetchFromApi<ApiRadioRequest>(
        `${CONFIG.PREFIX}${initPlayer.api.favoriteList}?session=${SESSION}`
      )
      // Загрузка рекомендованных
      const recommendListFromApi = await fetchFromApi<ApiRadioRequest>(
        `${CONFIG.PREFIX}${initPlayer.api.recommend}&session=${SESSION}`
      )
      const fullPlayList: Array<IRadio> = createPlayList(
        recommendListFromApi.data.list_radio,
        favoritesListFromApi.data.list_radio,
        PLATFORM,
        SESSION,
        {
          favoriteAdd: initPlayer.api.favoriteAdd,
          favoriteDel: initPlayer.api.favoriteDel,
        }
      )
      setPlayList(fullPlayList)
      report('Загрузка плейлиста : ', fullPlayList)

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

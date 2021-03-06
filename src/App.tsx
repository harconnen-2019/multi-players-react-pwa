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

  let linkRadios: type.LinkRadiosRequest
  let linkFavoritesRadios: type.LinkFavoritesRequest
  let playerTheme: type.PlayerThemeRequest
  let countersForHead: type.CountersIdRequest
  let advertising: type.AdvertisingRequest

  useEffect(() => {
    consolTitle()
    setInitStatus(STATUS.LOADING)
    loadInit()
    loadLocalization()
    /**
     * //TODO: Рекомендуемые радио
     * //TODO: ТОП радио
     * //TODO: Избранные радио
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
     * //TODO: Авторизация в соцсетях
     */
    /**
     * //TODO: Запуск счетчиков
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
  function loadInit(): void {
    fetchFromApi<type.ApiRequest>(
      `${CONFIG.PREFIX}${CONFIG.URL_INIT}?session=${SESSION}`
    )
      .then((data) => {
        linkRadios = create.linkRadiosFromApi(data)
        linkFavoritesRadios = create.linkFavoritesFromApi(data)
        playerTheme = create.playerThemeFromApi(data, PLATFORM)
        countersForHead = create.countersIdFomApi(data)
        advertising = create.advertisingFromApi(data, PLATFORM)
        CONFIG.DEBUG && console.log('Инициализация : ', data)
      })
      .catch((err) => {
        setInitStatus(STATUS.ERROR)
        console.error('Loading init failed', err)
      })
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

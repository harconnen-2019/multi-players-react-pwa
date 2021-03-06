/**
 * Контроллер плеера
 * @module components/App
 */
import React, { useState, useEffect } from 'react'
import * as config from './config'
import { IApiInit, ICreateInit } from './interfaces/initializing'
import { ILocalization } from './interfaces/localization'
import { fetchFromApi, SelectStatus } from './lib/utils'
import { getCookie, createInit } from './lib/initializing'
import { getLang } from './lib/lang'

/**
 * Сборка всего плеера и бизнес логика
 * @returns {void}
 */
function App() {
  const [initStatus, setInitStatus] = useState(SelectStatus.init)
  const [init, setInit] = useState<ICreateInit | null>(null)
  const [lang, setLang] = useState<ILocalization>({})

  useEffect(() => {
    consolTitle()
    setInitStatus(SelectStatus.loading)
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

    setInitStatus(SelectStatus.loaded)
  }, [])

  /**
   * Консольный баннер для отображения данных о плеере
   * @function
   * @returns {void}
   */
  function consolTitle(): void {
    console.group('Init player:')
    console.info(config.VERSION)
    config.DEBUG && console.log('env : ' + process.env.NODE_ENV)
    config.DEBUG && console.log('session : %s', getCookie('session'))
    console.groupEnd()
  }

  /**
   * Инициализация плеера, создание объекта Init  в состояние
   * @function
   * @returns {void}
   */
  function loadInit(): void {
    fetchFromApi<IApiInit>(
      `${config.PREFIX}${config.URL_INIT}?session=${getCookie('session')}`
    )
      .then((data) => {
        const result: ICreateInit = createInit(data)
        setInit(result)
        config.DEBUG && console.log('Инициализация : ', result)
      })
      .catch((err) => {
        setInitStatus(SelectStatus.error)
        console.error('Loading init failed', err)
      })
  }

  /**
   * Загрузка локализации из api или localStorage
   * @function
   * @returns {void}
   */
  function loadLocalization(): void {
    const activeLang = getLang()
    if (localStorage.getItem('player-localization')) {
      const getLocalization = localStorage.getItem('player-localization')
      if (typeof getLocalization === 'string') {
        setLang(JSON.parse(getLocalization))
        config.DEBUG &&
          console.log(
            'Локализация из localStorage : ',
            JSON.parse(getLocalization)
          )
      }
    } else {
      fetchFromApi<ILocalization>(`/static/locales/${activeLang}/messages.json`)
        .then((data) => {
          const result: ILocalization = data
          result.activeLang = { message: activeLang }
          setLang(result)
          localStorage.setItem('player-localization', JSON.stringify(result))
          config.DEBUG && console.log('Локализация из api : ', result)
        })
        .catch((err) => {
          setInitStatus(SelectStatus.error)
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

/**
 * Контроллер плеера
 * @module components/App
 */
import React, { useState, useEffect, Suspense, useRef } from 'react'
import videojs from 'video.js'

import * as CONFIG from './config'
import { ApiInitRequest, ApiRadioListRequest } from './interfaces/api'
import { InitPlayer, ThemeRequest } from './interfaces/init'
import { createInitFromApi } from './lib/initializing'
import { IRadio } from './interfaces/radio'
import {
  getCookie,
  fetchFromApi,
  STATUS,
  PLATFORM as DEFAULT_PLATFORM,
  report,
} from './lib/utils'
import { createArrayTags, createPlayList } from './lib/radio'
import { useLocalization } from './hooks/localization'

const Player = React.lazy(() => import('./components/platforms/default/Player'))

/**
 * Сборка всего плеера и бизнес логика
 * @returns {void}
 */
function App() {
  const SESSION: string | undefined = getCookie('session')
  const PLATFORM: string =
    process.env.REACT_APP_PLATFORM || DEFAULT_PLATFORM.PWA

  let theme: ThemeRequest = {
    single: false,
    favicon: '',
    themeDefault: 'default',
    theme: 'default',
    cover: '',
    css: '',
  }

  const [status, setStatus] = useState(STATUS.INIT)
  // eslint-disable-next-line
  const [isWarning, setIsWarning] = useState<boolean>(false)
  const { localization, selectLang } = useLocalization()

  const [playList, setPlayList] = useState<IRadio[]>()
  //TODO: Сделать для radio кеширование localStorage
  const [radio, setRadio] = useState<IRadio>()
  const [volume, setVolume] = useState<number>(50)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const videoRef = useRef<any>(null)
  const [player, setPlayer] = useState<object | null>(null)

  let allGenresFromPlayList
  let allMoodsFromPlayList

  useEffect(() => {
    consolTitle()
    setStatus(STATUS.LOADING)
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

    // setStatus(STATUS.LOADED)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Инициализация videoJs, смена радио при выборе
  // Управление воспроизведением
  useEffect(() => {
    if (!videoRef || status !== STATUS.LOADED) return
    let actPlay: boolean = isPlay
    if (player) {
      // Инициализация плеера уже прошла? меняем радио
      pause()
      //TODO: Громкость не регулирует первое смонтированное радио
      videoRef.current.volume = volume / 100
      videoRef.current.src = radio?.playStream[0].src
      videoRef.current.type = radio?.playStream[0].type
      videoRef.current.load()
      report('Смена радио в videoJs : ', videoRef)
      actPlay && play()
    } else {
      // Инициируем плеер
      const initPlayer = videojs(
        videoRef.current,
        {
          autoplay: false,
          controls: false,
          sources: radio?.playStream,
        },
        function onPlayerReady() {
          report('Готовность плеера : ', initPlayer)
        }
      )
      setPlayer(initPlayer)
      return () => {
        if (player) initPlayer.dispose()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radio, status])

  // Загрузка радио, выбранное на странице из API
  // useEffect(() => {
  //   if (radioId !== '') {
  //     getData(`${config.URL_GET_RADIO}id=${radioId}`).then((data) => {
  //       const {
  //         data: { list_radio: apiRadio },
  //       } = data

  //       if (getStreamFromApi(apiRadio[0].streams)) {
  //         const radio = addRadioFromPage(apiRadio)
  //         setIsPlay(true)
  //         setRadio(radio)
  //         addStorageActiveRadio(radio)

  //         config.DEBUG &&
  //           console.log('Добавлено радио со страницы по ID', radio)
  //       } else {
  //         // Выводим предупреждение что радио не работает
  //         setIsWarning(true)
  //         setTimeout(() => {
  //           setIsWarning(false)
  //         }, 3000)
  //       }
  //     })
  //   }
  // }, [radioId])

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
        `${CONFIG.URL_INIT}?session=${SESSION}`
      )
      const initPlayer: InitPlayer = createInitFromApi(init, PLATFORM)
      theme = initPlayer.player
      report('Инициализация : ', initPlayer)

      // Загрузка избранного
      const favoritesListFromApi = await fetchFromApi<ApiRadioListRequest>(
        `${CONFIG.PREFIX}${initPlayer.api.favoriteList}?session=${SESSION}`
      )
      // Загрузка рекомендованных
      const recommendListFromApi = await fetchFromApi<ApiRadioListRequest>(
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
      report('Загрузка плейлиста : ', fullPlayList.length)

      //Собираем жанры и настроения
      allGenresFromPlayList = createArrayTags(fullPlayList, 'genres')
      allMoodsFromPlayList = createArrayTags(fullPlayList, 'moods')

      //TODO: Кэшировать последнее радио (продумать индексы)
      setRadio(fullPlayList[0])
      setStatus(STATUS.LOADED)
    } catch {
      setStatus(STATUS.ERROR)
      console.error('Loading init failed')
    }
  }

  /**
   * Переключение радио в плейлисте, вызывается кеширование
   * @method
   * @param {Number} index  - Индекс активного радио
   * @param {String} act    - Направление переключения (next/prev)
   */
  const getIndexRadio = (index: number, act: string): void => {
    //TODO: переделать на switch - три варианта + index
    // const actRadio = getradioFromPlayList(radioPlayList, index, act)
    playList !== undefined && setRadio(playList[index])
    // addStorageActiveRadio(actRadio)
  }

  /**
   * Воспроизведение
   * Таймаут для инициализации VAST
   * @method
   */
  const play = (): void => {
    //TODO: Установка заголовка текущего радио
    // initializeIMA(
    //   `${config.URL_GET_VAST + radio}&cover_h=200&cover_w=200`.vast,
    //   true
    // )
    // config.DEBUG && console.log('VAST: ' + config.URL_GET_VAST + radio.vast)
    setTimeout(() => {
      videoRef.current.play()
      setIsPlay(true)
    }, 1000)
  }

  /**
   * Пауза
   * @method
   */
  const pause = (): void => {
    videoRef.current.pause()
    setIsPlay(false)
  }

  /**
   * Переключение состояние звука и отображения иконок
   * @method
   * @param {boolean} stat - состояние
   */
  const muted = (stat: boolean): void => {
    videoRef.current.muted = stat
    setIsMuted(stat)
  }

  /**
   * Установка громкости плеера и бегунок
   * @method
   * @param {*} e
   */
  const volumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    videoRef.current.volume = volume / 100
    setVolume(parseInt(event.target.value, 10))
  }

  if (status === STATUS.INIT) {
    return <div>Загрузка...</div>
  } else if (status === STATUS.ERROR) {
    return <>Error....</>
  } else {
    return (
      <>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Player
            theme={theme}
            lang={localization}
            playList={playList}
            radio={radio}
            isPlay={isPlay}
            play={play}
            pause={pause}
            isMuted={isMuted}
            muted={muted}
            volume={volume}
            getIndexRadio={getIndexRadio}
            volumeChange={volumeChange}
            langChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => {
              selectLang(ev.target.value)
            }}
            genres={allGenresFromPlayList}
            moods={allMoodsFromPlayList}
            isWarning={isWarning}
            // videoRef={videoRef}
          />
        </Suspense>
        <div data-vjs-player>
          <video
            id='content_audio'
            ref={videoRef}
            className='video-js'
            preload='none'
            playsInline
            hidden
          />
          <div id='ad-container'></div>
        </div>
      </>
    )
  }
}

export default App

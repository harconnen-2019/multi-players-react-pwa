/**
 * Контроллер плеера
 * @module components/App
 */
import React, { useState, useEffect, Suspense, useRef } from 'react'
import videojs from 'video.js'

import * as CONFIG from './config'
import { ApiInitRequest, ApiRadioListRequest } from './interfaces/api'
import { InitPlayer } from './interfaces/init'
import { IRadio } from './interfaces/radio'
import { createInitFromApi } from './lib/initializing'
import {
  getCookie,
  fetchFromApi,
  report,
  addFavicon,
  refreshBanner,
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
  const PLATFORM: string = process.env.REACT_APP_PLATFORM || CONFIG.PLATFORM.PWA

  const [status, setStatus] = useState(CONFIG.STATUS.INIT)
  // eslint-disable-next-line
  const [isWarning, setIsWarning] = useState<boolean>(false)
  const { localization, selectLang } = useLocalization()
  const [init, setInit] = useState<InitPlayer>()

  const [playList, setPlayList] = useState<IRadio[]>()
  const [favoritesId, setFavoritesId] = useState<Array<string>>([])
  //TODO: Сделать для radio кеширование localStorage
  const [radio, setRadio] = useState<IRadio>()
  const [volume, setVolume] = useState<number>(50)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [timeAds, setTimeAds] = useState<number>(new Date().getTime())

  const videoRef = useRef<any>(null)
  // const [player, setPlayer] = useState<object | null>(null)

  let allGenresFromPlayList
  let allMoodsFromPlayList

  useEffect(() => {
    consolTitle()
    setStatus(CONFIG.STATUS.LOADING)
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
    if (!videoRef || status !== CONFIG.STATUS.LOADED) return
    let actPlay: boolean = isPlay
    // Инициируем плеер
    const initPlayer = videojs(
      videoRef.current,
      {
        autoplay: false,
        controls: false,
        sources: radio?.playStream,
      },
      function onPlayerReady() {
        report('VIDEOJS инициализирован : ', initPlayer)
      }
    )
    actPlay && play()
    // setPlayer(initPlayer)
    return () => {
      initPlayer.dispose()
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
   * Инициализация плеера.
   * Загружает по URL 'URL_INIT' из конфига api json с настройками плеера.
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
      setInit(initPlayer)
      addFavicon(initPlayer.player.favicon)
      report('Инициализация : ', initPlayer)

      //TODO: проверить плеер на single
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

      // Собираем индикаторы избранного
      const loadFavoritesId: string[] = []
      favoritesListFromApi.data.list_radio.map((item) =>
        loadFavoritesId.push(item.id)
      )
      setFavoritesId(loadFavoritesId)

      //Собираем жанры и настроения
      allGenresFromPlayList = createArrayTags(fullPlayList, 'genres')
      allMoodsFromPlayList = createArrayTags(fullPlayList, 'moods')

      //TODO: Кэшировать последнее радио (продумать индексы)
      setRadio(fullPlayList[0])
      setStatus(CONFIG.STATUS.LOADED)
      report('Активное радио из INIT : ', fullPlayList[0])
    } catch {
      setStatus(CONFIG.STATUS.ERROR)
      console.error('Loading init failed')
    }
  }

  /**
   * Обновление баннера
   * Добавление в состояние времени для следующего обновления
   */
  const newBanner = () => {
    const newRefreshTime = refreshBanner(timeAds)
    newRefreshTime && setTimeAds(newRefreshTime)
  }

  /**
   * Переключение радио в плейлисте
   * Обновление баннера
   * @method
   * @param {Number} index  - Индекс активного радио
   * @param {String} act    - Направление переключения (next|prev|index)
   */
  const getIndexRadio = (index: number | undefined, act: string): void => {
    if (playList !== undefined && index !== undefined) {
      let selectIndex = index
      switch (act) {
        case 'prev':
          index === 0
            ? (selectIndex = playList.length - 1)
            : (selectIndex = index - 1)
          break
        case 'next':
          index === playList.length - 1
            ? (selectIndex = 0)
            : (selectIndex = index + 1)
          break
      }
      setRadio(playList[selectIndex])
      report('Выбранное радио : ', playList[selectIndex])
      newBanner()
    }
    //TODO: addStorageActiveRadio(actRadio)
  }

  /**
   * Воспроизведение
   * Меняем TITLE страницы на название текущего радио
   * Обновление баннера
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
    }, 10)

    document.title = radio?.name ? radio?.name : 'player' //TODO: Название плеера в manifest + ' - ' + this.title
    newBanner()
  }

  /**
   * Пауза
   * Обновление баннера
   * @method
   */
  const pause = (): void => {
    videoRef.current.pause()
    setIsPlay(false)
    //TODO: Обратно изменить TITLE на название плеера
    newBanner()
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
   * @param {*} event
   */
  const volumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    videoRef.current.volume = volume / 100
    setVolume(parseInt(event.target.value, 10))
  }

  /**
   * Смена битрейта стрима
   * Метод объекта Radio изменяет текущий стрим
   * @method
   * @param {*} event
   */
  const bitrateChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    //TODO: Понаблюдать в работе Перенести сюда метод из класса
    const newRadio = radio
    newRadio?.selectStream(ev.target.value)
    if (radio !== undefined && newRadio?.activeBitRate !== undefined) {
      setRadio({
        ...radio,
        activeBitRate: ev.target.value,
        playStream: newRadio?.playStream,
      })
    }
  }

  if (status === CONFIG.STATUS.INIT) {
    return <div>Загрузка...</div>
  } else if (status === CONFIG.STATUS.ERROR) {
    return <>Error....</>
  } else {
    return (
      <>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Player
            theme={init?.player}
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
            banner={init !== undefined ? init.advertising.banner : undefined}
            bitrateChange={bitrateChange}
            favoritesId={favoritesId}
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
          {/* Блок для IMA3 */}
          <div id='ad-container'></div>
        </div>
      </>
    )
  }
}

export default App

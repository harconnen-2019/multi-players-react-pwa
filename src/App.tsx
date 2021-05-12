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
  addStyleSheets,
  refreshBanner,
} from './lib/utils'
import { createArrayTags, createPlayList } from './lib/radio'
import { useLocalization } from './hooks/localization'
import { counterGa, counterFb, counterVk } from './lib/counters'
import Load from './components/Load'
import { initializeIMA } from './lib/ima'

const Player = React.lazy(() => import('./components/platforms/default/Player'))

/**
 * Сборка всего плеера и бизнес логика
 * @returns {void}
 */
function App() {
  const SESSION: string | undefined = getCookie('session')
  let PLATFORM: string = CONFIG.PLATFORM.PWA

  const [status, setStatus] = useState(CONFIG.STATUS.INIT)

  // const [isWarning, setIsWarning] = useState<boolean>(false)
  const { localization, selectLang } = useLocalization()
  const [init, setInit] = useState<InitPlayer>()

  const [playList, setPlayList] = useState<IRadio[]>()
  const [favoritesId, setFavoritesId] = useState<Array<string>>([])

  const [radio, setRadio] = useState<IRadio>()
  const [volume, setVolume] = useState<number>(50)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [timeAds, setTimeAds] = useState<number>(new Date().getTime())

  const [allGenres, setAllGenres] = useState<Set<string>>()
  const [allMoods, setAllMoods] = useState<Set<string>>()
  // поле для поиска
  const [input, setInput] = useState<string>('')
  const [searchPlayList, setSearchPlayList] = useState<IRadio[]>()

  const videoRef = useRef<any>(null)
  // const [player, setPlayer] = useState<object | null>(null)

  useEffect(() => {
    setStatus(CONFIG.STATUS.LOADING)
    loadInit()
    /**
     * //TODO: Deeplink
     * //TODO: Авторизация в соцсетях
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Инициализация videoJs, смена радио при выборе
  // Управление воспроизведением
  useEffect(() => {
    if (!videoRef || status !== CONFIG.STATUS.LOADED) return
    let actPlay: boolean = isPlay
    pause()
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

        initializeIMA(
          `${CONFIG.URL_VAST}${
            init?.advertising.plid
          }&genre=${radio?.genres.join()}`,
          true
        )

        actPlay && play()
      }
    )
    // setPlayer(initPlayer)
    return () => {
      initPlayer.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radio, status])

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
      const set = await fetchFromApi<{ [key: string]: string }>(
        './settings.json'
      )
      PLATFORM = set.app
      consolTitle()

      const manifest = await fetchFromApi<{ [key: string]: string }>(
        `${CONFIG.PREFIX}/api/orange/func/player/manifest.json`
      )
      document.title = manifest.name

      const init = await fetchFromApi<ApiInitRequest>(
        `${CONFIG.PREFIX}${CONFIG.URL_INIT}?session=${SESSION}`
      )
      const initPlayer: InitPlayer = createInitFromApi(init, PLATFORM)
      initPlayer.player.name = manifest.name

      setInit(initPlayer)
      addFavicon(initPlayer.player.favicon)
      report('Инициализация : ', initPlayer)

      let fullPlayList: Array<IRadio>

      if (initPlayer.player.single) {
        // Загрузка обычного плейлиста
        const radioListFromApi = await fetchFromApi<ApiRadioListRequest>(
          `${CONFIG.PREFIX}${initPlayer.api.list}?session=${SESSION}`
        )
        fullPlayList = createPlayList(
          radioListFromApi.data.list_radio,
          [],
          PLATFORM
        )
      } else {
        // Загрузка избранного
        const favoritesListFromApi = await fetchFromApi<ApiRadioListRequest>(
          `${CONFIG.PREFIX}${initPlayer.api.favoriteList}?session=${SESSION}`
        )
        // Загрузка рекомендованных
        const recommendListFromApi = await fetchFromApi<ApiRadioListRequest>(
          `${CONFIG.PREFIX}${initPlayer.api.recommend}&session=${SESSION}`
        )
        fullPlayList = createPlayList(
          recommendListFromApi.data.list_radio,
          favoritesListFromApi.data.list_radio,
          PLATFORM
        )

        // Собираем идентификаторы избранного
        const loadFavoritesId: string[] = []
        favoritesListFromApi.data.list_radio.map((item) =>
          loadFavoritesId.push(item.id)
        )
        setFavoritesId(loadFavoritesId)

        //Собираем жанры и настроения
        setAllGenres(createArrayTags(fullPlayList, 'genres'))
        setAllMoods(createArrayTags(fullPlayList, 'moods'))
      }

      setPlayList(fullPlayList)
      report('Загрузка плейлиста : ', fullPlayList.length)

      setRadio(fullPlayList[0])
      report('Активное радио из INIT : ', fullPlayList[0])

      // Кастомные стили плеера
      addStyleSheets(
        `${
          CONFIG.PREFIX
        }/api/orange/func/player/${PLATFORM.toLowerCase()}/custom.css`
      )

      setStatus(CONFIG.STATUS.LOADED)

      // подключение счетчиков
      switch (PLATFORM.toLowerCase()) {
        case 'pwa':
          initPlayer.counters.ga && counterGa(initPlayer.counters.ga)
          break
        case 'fb':
          initPlayer.counters.ga && counterGa(initPlayer.counters.ga)
          initPlayer.counters.fb && counterFb(initPlayer.counters.fb)
          break
        case 'vk':
          initPlayer.counters.ga && counterGa(initPlayer.counters.ga)
          initPlayer.counters.vk && counterVk(initPlayer.counters.vk)
          break
      }
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
          index >= playList.length - 1
            ? (selectIndex = 0)
            : (selectIndex = index + 1)
          break
      }
      setRadio(playList[selectIndex])
      report('Выбранное радио : ', playList[selectIndex])
      newBanner()
    }
  }

  /**
   * Воспроизведение
   * Меняем TITLE страницы на название текущего радио
   * Обновление баннера
   * Таймаут для инициализации VAST
   * @method
   */
  const play = (): void => {
    setTimeout(() => {
      videoRef.current.play()
      setIsPlay(true)
    }, 1000)

    document.title = radio?.name ? radio?.name : 'player'
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
    document.title = init?.player.name ? init?.player.name : 'player'
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

  /**
   * Добавление и удаление радио в избранное
   * Если радио нет в плейлисте, добавление в конец плейлиста
   * @param {boolean} change - добавить удалить
   * @param {object} radio  - радио
   * @returns {void} - изменяет состояние favoritesId
   */
  const favoritesChange = (change: boolean, radio: IRadio): void => {
    if (change) {
      const newFavoritesId = favoritesId.filter((item) => item !== radio.id)
      setFavoritesId(newFavoritesId)
      try {
        fetch(
          `${CONFIG.PREFIX}${init?.api.favoriteDel}?session=${SESSION}&radio_id=${radio.id}`
        )
      } catch (error) {
        console.error('Запрос на удаление избранного', error)
      }
      report('Удалить из избранного', radio.id)
    } else {
      const newFavoritesId = [...favoritesId]
      newFavoritesId.push(radio.id)
      setFavoritesId(newFavoritesId)
      // Добавляем в плейлист
      const findFavorite = playList?.find((item) => item.id === radio.id)
      if (!findFavorite && playList !== undefined) {
        const result = [...playList]
        radio.index = result.length
        result.push(radio)
        setPlayList(result)
      }

      try {
        fetch(
          `${CONFIG.PREFIX}${init?.api.favoriteAdd}?session=${SESSION}&radio_id=${radio.id}`
        )
      } catch (error) {
        console.error('Запрос на добавление избранного', error)
      }
      report('Добавить в избранное', radio.id)
    }
  }

  /**
   * Обработка формы поиска
   */
  const searchSubmit = async () => {
    const searchFromApi = await fetchFromApi<ApiRadioListRequest>(
      `${CONFIG.PREFIX}${init?.api.search}${input}`
    )
    const result: Array<IRadio> = createPlayList(
      [],
      searchFromApi.data.list_radio,
      PLATFORM
    )
    setSearchPlayList(result)
  }

  /**
   * Выбор радио из списка и воспроизведение
   * @param {object} radio
   */
  const playSelectRadio = (radio: IRadio) => {
    setRadio(radio)
    setIsPlay(true)
    setTimeout(() => {
      play()
    }, 1000)
    report('Выбор радио из списка', radio)
  }

  if (status === CONFIG.STATUS.INIT) {
    return <Load err={false} />
  } else if (status === CONFIG.STATUS.ERROR) {
    return <Load err={true} />
  } else {
    return (
      <>
        <Suspense fallback={<Load err={false} />}>
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
            // isWarning={isWarning}
            banner={init !== undefined ? init.advertising.banner : undefined}
            bitrateChange={bitrateChange}
            favoritesId={favoritesId}
            favoritesChange={favoritesChange}
            allGenres={allGenres}
            allMoods={allMoods}
            input={input}
            inputChange={(event) => setInput(event.target.value)}
            searchPlayList={searchPlayList}
            searchSubmit={searchSubmit}
            playSelectRadio={playSelectRadio}
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

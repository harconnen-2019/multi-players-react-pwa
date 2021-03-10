/**
 * Контроллер плеера
 * @module components/App
 */
import { useState, useEffect } from 'react'
import * as CONFIG from './config'
import { ApiInitRequest, ApiRadioListRequest } from './interfaces/api'
import { InitPlayer } from './interfaces/init'
import { createInitFromApi } from './lib/initializing'
import {
  getCookie,
  fetchFromApi,
  STATUS,
  PLATFORM as DEFAULT_PLATFORM,
  report,
} from './lib/utils'
import { IRadio } from './interfaces/radio'
import { createArrayTags, createPlayList } from './lib/radio'
import { useLocalization } from './hooks/localization'
import { listLocales } from './lib/lang'

// import videojs from 'video.js'

/**
 * Сборка всего плеера и бизнес логика
 * @returns {void}
 */
function App() {
  const SESSION: string | undefined = getCookie('session')
  const PLATFORM: string =
    process.env.REACT_APP_PLATFORM || DEFAULT_PLATFORM.PWA

  const [status, setStatus] = useState(STATUS.INIT)
  const { localization, selectLang } = useLocalization()

  const [playList, setPlayList] = useState<IRadio[]>()
  const [playRadio, setPlayRadio] = useState<IRadio>()

  const [isWarning, setIsWarning] = useState<boolean>(false)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  // const videoRef = useRef(null)
  // const [radio, setRadio] = useState('')
  // const [player, setPlayer] = useState(null)
  // const [sliderVal, setSliderVal] = useState(50) - не нужен
  const [volume, setVolume] = useState(50)

  const apiPlayer: { [key: string]: string } = {}
  let allGenresFromPlayList
  let allMoodsFromPlayList

  useEffect(() => {
    consolTitle() // eslint-disable-next-line
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

    setStatus(STATUS.LOADED)
  }, [])

  // Инициализация videoJs, смена радио при выборе
  // Управление воспроизведением
  // useEffect(() => {
  //   if (!videoRef || !isLoading) return
  //   let actPlay = isPlay
  //   if (player) {
  //     // Инициализация плеера уже прошла? меняем радио
  //     pause()
  //     videoRef.current.volume = volume / 100
  //     videoRef.current.src = radio.sources[0].src
  //     videoRef.current.type = radio.sources[0].type
  //     config.DEBUG && console.log('Смена радио в videoJs', radio)
  //     actPlay ? play() : null
  //   } else {
  //     // Инициируем плеер
  //     const initPlayer = videojs(
  //       videoRef.current,
  //       {
  //         autoplay: false,
  //         controls: false,
  //         sources: radio.sources,
  //       },
  //       function onPlayerReady() {
  //         config.DEBUG && console.log('onPlayerReady', this)
  //       }
  //     )
  //     setPlayer(initPlayer)
  //     // return () => {
  //     //   if (player) player.dispose()
  //     // }
  //   }
  // }, [radio, isLoading])

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
      // Сохранить данные в "apiPlayer" для плеера
      apiPlayer.search = initPlayer.api.search
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
      report('Загрузка плейлиста : ', fullPlayList)

      //Собираем жанры и настроения
      allGenresFromPlayList = createArrayTags(fullPlayList, 'genres')
      allMoodsFromPlayList = createArrayTags(fullPlayList, 'moods')

      //TODO: Кэшировать последнее радио (продумать индексы)
      setPlayRadio(fullPlayList[0])
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
  const getIndexRadio = (index: number, act: string) => {
    // const actRadio = getPlayRadioFromPlayList(radioPlayList, index, act)
    // setRadio(actRadio)
    // addStorageActiveRadio(actRadio)
  }

  /**
   * Воспроизведение
   * Таймаут для инициализации VAST
   * @method
   */
  const play = () => {
    // initializeIMA(
    //   `${config.URL_GET_VAST + radio}&cover_h=200&cover_w=200`.vast,
    //   true
    // )
    // config.DEBUG && console.log('VAST: ' + config.URL_GET_VAST + radio.vast)
    setTimeout(() => {
      // videoRef.current.play()
      setIsPlay(true)
    }, 1000)
  }

  /**
   * Пауза
   * @method
   */
  const pause = () => {
    // videoRef.current.pause()
    setIsPlay(false)
  }

  /**
   * Переключение состояние звука и отображения иконок
   * @method
   * @param {boolean} stat - состояние
   */
  const muted = (stat: boolean) => {
    // videoRef.current.muted = stat
    setIsMuted(stat)
  }

  /**
   * Установка громкости плеера и бегунок
   * @method
   * @param {*} e
   */
  const handleVolume = (event: any) => {
    // videoRef.current.volume = volume / 100
    setVolume(event.target.value)
    // setSliderVal(e.target.value) - не нужен
  }

  /**
   * Переключение локализации
   * @param {object} event - данные из формы
   */
  const langChange = (event: any) => {
    selectLang(event.target.value)
  }

  if (status === STATUS.INIT) {
    return <>Loading....</>
  } else if (status === STATUS.ERROR) {
    return <>Error....</>
  } else {
    return (
      <div className='bg-gray-800 text-white h-screen'>
        <div>
          <img src={playRadio?.cover} alt='' />
          <p>
            <b>{playRadio?.name}</b>
          </p>
          <p>{playRadio?.note}</p>
        </div>
        <div>
          <span onClick={() => getIndexRadio(2, 'prev')}>Назад</span>

          {!isPlay ? (
            <span
              onClick={() => {
                play()
              }}
            >
              Воспроизведение
            </span>
          ) : (
            <span
              onClick={() => {
                pause()
              }}
            >
              Пауза
            </span>
          )}

          <span onClick={() => getIndexRadio(3, 'next')}>Вперед</span>
          {!isMuted ? (
            <span
              onClick={() => {
                muted(true)
              }}
            >
              Звук выключить
            </span>
          ) : (
            <span
              onClick={() => {
                muted(false)
              }}
            >
              Звук включить
            </span>
          )}

          <span>
            <input
              type='range'
              min='1'
              max='100'
              value={volume}
              onChange={handleVolume}
            />
          </span>
        </div>
        <div>
          <select value={localization.activeLang.message} onChange={langChange}>
            {listLocales.map((item, key) => (
              <option key={key} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

export default App

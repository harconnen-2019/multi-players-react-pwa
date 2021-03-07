/**
 * Радиостанции
 * @module lib/radio
 */

import { IRadio, IApiStreams, SingleRadioRequest } from '../interfaces/radio'

/**
 * Проверка наличия параметра stream в объекте
 * @function
 * @param {Object} streams - Параметры стрим для радио
 * @returns {boolean}
 */
export const getStreamFromApi = (streams: IApiStreams) => {
  const result: boolean = Object.keys(streams).length !== 0 ? true : false
  return result
}

/**
 * Создание плейлиста для инициализации плеера из API
 * @function
 * @param {Array} api - список радио из API
 * @returns {Array} - нормализованный список объектов радио в количестве config.NUM_PLAYLIST
 */
export const createPlayList = (
  api: Array<SingleRadioRequest>,
  platform: string
): Array<IRadio> => {
  const apiPlatform: string = platform.toLowerCase() || 'pwa'
  const result: Array<IRadio> = []
  let i: number = 0
  api.forEach((element) => {
    // Проверка на наличие стрима, иначе пропускаем
    if (getStreamFromApi(element.streams)) {
      const item: IRadio = new Radio(element, i, apiPlatform)
      result.push(item)
    }
    i++
  })
  return result
}

/**
 * Создание объекта Radio
 * @class
 * @param {object} item  - Объект радио из API
 * @param {number} index - Текущий индекс строки
 */
export class Radio implements IRadio {
  index
  id
  alias
  name
  cover
  address
  fm
  note
  vast
  streams
  playStream
  bits
  genres
  moods
  favorites
  top
  recommend
  favoriteAdd = () => {
    this.favorites = true
  }
  favoriteDel = () => {
    this.favorites = false
  }
  selectStream = (bit: string) => {
    const result: [{ src: string; type: string }] = [{ src: '', type: '' }]
    result[0].src = this.streams[bit][0].url
    result[0].type = this.streams[bit][0].mime
    this.playStream = result
  }
  constructor(item: SingleRadioRequest, index: number, platform: string) {
    this.index = index
    this.id = item.id
    this.name = item.name
    this.alias = item.alias
    this.cover = item.cover
    this.address = item.origins[0].name
    this.fm = item.fm
    this.note = this.address + ', ' + this.fm
    this.vast = item.vast.daast[platform]
    this.streams = item.streams
    this.playStream =
      // Добавление одного стрима из массива
      (() => {
        const result: [{ src: string; type: string }] = [{ src: '', type: '' }]
        for (let key in item.streams) {
          if (item.streams[key][0].url && item.streams[key][0].mime) {
            result[0].src = item.streams[key][0].url
            result[0].type = item.streams[key][0].mime
            break
          }
        }
        return result
      })()
    this.bits = (() => {
      const result: Array<string> = []
      //TODO:   result = Object.keys(item.streams)
      return result
    })()
    this.genres = (() => {
      const result: Array<string> = []
      item.genres.forEach((item) => {
        result.push(item.name)
      })
      return result
    })()
    this.moods = (() => {
      const result: Array<string> = []
      item.moods.forEach((item) => {
        result.push(item.name)
      })
      return result
    })()
    this.favorites = false //TODO: Доработать назначение
    this.top = item.is_top === 1 ? true : false
    this.recommend = item.is_recommend === 1 ? true : false
  }
}

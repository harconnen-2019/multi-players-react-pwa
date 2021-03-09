/**
 * Радиостанции
 * @module lib/radio
 */

import { Session } from 'node:inspector'
import {
  IRadio,
  ApiStreams,
  SingleRadioRequest,
  ApiTags,
} from '../interfaces/radio'

/**
 * Проверка наличия параметра stream в объекте, если false - пропуск радио
 * @function
 * @param {Object} streams - Параметры стрим для радио
 * @returns {boolean}
 */
export const getStreamFromApi = (streams: ApiStreams) => {
  //TODO: Разобраться с битами равными нулю
  const result: boolean = Object.keys(streams).length !== 0 ? true : false
  return result
}

/**
 * Создание плейлиста из API для инициализации плеера
 * @function
 * @param {Array} api - список радио из API
 * @returns {Array} - нормализованный список объектов радио в количестве config.NUM_PLAYLIST
 */
export const createPlayList = (
  apiFav: Array<SingleRadioRequest>,
  apiRec: Array<SingleRadioRequest>,
  platform: string,
  session: string | undefined,
  init: { [key: string]: string }
) => {
  const apiPlatform: string = platform.toLowerCase() || 'pwa'
  const result: Array<IRadio> = []
  const api = Array.from(apiRec.concat(apiFav))
  let index: number = 0
  api.forEach((element) => {
    // Проверка на наличие стрима, иначе пропускаем
    if (getStreamFromApi(element.streams)) {
      const item: IRadio = new Radio(element, index, apiPlatform, session, init)
      result.push(item)
    }
    index++
  })
  //TODO: проверка на дубликаты
  // const output = new Set<IRadio>(result)
  return result
}

export const createArrayTags = (playlist: IRadio[], tag: string) => {
  const result = new Set()
  playlist.forEach((element: IRadio) => {
    //FIXME: element[tag] - не получается
    if (tag === 'genres') {
      element.genres.forEach((el: string) => {
        result.add(el)
      })
    } else {
      element.moods.forEach((el: string) => {
        result.add(el)
      })
    }
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
  favorite
  top
  recommend
  url
  session
  favoriteAdd = () => {
    this.favorite = true
    fetch(
      this.url.favoriteAdd + '?session=' + this.session + '&radio_id=' + this.id
    )
  }
  favoriteDel = () => {
    this.favorite = false
    fetch(
      this.url.favoriteDel + '?session=' + this.session + '&radio_id=' + this.id
    )
  }
  /**
   * @method
   * @param {string} bit - выбранный битрейт
   */
  selectStream = (bit: string) => {
    //TODO: Разобраться с битами равными нулю
    const result: [{ src: string; type: string }] = [{ src: '', type: '' }]
    result[0].src = this.streams[bit][0].url
    result[0].type = this.streams[bit][0].mime
    this.playStream = result
  }
  static createTag = (tags: ApiTags[]) => {
    const result: Array<string> = []
    tags.forEach((item) => {
      result.push(item.name)
    })
    return result
  }
  constructor(
    item: SingleRadioRequest,
    index: number,
    platform: string,
    session: string | undefined,
    init: { [key: string]: string }
  ) {
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
        //TODO: Разобраться с битами равными нулю
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
      const result: Array<string> = Object.keys(item.streams)
      return result
    })()
    this.genres = Radio.createTag(item.genres)
    this.moods = Radio.createTag(item.moods)
    this.favorite = false //TODO: Доработать назначение
    this.top = item.is_top === 1 ? true : false
    this.recommend = item.is_recommend === 1 ? true : false
    this.session = session
    this.url = init
  }
}

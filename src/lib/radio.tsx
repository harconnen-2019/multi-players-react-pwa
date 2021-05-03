/**
 * Радиостанции
 * @module lib/radio
 */

import { IRadio } from '../interfaces/radio'
import {
  ApiSubRadioRequest,
  ApiSubStreamsRequest,
  ApiSubTagsRequest,
} from '../interfaces/api'

/**
 * Проверка наличия параметра stream в объекте, если false - пропуск радио
 * @function
 * @param {Object} streams - Параметры стрим для радио
 * @returns {boolean}
 */
export const getStreamFromApi = (streams: ApiSubStreamsRequest) => {
  //TODO: Разобраться с битами равными нулю
  // const result: boolean = Object.keys(streams).length !== 0 ? true : false
  return Object.keys(streams).length !== 0 // Короткий вариант
}

/**
 * Удаляет дубликаты из полученного списка радиостанций
 * @param {Array} items - список радиостанций из API
 * @returns {Array} - массив без дубликатов
 */
export const uniqueArrow = (items: Array<ApiSubRadioRequest>) => {
  let result: Array<ApiSubRadioRequest> = []
  const idItems: string[] = []

  items.map((item) => idItems.push(item.id))

  const selectItems = idItems.filter(function (item, pos) {
    return idItems.indexOf(item) === pos
  })

  selectItems.map((radio) => {
    for (let item of items) {
      if (radio === item.id) {
        result.push(item)
        break
      }
    }
    return result
  })
  return result
}

/**
 * Создание плейлиста из API для инициализации плеера
 * @function
 * @param {Array} apiFav - список избранного
 * @param {Array} apiRec - список рекомендованных
 * @param {string} platform - текущая платформа
 * @param {string} session - текущая сессия
 * @param {Object} init - аргументы инициализации
 * @returns {Array} - нормализованный список объектов радио (используем класс Radio)
 */
export const createPlayList = (
  apiFav: Array<ApiSubRadioRequest>,
  apiRec: Array<ApiSubRadioRequest>,
  platform: string,
  session: string | undefined,
  //TODO: это для методов избранного - уже не нужно
  init: { [key: string]: string }
) => {
  const apiPlatform: string = platform.toLowerCase() || 'pwa'
  const result: Array<IRadio> = []
  const api = Array.from(apiRec.concat(apiFav))
  const unique = uniqueArrow(api)
  let index: number = 0
  unique.forEach((element) => {
    // Проверка на наличие стрима, иначе пропускаем
    if (getStreamFromApi(element.streams)) {
      const item: IRadio = new Radio(element, index, apiPlatform, session, init)
      result.push(item)
    }
    index++
  })
  return result
}

/**
 * Создание массива жанров и настроений
 * @function
 * @param {Object} playlist - список радио
 * @param {string} tag  - жанр или настроение
 * @returns {Array}
 */
export const createArrayTags = (playlist: IRadio[], tag: string) => {
  const result: Set<string> = new Set()
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
 * @param {string} platform - текущая платформа
 * @param {string} session - текущая сессия
 * @param {Object} init - аргументы инициализации
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
  activeBitRate
  genres
  moods
  // favorite
  top
  recommend
  url
  session

  // favoriteAdd = () => {
  //   this.favorite = true
  //   fetch(`${this.url.favoriteAdd}?session=${this.session}&radio_id=${this.id}`)
  // }
  // favoriteDel = () => {
  //   this.favorite = false
  //   fetch(`${this.url.favoriteDel}?session=${this.session}&radio_id=${this.id}`)
  // }

  /**
   * @method
   * @param {string} bit - выбранный битрейт
   */
  selectStream = (bit: string) => {
    //TODO: Разобраться с битами равными нулю
    //FIXME: Этот метод можно удалить перенести в функцию выбора битрейта
    const result: [{ src: string; type: string }] = [{ src: '', type: '' }]
    result[0].src = this.streams[bit][0].url
    result[0].type = this.streams[bit][0].mime
    this.activeBitRate = bit
    this.playStream = result
  }
  static createTag = (tags: ApiSubTagsRequest[]) => {
    const result: Array<string> = []
    tags.forEach((item) => {
      result.push(item.name)
    })
    return result
  }
  constructor(
    item: ApiSubRadioRequest,
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
        //TODO: Разобраться с битами равными нулю.
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
    this.activeBitRate = (() => {
      const result: string = Object.keys(item.streams)[0]
      return result
    })()
    this.genres = Radio.createTag(item.genres)
    this.moods = Radio.createTag(item.moods)
    // this.favorite = false //TODO: Доработать назначение (нет смысла в этом значении)
    this.top = item.is_top === 1 ? true : false
    this.recommend = item.is_recommend === 1 ? true : false
    this.session = session
    this.url = init
  }
}

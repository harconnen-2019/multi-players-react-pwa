export type ApiRadioRequest = {
  data: {
    list_radio: SingleRadioRequest[]
  }
}

export type SingleRadioRequest = {
  status: number
  partner_id: string
  license: string
  id: string
  alias: string
  name: string
  description: string
  cover: string
  fm: string
  origins: { name: string }[]
  streams: IApiStreams
  is_top: number
  is_recommend: number
  genres: ApiTags[]
  moods: ApiTags[]
  vast: {
    daast: {
      [key: string]: number
    }
  }
  play_now: {
    name: string
  }
}

export type ApiTags = {
  name: string
  id: string
  alias: string
  status: number
}

export type IApiStreams = {
  [key: string]: [
    {
      type: string
      id: string
      mime: string
      bitrate: number
      samplerate: number
      url: string
      status: number
      radio_id: string
    }
  ]
}

/**
 * Интерфейс Радио
 * @interface
 */
export interface IRadio {
  /** индекс в массиве плейлиста */
  index: number
  /** ID радио */
  readonly id: string
  /** название */
  readonly name: string
  /** альяс */
  readonly alias: string
  /** URL логотипа */
  readonly cover: string
  /** адрес */
  readonly address: string
  /** частота */
  readonly fm: string
  /** описание (адрес + fm) */
  readonly note: string
  /** идентификатор рекламы */
  readonly vast: number
  /** текущий стрим */
  readonly playStream: [{ src: string; type: string }]
  /** все стримы */
  readonly streams: object
  /** список битрейтов */
  readonly bits: Array<string>
  /** в топе */
  readonly top: boolean
  /** в рекомендованных */
  readonly recommend: boolean
  /** в избранном */
  readonly favorites: boolean
  /** жанры */
  readonly genres: Array<string>
  /**-настроения */
  readonly moods: Array<string>
  /**добавление в избранное */
  favoriteAdd: () => void
  /** удаление из избранного */
  favoriteDel: () => void
  /** выбор стрима для плеера */
  selectStream: (bit: string) => void
}

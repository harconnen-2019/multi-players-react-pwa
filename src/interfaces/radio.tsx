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
  readonly playStream: Array<{ src: string; type: string }>
  /** все стримы */
  readonly streams: object
  /** список битрейтов */
  readonly activeBitRate: string
  /** в топе */
  readonly top: boolean
  /** в рекомендованных */
  readonly recommend: boolean
  /** в избранном */
  readonly favorite: boolean
  /** жанры */
  readonly genres: Array<string>
  /**-настроения */
  readonly moods: Array<string>
  /** url из init для методов с избранным */
  readonly url: { [key: string]: string }
  /** сессия для методов избранного */
  readonly session: string | undefined
  /**добавление в избранное */
  favoriteAdd: () => void
  /** удаление из избранного */
  favoriteDel: () => void
  /** выбор стрима для плеера */
  selectStream: (bit: string) => void
}

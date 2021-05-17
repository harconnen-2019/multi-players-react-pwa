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
  readonly vast: number | null
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
  /** жанры */
  readonly genres: Array<string>
  /**-настроения */
  readonly moods: Array<string>
  /** выбор стрима для плеера */
  selectStream: (bit: string) => void
}

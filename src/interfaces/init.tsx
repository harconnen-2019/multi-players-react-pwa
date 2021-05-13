/**
 * Полная инициализация плеера
 * @memberof createInitFromApi
 * @alias InitPlayer
 */
export type InitPlayer = {
  api: ApiRequest
  player: ThemeRequest
  counters: CountersIdRequest
  advertising: AdvertisingRequest
}

/**
 * @memberof InitPlayer
 * @alias ApiRequest
 */
type ApiRequest = {
  /** URL для получения списка радиостанций */
  readonly list?: string
  /** URL для получения списка топовых радиостанций */
  readonly top?: string
  /** URL для получения списка рекомендуемых радиостанций */
  readonly recommend: string
  /** URL для получения списка радиостанций при поиске */
  readonly search: string
  /** URL для получения списка избранных радиостанций */
  readonly favoriteList: string
  /** URL метода добавления в избранное */
  readonly favoriteAdd: string
  /** URL метода удаления из избранное */
  readonly favoriteDel: string
  /** URL метода добавления пользователя */
  readonly user?: string
}

/**
 * @memberof InitPlayer
 * @alias ThemeRequest
 */
export type ThemeRequest = {
  /** Плеер для одного радио */
  readonly single: boolean
  /** Favicon */
  readonly favicon: string
  /** Тема по умолчанию  */
  readonly themeDefault: string
  /** Тема текущей платформы */
  readonly theme: string
  /** Логотип текущей платформы */
  readonly cover: string
  /** Стили текущей платформы */
  readonly css: string
  /** Название плеера */
  name: string
}

/**
 * @memberof InitPlayer
 * @alias CountersIdRequest
 */
type CountersIdRequest = {
  /** Счетчик Google */
  readonly ga: string | null
  /** Счетчик Вконтакте */
  readonly vk?: string | null
  /** Счетчик Facebook */
  readonly fb?: string | null
}

/**
 * @memberof InitPlayer
 * @alias AdvertisingRequest
 */
type AdvertisingRequest = {
  /** Плид для IMA Google */
  readonly plid: number
  /** Параметры для показа баннера */
  readonly banner: string | null
  /** VAST параметры преролла */
  readonly preroll: string | null
}

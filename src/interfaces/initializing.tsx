/**
 * @memberof linkRadiosFromApi
 * @alias ApiRequest
 */
export type ApiRequest = {
  /** Параметры плеера */
  params: {
    session: string
  }
  /** Параметры плеера */
  data: {
    init: {
      api: {
        radio_list: string
        radio_top: string
        radio_recommend: string
        radio_search: string
        user_fav_list: string
        user_fav_add: string
        user_fav_del: string
        user_create_account: string
      }
      player: {
        single: boolean
        favicon: string
        theme: string
      }
      defaults: {
        style: {
          [item: string]: {
            custom_css: string
            theme: string
            cover: string
          }
        }
        vast: {
          daast: {
            [item: string]: number
          }
        }
      }
      vast: {
        [item: string]: {
          banner: string
          preroll: string
        }
      }
      counters: {
        ga: string
        fb?: string
        vk?: string
      }
    }
  }
}
/**
 * @memberof linkRadiosFromApi
 * @alias LinkRadiosRequest
 */
export type LinkRadiosRequest = {
  /** URL для получения списка радиостанций */
  readonly list: string
  /** URL для получения списка топовых радиостанций */
  readonly top: string
  /** URL для получения списка рекомендуемых радиостанций */
  readonly recommend: string
  /** URL для получения списка радиостанций при поиске */
  readonly search: string
  /** URL метода добавления пользователя */
  readonly user: string
}

/**
 * @memberof linkFavoritesFromApi
 * @alias LinkFavoritesRequest
 */
export type LinkFavoritesRequest = {
  /** URL для получения списка избранных радиостанций */
  readonly favoriteList: string
  /** URL метода добавления в избранное */
  readonly favoriteAdd: string
  /** URL метода удаления из избранное */
  readonly favoriteDel: string
}

/**
 * @memberof playerThemeFromApi
 * @alias PlayerThemeRequest
 */
export type PlayerThemeRequest = {
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
}

/**
 * @memberof countersIdFomApi
 * @alias CountersIdRequest
 */
export type CountersIdRequest = {
  /** Счетчик Google */
  readonly ga: string | null
  /** Счетчик Вконтакте */
  readonly vk?: string | null
  /** Счетчик Facebook */
  readonly fb?: string | null
}

/**
 * @memberof advertisingFromApi
 * @alias AdvertisingRequest
 */
export type AdvertisingRequest = {
  /** Плид для IMA Google */
  readonly plid: number
  /** Параметры для показа баннера */
  readonly banner: string | null
  /** VAST параметры преролла */
  readonly preroll: string | null
}

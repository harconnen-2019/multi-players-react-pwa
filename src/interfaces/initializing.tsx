/**
 * @interface
 * @see createInit
 */
export interface IApiInit {
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
 * @interface
 * @see Init
 */
export interface ICreateInit {
  /** Платформа плеера */
  readonly platform: string
  /** Настройки плеера */
  player: {
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
  /** полученные url из api */
  readonly api: {
    /** URL для получения списка радиостанций */
    readonly list: string
    /** URL для получения списка топовых радиостанций */
    readonly top: string
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
    readonly user: string
  }
  /** Сессия пользователя */
  readonly session: string
  /** Плид для IMA Google */
  readonly plid: number
  /** Параметры для показа баннера */
  readonly banner: string | null
  /** VAST параметры преролла */
  readonly preroll: string | null
  /** Счетчики */
  readonly counters: {
    ga: string | null
    vk?: string | null
    fb?: string | null
  }
}

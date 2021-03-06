import {
  ApiRequest,
  LinkFavoritesRequest,
  AdvertisingRequest,
  LinkRadiosRequest,
  CountersIdRequest,
  PlayerThemeRequest,
} from '../interfaces/initializing'

/**
 * Функции для инициализации плеера
 * @module lib/initializing
 */

/**
 * Интерфейс: {@link LinkRadiosRequest}
 * @function
 * @param {object} itemsApi - fetch запрос
 * @returns {object} - Список URL адресов радио
 */
export const linkRadiosFromApi = (itemsApi: ApiRequest): LinkRadiosRequest => {
  const {
    data: {
      init: { api },
    },
  } = itemsApi
  const result: LinkRadiosRequest = {
    list: api.radio_list,
    top: api.radio_top,
    recommend: api.radio_recommend,
    search: api.radio_search,
    user: api.user_create_account,
  }
  return result
}

/**
 * Интерфейс - см. {@link LinkFavoritesRequest}
 * @function
 * @param {object} items - Данные fetch запроса
 * @returns {object} - Возвращает объект
 */
export const linkFavoritesFromApi = (
  items: ApiRequest
): LinkFavoritesRequest => {
  const {
    data: {
      init: { api },
    },
  } = items
  const result: LinkFavoritesRequest = {
    favoriteList: api.user_fav_list,
    favoriteAdd: api.user_fav_add,
    favoriteDel: api.user_fav_del,
  }
  return result
}

/**
 * Интерфейс - см. {@link PlayerThemeRequest}
 * @function
 * @param {object} items - Данные fetch запроса
 * @returns {object} - Возвращает объект
 */
export const playerThemeFromApi = (
  items: ApiRequest,
  platform: string
): PlayerThemeRequest => {
  const {
    data: {
      init: { player },
    },
    data: {
      init: { defaults },
    },
  } = items
  const apiPlatform: string = platform.toLowerCase() || 'pwa'
  const result: PlayerThemeRequest = {
    single: player.single || false,
    favicon: player.favicon,
    themeDefault: player.theme || 'default',
    theme: defaults.style[apiPlatform].theme,
    cover: defaults.style[apiPlatform].cover,
    css: defaults.style[apiPlatform].custom_css,
  }
  return result
}

/**
 * Интерфейс - см. {@link CountersIdRequest}
 * @function
 * @param {object} items - Данные fetch запроса
 * @returns {object} - Возвращает объект
 */
export const countersIdFomApi = (items: ApiRequest): CountersIdRequest => {
  const {
    data: {
      init: { counters },
    },
  } = items
  const result: CountersIdRequest = {
    ga: counters?.ga ? counters.ga : null,
    fb: counters?.fb ? counters.fb : null,
    vk: counters?.vk ? counters.vk : null,
  }
  return result
}

/**
 * Интерфейс - см. {@link AdvertisingRequest}
 * @function
 * @param {object} items - Данные fetch запроса
 * @returns {object} - Возвращает объект
 */
export const advertisingFromApi = (
  items: ApiRequest,
  platform: string
): AdvertisingRequest => {
  const {
    data: {
      init: { vast },
    },
    data: {
      init: { defaults },
    },
  } = items
  const apiPlatform: string = platform.toLowerCase() || 'pwa'
  const result: AdvertisingRequest = {
    plid: defaults.vast.daast[apiPlatform],
    banner: vast[apiPlatform]?.banner ? vast[apiPlatform].banner : null,
    preroll: vast[apiPlatform]?.preroll ? vast[apiPlatform].preroll : null,
  }
  return result
}

/**
 * Инициализация плеера
 * @module lib/initializing
 */

import { ApiInitRequest } from '../interfaces/api'
import { InitPlayer } from '../interfaces/init'

/**
 * Сборка всех аргументов
 * @function
 * @param {object} items - Данные fetch запроса
 * @param {string} getPlatform - Текущая платформа
 * @returns {object} - весь комплект для инициализации
 */
export const createInitFromApi = (
  itemsApi: ApiInitRequest,
  getPlatform: string = 'pwa'
): InitPlayer => {
  const platform: string = getPlatform.toLowerCase()
  const {
    data: { init },
  } = itemsApi
  const result: InitPlayer = {
    api: {
      recommend: init.api.radio_recommend,
      search: init.api.radio_search,
      favoriteList: init.api.user_fav_list,
      favoriteAdd: init.api.user_fav_add,
      favoriteDel: init.api.user_fav_del,
      user: init.api.user_create_account,
      list: init.api.radio_list,
      top: init.api.radio_top,
    },
    player: {
      platform: platform,
      single: init.player.single || false,
      name: init.player.name || 'Player',
      favicon: init.player.favicon,
      themeDefault: init.player.theme || 'default',
      theme: init.defaults.style[platform]?.theme || 'default',
      cover:
        init.defaults.style[platform]?.cover ||
        '00000000-0000-0000-0000-000000000000.fav.png',
      css:
        init.defaults.style[platform]?.custom_css ||
        '/api/orange/func/player/pwa/custom.css',
    },
    counters: {
      ga:
        init.counters?.ga && init.counters?.ga !== '' ? init.counters.ga : null,
      fb:
        init.counters?.fb && init.counters?.fb !== '' ? init.counters.fb : null,
      vk:
        init.counters?.vk && init.counters?.vk !== '' ? init.counters.vk : null,
    },
    advertising: {
      plid: init.defaults.vast.daast[platform] || null,
      banner:
        init.vast[platform]?.banner && init.vast[platform]?.banner !== ''
          ? init.vast[platform].banner
          : null,
      preroll:
        init.vast[platform]?.preroll && init.vast[platform]?.preroll !== ''
          ? init.vast[platform].preroll
          : null,
    },
  }
  return result
}

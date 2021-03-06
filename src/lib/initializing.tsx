import { IApiInit, ICreateInit } from '../interfaces/initializing'

/**
 * Функции для инициализации плеера
 * @module lib/initializing
 */

/**
 * Считывает cookies для отправки запросов api (?session=)
 * @function
 * @returns {string | undefine} - Значение cookie или Undefine
 */
export const getCookie = (name: string): string | undefined => {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

/**
 * Функция принимает данные запроса api и возвращает объект созданный классом {@link Init} для состояния плеера.
 * Интерфейс для принимаемых данных - см. {@link IApiInit}
 * @function
 * @param {object} items - Данные fetch запроса
 * @returns {object} - Возвращает объект класса Init
 */
export const createInit = (items: IApiInit): ICreateInit => {
  /**
   * Класс для создания объекта Init. -
   * Интерфейс для этого класса - см. {@link ICreateInit}
   * @class
   */
  class Init implements ICreateInit {
    platform = process.env.REACT_APP_PLATFORM || 'pwa'
    player = {
      single: items.data.init.player.single || false,
      favicon: items.data.init.player.favicon,
      themeDefault: items.data.init.player.theme || 'default',
      theme: items.data.init.defaults.style[this.platform].theme,
      cover: items.data.init.defaults.style[this.platform].cover,
      css: items.data.init.defaults.style[this.platform].custom_css,
    }
    api = {
      list: items.data.init.api.radio_list,
      top: items.data.init.api.radio_top,
      recommend: items.data.init.api.radio_recommend,
      search: items.data.init.api.radio_search,
      favoriteList: items.data.init.api.user_fav_list,
      favoriteAdd: items.data.init.api.user_fav_add,
      favoriteDel: items.data.init.api.user_fav_del,
      user: items.data.init.api.user_create_account,
    }
    session = items.params.session
    plid = items.data.init.defaults.vast.daast[this.platform]
    banner = items.data.init.vast[this.platform]?.banner
      ? items.data.init.vast[this.platform].banner
      : null
    preroll = items.data.init.vast[this.platform]?.preroll
      ? items.data.init.vast[this.platform].preroll
      : null
    counters = {
      ga: items?.data?.init?.counters?.ga ? items.data.init.counters.ga : null,
      fb: items?.data?.init?.counters?.fb ? items.data.init.counters.fb : null,
      vk: items?.data?.init?.counters?.vk ? items.data.init.counters.vk : null,
    }
  }
  const init: ICreateInit = new Init()
  return init
}

/**
 * Модуль инициализации плеера
 * @module lib/init
 */

/**
 * Считывает cookies
 * @function
 * @returns {string} - Значение cookie или Undefine
 */
export function getCookie(name: string): string | undefined {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

/**
 * Получение данных с сервера асинхронно Fetch
 * @function
 * @param {string} url - url
 * @returns {Promise}
 */
export async function getData(url: string) {
  try {
    const response = await fetch(url)
    if (response.ok) return await response.json()
  } catch (error) {
    console.error('Request failed', error)
  }
}

/**
 * Создание объекта Init
 * @function
 * @param {object} item - Данные fetch запроса
 * @returns {object} - Возвращает объект класса Init
 */
export function createInit(items: any): object {
  const {
    api = items.data.init.api,
    player = items.data.init.player,
    defaults = items.data.init.defaults,
    vasts = items.data.init.vast,
  } = items

  /**
   * Объект Init
   * @class
   */
  class Init {
    /**
     * Платформа плеера
     */
    readonly platform: string = process.env.REACT_APP_PLATFORM || 'pwa'
    /**
     * Плеер для одного радио
     */
    readonly single: boolean = player.single || false
    /**
     * Тема по умолчанию
     */
    readonly themeDefault: string = player.theme || 'default'
    /**
     * Favicon
     */
    readonly favicon: string = player.favicon
    /**
     * URL для получения списка радиостанций
     */
    readonly apiList: string = api.radio_list
    /**
     * URL для получения списка топовых радиостанций
     */
    readonly apiTop: string = api.radio_top
    /**
     * URL для получения списка рекомендуемых радиостанций
     */
    readonly apiRecommend: string = api.radio_recommend
    /**
     * URL для получения списка радиостанций при поиске
     */
    readonly apiSearch: string = api.radio_search
    /**
     * URL для получения списка избранных радиостанций
     */
    readonly apiFavoriteList: string = api.user_fav_list
    /**
     * URL метода добавления в избранное
     */
    readonly apiFavoriteAdd: string = api.user_fav_add
    /**
     * URL метода удаления из избранное
     */
    readonly apiFavoriteDel: string = api.user_fav_del
    /**
     * URL метода добавления пользователя
     */
    readonly apiUser: string = api.user_create_account
    /**
     * Сессия пользователя
     */
    readonly session: string = items.params.session
    /**
     * Плид для IMA Google
     */
    readonly plid: number = defaults.vast.daast[this.platform]
    /**
     * Тема текущей платформы
     */
    readonly platformTheme: string = defaults.style[this.platform].theme
    /**
     * Логотип текущей платформы
     */
    readonly platformCover: string = defaults.style[this.platform].cover
    /**
     * Стили текущей платформы
     */
    readonly platformCss: string = defaults.style[this.platform].custom_css
    /**
     * Параметры для показа баннера
     */
    readonly banner: string | null = vasts[this.platform]?.banner
      ? vasts[this.platform].banner
      : null
    /**
     * VAST параметры преролла
     */
    readonly preroll: string | null = vasts[this.platform]?.preroll
      ? vasts[this.platform].preroll
      : null
    /**
     * Счетчик Google
     */
    readonly counterGa: string | null = items?.data?.init?.counters?.ga
      ? items?.data?.init?.counters?.ga
      : null
  }
  return new Init()
}

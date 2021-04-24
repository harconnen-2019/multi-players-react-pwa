/**
 * Утилиты для плеера
 * @module lib/utils
 */
import * as CONFIG from '../config'

/**
 * Считывает cookies до инициализации для отправки запросов api (?session=)
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
 * Получение данных с сервера с помощью Fetch
 * @function
 * @param {string} url - url
 * @returns {Promise}
 */
export async function fetchFromApi<T>(request: RequestInfo): Promise<T> {
  let result
  try {
    const response = await fetch(request)
    if (response.ok) result = await response.json()
  } catch (error) {
    console.error('Request failed', error)
  }
  return result
}

/**
 * Вывод в консоль при отладке
 * @param {string} text
 * @param {any} prop
 */
export const report = (text: string, prop: any = ''): void => {
  CONFIG.DEBUG && console.log(text, prop)
}

/**
 * Добавление в index.html элемент favicon
 * @param {string} href - URL favicon получаем из API
 */
export const addFavicon = (href: string | undefined) => {
  if (href !== undefined) {
    var link: HTMLElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link')
    link.setAttribute('type', 'image/x-icon')
    link.setAttribute('rel', 'shortcut icon')
    link.setAttribute('href', CONFIG.PREFIX + href)
    document.getElementsByTagName('head')[0].appendChild(link)
  }
}

/**
 * Обновление баннера по заданному интервалу
 * Интервал берем из конфига
 * @param {number} timeAds - время последнего обновления
 */
export const refreshBanner = (timeAds: number) => {
  if (new Date().getTime() - timeAds > CONFIG.INTERVAL_BANNER) {
    const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
      input !== null && input.tagName === 'IFRAME'

    const frame = document.getElementById('bannerRefresh')
    if (isIFrame(frame) && frame.contentWindow) {
      frame.contentWindow.location.reload()
    }
    // TODO: Должен вернуть текущее время для обнуления интервала
    // timeAds = new Date().getTime()
    report('Баннер обновлен, интервал:', CONFIG.INTERVAL_BANNER)
    return new Date().getTime()
  }
}

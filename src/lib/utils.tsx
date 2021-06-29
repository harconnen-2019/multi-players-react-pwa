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
 * Добавление в index.html элемент CSS
 * @param {string} href - URL css получаем из API
 */
export const addStyleSheets = (href: string | undefined) => {
  if (href !== undefined) {
    var $head = document.head,
      $link = document.createElement('link')

    $link.rel = 'stylesheet'
    $link.href = href

    $head.appendChild($link)
  }
}

/**
 * Динамический manifest
 * @param {string} name - Имя плеера
 * @param {string} favicon - Логотип плеера
 */
export const generateManifest = (name: string, favicon: string) => {
  const myDynamicManifest = {
    name: name,
    short_name: name,
    scope: window.location.href,
    start_url: window.location.href,
    display: 'standalone',
    theme_color: '#ffffff',
    description: '',
    background_color: '#ffffff',
    orientation: 'portrait-primary',
    icons: [
      {
        src: window.location.href + favicon.replace('-x-', '192x192').slice(1),
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: window.location.href + favicon.replace('-x-', '278x278').slice(1),
        type: 'image/png',
        sizes: '278x278',
      },
    ],
  }
  const stringManifest = JSON.stringify(myDynamicManifest)
  const blob = new Blob([stringManifest], { type: 'application/json' })
  const manifestURL = URL.createObjectURL(blob)
  const element = document.querySelector('#custom-manifest')
  if (element) {
    element.setAttribute('href', manifestURL)
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
    report('Баннер обновлен, интервал:', CONFIG.INTERVAL_BANNER)
    return new Date().getTime()
  }
}

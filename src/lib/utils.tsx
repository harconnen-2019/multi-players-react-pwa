/**
 * Утилиты для плеера
 * @module lib/utils
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
 * Статус загрузки плеера (init, loading, loaded, error)
 * @readonly
 * @enum
 */
export enum STATUS {
  INIT,
  LOADING,
  LOADED,
  ERROR,
}

/**
 * Платформы для плеера
 * @readonly
 * @enum {string}
 */
export enum PLATFORM {
  PWA = 'PWA',
  FB = 'FB',
  VK = 'VK',
  OK = 'OK',
}

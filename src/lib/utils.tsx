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

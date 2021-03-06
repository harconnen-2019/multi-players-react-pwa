/**
 * Утилиты для плеера
 * @module lib/utils
 */

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
 * @enum {string}
 */
export enum SelectStatus {
  init = 'init',
  loading = 'loading',
  loaded = 'loaded',
  error = 'error',
}

/**
 * Настройки для управления плеером
 * @module config
 */

import { version } from '../package.json'

/**
 * Версия приложения
 * @constant {string}
 */
export const VERSION: string = `App version : ${version} (alfa)`

/**
 * Активирует консольные логи для отладки
 * @constant {boolean}
 */
export const DEBUG: boolean =
  process.env.NODE_ENV === 'development' ? true : false

/**
 * Префикс для локального запуска, в продакшене  пустая строка
 * @constant {string}
 */
export const PREFIX: string =
  process.env.NODE_ENV === 'development' ? 'https://default.my-radio.app' : ''

/**
 * URL для получения данных при инициализации плеера
 * @constant {string}
 */
export const URL_INIT: string = '/api/orange/func/player/init'

/**
 * Сколько в плеер загружать радио из API
 * @constant {number}
 */
// export const NUM_PLAYLIST = 50

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
  PWA = 'pwa',
  FB = 'fb',
  VK = 'vk',
  OK = 'ok',
}

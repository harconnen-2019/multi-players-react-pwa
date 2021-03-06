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

/**
 * Модуль с настройками плеера
 * @module config
 */

import { version } from '../package.json'

/**
 * Версия приложения
 * @constant
 */
export const VERSION: string = `App version : ${version} (alfa)`
/**
 * Debug
 * @constant
 */
export const DEBUG: boolean =
  process.env.NODE_ENV === 'development' ? true : false
/**
 * Префикс для локального запуска
 * @constant
 */
export const PREFIX: string = 'https://default.my-radio.app'
/**
 * Инициализация приложения
 * @constant
 */
export const URL_INIT: string = '/api/orange/func/player/init'

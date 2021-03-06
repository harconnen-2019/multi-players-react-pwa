/**
 * @interface
 */
export interface ILocalization {
  /** Формат */
  [key: string]: {
    [message: string]: string
  }
}

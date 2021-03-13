import { ILocalization } from './localization'
import { IRadio } from './radio'

export type IPlayer = {
  lang: ILocalization
  radio: IRadio | undefined
  isPlay: boolean
  isMuted: boolean
  volume: number
  play: () => void
  pause: () => void
  muted: (stat: boolean) => void
  getIndexRadio: (index: number, act: string) => void
  volumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  langChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  genres: string[] | undefined
  moods: string[] | undefined
  isWarning: boolean
}

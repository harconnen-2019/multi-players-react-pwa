import { ILocalization } from './localization'
import { IRadio } from './radio'
import { ThemeRequest } from './init'

export type IPlayer = {
  theme: ThemeRequest | undefined
  lang: ILocalization
  playList: IRadio[] | undefined
  radio: IRadio | undefined
  isPlay: boolean
  isMuted: boolean
  volume: number
  play: () => void
  pause: () => void
  muted: (stat: boolean) => void
  getIndexRadio: (index: number | undefined, act: string) => void
  volumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  langChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  genres: Set<string> | undefined
  moods: Set<string> | undefined
  isWarning: boolean
  banner: string | null | undefined
  bitrateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  favoritesId: Array<string>
  favoritesChange: (change: boolean, radioId: string) => void
  allGenres: Set<string> | undefined
  allMoods: Set<string> | undefined
  apiSearch: string | undefined
}

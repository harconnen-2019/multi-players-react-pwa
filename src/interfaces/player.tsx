import { ThemeRequest } from './init'
import { ILocalization } from './localization'
import { IRadio } from './radio'

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
  // isWarning: boolean
  banner: string | null | undefined
  bitrateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  favoritesChange: (change: boolean, radio: IRadio) => void
  allGenres: Set<string> | undefined
  allMoods: Set<string> | undefined
  input: string
  inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  searchPlayList: IRadio[] | undefined
  searchSubmit: () => void
  playSelectRadio: (radio: IRadio) => void
}

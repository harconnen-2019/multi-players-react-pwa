import { useState, useEffect } from 'react'
import { fetchFromApi, report } from '../lib/utils'
import { ILocalization } from '../interfaces/localization'

export const useLocalization = (lang: string) => {
  const [localization, setLocalization] = useState<ILocalization>({})
  //   const [lang, setLang] = useState('')

  useEffect(() => {
    if (localStorage.getItem('player-localization')) {
      const getLocalization = localStorage.getItem('player-localization')
      if (typeof getLocalization === 'string') {
        setLocalization(JSON.parse(getLocalization))
        report('Локализация из localStorage : ', JSON.parse(getLocalization))
      }
    } else {
      getLocalization('en')
    }
  }, [])

  useEffect(() => {
    if (lang === '') return
    getLocalization(lang)
  }, [lang])

  const getLocalization = async (getLang: string) => {
    try {
      const result = await fetchFromApi<ILocalization>(
        `/static/locales/${getLang}/messages.json`
      )
      result.activeLang = { message: getLang }
      setLocalization(result)
      localStorage.setItem('player-localization', JSON.stringify(result))
      report('Локализация из api : ', result)
    } catch {
      // setInitStatus(STATUS.ERROR)
      console.error('Loading lang failed')
    }
  }
  return { localization }
}

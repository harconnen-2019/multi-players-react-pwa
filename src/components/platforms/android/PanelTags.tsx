import { useState } from 'react'

import { IRadio } from '../../../interfaces/radio'
import List from './modules/List'
import styles from './PanelTags.module.css'

interface Props {
  tag: string
  allTags: Set<string> | undefined
  playList: IRadio[] | undefined
  favoritesChange: (change: boolean, radio: IRadio) => void
  playSelectRadio: (radio: IRadio) => void
  toggleMenu: (event: string) => void
}

const PanelTags = ({
  tag,
  allTags,
  playList,
  favoritesChange,
  playSelectRadio,
  toggleMenu,
}: Props) => {
  const [selectTags, setSelectTags] = useState<string[]>([])
  //TODO: может можно обойтись без перевода set() в массив (дает ошибку)
  const listTags = allTags !== undefined ? Array.from(allTags) : []
  let tagsRadio: IRadio[] | undefined
  let num = 0
  for (const prop in selectTags) {
    if (num === 0) {
      tagsRadio = playList?.filter((radio: IRadio) => {
        //TODO: выбор genres или moods не самый лучший
        const apiTag = tag === 'genres' ? radio.genres : radio.moods
        return apiTag.find((item) => item === selectTags[prop])
      })
    } else {
      tagsRadio =
        tagsRadio !== undefined
          ? tagsRadio.filter((radio) => {
              //TODO: выбор genres или moods не самый лучший
              const apiTag = tag === 'genres' ? radio.genres : radio.moods
              return apiTag.find((item) => item === selectTags[prop])
            })
          : tagsRadio
    }
    num++
  }

  /**
   * Добавление и удаление выбранных tag
   * @param {string} item - название  tag
   * @returns {void} - изменение состояния selectTags
   */
  const tagChange = (item: string) => {
    let result = [...selectTags]
    if (result.find((tag) => item === tag)) {
      result = result.filter((tag) => tag !== item)
    } else {
      result.push(item)
    }
    setSelectTags(result)
  }
  return (
    <section>
      <ul className={styles.tags}>
        {listTags.map((item) => (
          <li
            className={
              selectTags.find((tag) => item === tag) ? styles.active : ''
            }
            onClick={() => {
              tagChange(item)
            }}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.flex}>
        {tagsRadio !== undefined &&
          tagsRadio.length !== 0 &&
          tagsRadio.map((radio) => (
            <List
              key={radio.id}
              radio={radio}
              favoritesChange={favoritesChange}
              playSelectRadio={playSelectRadio}
              toggleMenu={toggleMenu}
            />
          ))}
      </div>
    </section>
  )
}

export default PanelTags

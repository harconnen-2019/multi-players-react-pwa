import React, { useState, useEffect } from 'react'
import { IRadio } from '../../../interfaces/radio'
import './css/panelTags.css'
import List from './List'

interface Props {
  tag: string
  allTags: Set<string> | undefined
  favoritesId: Array<string>
  playList: IRadio[] | undefined
  favoritesChange: (change: boolean, radioId: string) => void
}

const PanelTags = ({
  tag,
  allTags,
  favoritesId,
  playList,
  favoritesChange,
}: Props) => {
  const [tagsRadio, setTagsRadio] = useState<IRadio[] | undefined>([])
  const [selectTags, setSelectTags] = useState<string[]>([])
  //TODO: может можно обойтись без перевода set() в массив (дает ошибку)
  const listTags = allTags !== undefined ? Array.from(allTags) : []

  useEffect(() => {
    let result: IRadio[] | undefined
    let num = 0
    for (const prop in selectTags) {
      if (num === 0) {
        result = playList?.filter((radio: IRadio) =>
          radio.genres.find((item) => item === selectTags[prop])
        )
      } else {
        result =
          result !== undefined
            ? result.filter((radio) =>
                radio.genres.find((item) => item === selectTags[prop])
              )
            : result
      }
      num++
    }
    setTagsRadio(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTags])

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
      <ul className='tags'>
        {listTags.map((item) => (
          <li
            className={selectTags.find((tag) => item === tag) ? 'active' : ''}
            onClick={() => {
              tagChange(item)
            }}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
      {tagsRadio !== undefined &&
        tagsRadio.length !== 0 &&
        tagsRadio.map((radio) => (
          <List
            key={radio.id}
            favoritesID={favoritesId}
            radio={radio}
            favoritesChange={favoritesChange}
          />
        ))}
    </section>
  )
}

export default PanelTags

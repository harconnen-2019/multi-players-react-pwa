import React from 'react'

import styles from './Icon.module.css'

interface Props {
  name: string
  className?: string
  onClick: () => void
  active?: boolean
}

export const Icon = ({ name, className, onClick, active, ...attrs }: Props) => {
  const hi = active ? styles.active : ''
  return (
    <svg {...attrs} className={hi} onClick={onClick}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}

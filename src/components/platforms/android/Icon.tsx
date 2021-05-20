import classNames from 'classnames'

//TODO: использовать один компонент для всех плееров
interface Props {
  name: string
  className?: string
  onClick: () => void
  active?: boolean
}

export const Icon = ({ name, className, onClick, active, ...attrs }: Props) => {
  const classes = classNames({ active: active }, className)
  return (
    <svg {...attrs} className={classes} onClick={onClick}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}

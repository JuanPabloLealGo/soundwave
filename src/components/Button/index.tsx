import styles from './Button.module.scss'

export enum ButtonType {
  Filled = 'filled',
  Outlined = 'outlined',
  Text = 'text'
}

interface Props {
  className?: Object
  icon?: JSX.Element
  label?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  type: ButtonType
}

const Button = ({ className, icon, label, onClick, type }: Props) => {

  const _getClassName = (type: ButtonType) => {
    let className = ''

    if (type === ButtonType.Filled) {
      className = styles.ButtonFilled
    }

    return className
  }

  return (
    <button className={`${styles.Button} ${_getClassName(type)} btn--${type}`} onClick={onClick}>
      {icon && (
        <div className={styles.ButtonIcon}>{icon}</div>
      )}
      <span>{label ?? ''}</span>
    </button>
  )
}

export default Button
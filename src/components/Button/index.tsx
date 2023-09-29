import styles from './Button.module.scss'

export enum ButtonType {
  Filled = 'filled',
  Outlined = 'outlined',
  Text = 'text'
}

interface Props {
  className?: Object
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
  type: ButtonType
}

const Button = ({ className, children, onClick, type }: Props) => {

  const _getClassName = (type: ButtonType) => {
    let className = ''

    if (type === ButtonType.Filled) {
      className = styles.ButtonFilled
    }

    if (type === ButtonType.Outlined) {
      className = styles.ButtonOutlined
    }

    if (type === ButtonType.Text) {
      className = styles.ButtonText
    }

    return className
  }

  return (
    <button
      className={`${styles.Button} ${_getClassName(type)} btn--${type} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
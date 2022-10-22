import styles from "./MainButton.module.scss"

export enum MainButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface Props {
  className?: Object
  icon?: JSX.Element
  label?: string
  type: MainButtonType
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MainButton = ({ className, icon, label, onClick, type }: Props) => {
  return (
    <button className={`${className} ${styles.MainButton} btn--${type} btn`} onClick={onClick} >
      {icon ?? label}
    </button>
  )
}

export default MainButton
import styles from "./MainButton.module.scss"

interface Props {
  className?: Object
  icon?: JSX.Element
  label?: string
  type: string
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
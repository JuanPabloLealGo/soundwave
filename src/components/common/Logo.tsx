import { Size } from '../../enums/SizeEnum'
import { RootState, useAppSelector } from '../../redux-store'
import styles from './Logo.module.scss'

interface Props {
  size?: Size
}

const Logo = ({ size = Size.s }: Props) => {
  const isDarkTheme = useAppSelector((state: RootState) => state.ui.isDarkTheme)

  return (
    <div className={`${styles.Logo} logo--${size}`}>
      <img
        src={isDarkTheme ? '/images/green_logo.png' : '/images/black_logo.png'}
        alt='spotify'
      />
    </div>
  )
}

export default Logo
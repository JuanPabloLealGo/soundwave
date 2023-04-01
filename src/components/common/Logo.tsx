import { Size } from '../../enums/SizeEnum'
import { useAppSelector } from '../../redux-store'
import { uiSelector } from '../../redux-store/selectors'
import styles from './Logo.module.scss'

interface Props {
  size?: Size
}

const Logo = ({ size = Size.s }: Props) => {
  const { isDarkTheme } = useAppSelector(uiSelector)

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
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
      <img alt='logo' src={isDarkTheme ? '/assets/images/soundwave_principal_logo_dark_theme.png' : '/assets/images/soundwave_principal_logo.png'} />
    </div>
  )
}

export default Logo
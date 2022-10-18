import { SiCastbox } from 'react-icons/si'
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.Logo}>
      <SiCastbox className={styles.LogoImg} />
      <span style={{}} className='logo'>Music box</span>
    </div>
  )
}

export default Logo
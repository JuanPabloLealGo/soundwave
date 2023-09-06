import { Link } from 'react-router-dom'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'

import Logo from '../Logo'
import styles from './Footer.module.scss'
import { Size } from '../../enums/SizeEnum'

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterContainer}>
        <Logo size={Size.m} />
        <Link className={`${styles.FooterLink}`} to='/'>SERVICES</Link>
        <div>
          <Link
            className={styles.FooterSocialMediaItem}
            target='_blank'
            to='https://linkedin.com/in/juan-pablo-leal-gonzalez-0a9321195'
          >
            <AiFillLinkedin />
          </Link>
          <Link
            className={styles.FooterSocialMediaItem}
            target='_blank'
            to='https://github.com/JuanPabloLealGo'
          >
            <AiFillGithub />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
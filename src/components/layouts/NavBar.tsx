import styles from './NavBar.module.scss'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { HiMenu } from 'react-icons/hi'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../common/Logo'
import MainButton, { MainButtonType } from '../common/MainButton'
import { RootState, useAppDispatch, useAppSelector } from '../../redux-store'
import { logout } from '../../redux-store/reducers/authSlice'
import { AUTH_URL } from '../../environment/appEnvironment'

const NavBar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false)
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.data)

  const onClickHandler = () => setIsActive(!isActive)
  const onClickLogoHandler = () => setIsActive(false)
  const onLoginHandler = () => window.location.replace(AUTH_URL)

  const onLogoutHandler = () => {
    dispatch(logout())
    return navigate('/')
  }

  const privateLinks = [
    { label: 'Home', link: '/' },
    { label: 'Favorites', link: '/favorites' },
  ]

  const publicLinks = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Contact', link: '/contact' },
  ]

  const links = isAuthenticated ? privateLinks : publicLinks

  return (
    <nav className={styles.NavBar}>
      <div className={styles.NavBarContainer}>
        <NavLink onClick={onClickLogoHandler} to={'/'} className={`link ${styles.NavBarLogo}`}>
          <Logo />
        </NavLink>
        <ul
          className={`${styles.NavBarMenu} ${isActive && `${styles.NavBarMenuActive} background-theme`}`}
          onClick={onClickHandler}
        >
          {
            links.map((item, index) => {
              const { label, link } = item
              return (
                <li key={index}>
                  <NavLink
                    end
                    className={({ isActive }) => `link ${styles.NavBarMenuLink} ${isActive && styles.NavBarMenuLinkActive}`}
                    to={link}
                  >
                    {label}
                  </NavLink>
                </li>
              )
            })
          }
          <MainButton
            label={isAuthenticated ? 'Sign Out' : 'Sign In'}
            onClick={isAuthenticated ? onLogoutHandler : onLoginHandler}
            className={styles.NavBarSignOnButton}
            type={MainButtonType.Secondary}
          />
        </ul>
        <button
          className={`color-theme ${styles.NavBarMenuIcon}`}
          onClick={onClickHandler}
        >
          {isActive ? <IoMdClose /> : <HiMenu />}
        </button>
      </div>
    </nav>
  )
}

export default NavBar
import styles from './NavBar.module.scss'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { HiMenu } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo'
import MainButton, { MainButtonType } from '../MainButton'
import { RootState, useAppDispatch, useAppSelector } from '../../redux-store'
import { logout } from '../../redux-store/reducers/authSlice'
import { AUTH_URL } from '../../environment/appEnvironment'

const NavBar = () => {
  const dispatch = useAppDispatch()
  const [isActive, setIsActive] = useState(false)
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.data)

  const onClickHandler = () => setIsActive(!isActive)
  const onClickLogoHandler = () => setIsActive(false)
  const onLoginHandler = () => window.location.replace(AUTH_URL)

  const onLogoutHandler = () => {
    dispatch(logout())
    window.location.replace('/')
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
        <NavLink onClick={onClickLogoHandler} to={'/'} className={`nav-link ${styles.NavBarLogo}`}>
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
                    className={({ isActive }) => `nav-link ${styles.NavBarMenuLink} ${isActive && styles.NavBarMenuLinkActive}`}
                    to={link}
                  >
                    {label}
                  </NavLink>
                </li>
              )
            })
          }
          {isAuthenticated ? (
            <MainButton
              label="Sign Out"
              onClick={onLogoutHandler}
              className={styles.NavBarSignOnButton}
              type={MainButtonType.Secondary}
            />
          ) : (
            <MainButton
              label='Sign In'
              onClick={onLoginHandler}
              className={styles.NavBarSignOnButton}
              type={MainButtonType.Secondary}
            />
          )}
        </ul>
        <button
          className={`mobile-menu-icon ${styles.NavBarMenuIcon}`}
          onClick={onClickHandler}
        >
          {isActive ? <IoMdClose /> : <HiMenu />}
        </button>
      </div>
    </nav>
  )
}

export default NavBar
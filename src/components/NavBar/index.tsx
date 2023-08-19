import styles from './NavBar.module.scss'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BiSolidMoon } from 'react-icons/bi'
import { IoMdSunny } from 'react-icons/io'
import { HiMenu } from 'react-icons/hi'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import { useAppDispatch, useAppSelector } from '../../redux-store'
import { logout } from '../../redux-store/reducers/authSlice'
import { AUTH_URL } from '../../environment/appEnvironment'
import { Size } from '../../enums/SizeEnum'
import { authSelector, uiSelector } from '../../redux-store/selectors'
import Button, { ButtonType } from '../Button'
import { toogleTheme } from '../../redux-store/reducers/uiSlice'

const NavBar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false)
  const { data: isAuthenticated } = useAppSelector(authSelector)
  const { isDarkTheme } = useAppSelector(uiSelector)

  const onClickHandler = () => setIsActive(!isActive)
  const onClickLogoHandler = () => setIsActive(false)
  const onLoginHandler = () => window.location.replace(AUTH_URL)

  const onLogoutHandler = () => {
    dispatch(logout())
    return navigate('/')
  }

  const onToggleThemeHandler = () => {
    dispatch(toogleTheme())
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
    <header className={`background-theme ${styles.NavBar}`}>
      <nav className={styles.NavBarContainer}>
        <NavLink onClick={onClickLogoHandler} to={'/'} className={`link ${styles.NavBarLogo}`}>
          <Logo size={Size.m} />
        </NavLink>
        <ul
          className={`${styles.NavBarMenu} ${isActive && `${styles.NavBarMenuActive} background-theme`}`}
          onClick={onClickHandler}
        >
          {links.map((item, index) => {
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
          })}
          <Button
            onClick={onToggleThemeHandler}
            type={ButtonType.Text}
            icon={isDarkTheme ? <IoMdSunny /> : <BiSolidMoon />}
          />
          <Button
            className={styles.NavBarButton}
            label={isAuthenticated ? 'Sign Out' : 'Sign In'}
            onClick={isAuthenticated ? onLogoutHandler : onLoginHandler}
            type={ButtonType.Outlined}
          />
        </ul>
        <button
          className={`nav-icon ${styles.NavBarMenuIcon}`}
          onClick={onClickHandler}
        >
          {isActive ? <IoMdClose /> : <HiMenu />}
        </button>
      </nav>
    </header>
  )
}

export default NavBar
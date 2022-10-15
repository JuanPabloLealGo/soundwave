import styles from './NavBar.module.scss'
import { TiThMenuOutline } from 'react-icons/ti'
import { IoMdClose } from 'react-icons/io'
import { HiMenu } from 'react-icons/hi'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux-store'
import { logout } from '../redux-store/reducers/authSlice'
import MainButton, { MainButtonType } from './MainButton'
import Logo from './Logo'

const NavBar = () => {

  const [isActive, setIsActive] = useState(false)
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.auth)

  const onLogoutHandler = () => dispatch(logout())

  const onClickHandler = () => setIsActive(!isActive)

  const onClickLogoHandler = () => setIsActive(false)

  const links = [
    { label: 'Home', link: '/' },
    { label: 'Favorites', link: '/favorites' },
    { label: 'About', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Contact', link: '/contact' },
  ]

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
          {data && (
            <MainButton
              label="Sign Out"
              onClick={onLogoutHandler}
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
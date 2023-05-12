import { Outlet } from "react-router-dom"
import NavBar from "../NavBar"
import Footer from "../Footer"
import ToggleThemeButton from "../ToggleThemeButton"
import styles from "./MainLayout.module.scss"
import useAuth from "../../hooks/useAuth"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { uiSelector } from "../../redux-store/selectors"
import ErrorMessage from "../ErrorMessage"
import { setErrorMessage } from "../../redux-store/reducers/uiSlice"
import { logout } from "../../redux-store/reducers/authSlice"

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const authError = useAuth()
  const { errorMessage } = useAppSelector(uiSelector)
  const error = authError || errorMessage

  const clickHandler = () => {
    dispatch(setErrorMessage(null))
    dispatch(logout())
  }

  return (
    <>
      {error && (
        <ErrorMessage
          error={error}
          onClick={clickHandler}
        />
      )}
      <NavBar />
      <main className={styles.MainLayoutContent}>
        <Outlet />
        <ToggleThemeButton className={styles.MainLayoutThemeButton} />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
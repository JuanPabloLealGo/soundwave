import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import ToggleThemeButton from "../ToggleThemeButton"
import styles from "./MainLayout.module.scss"

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <ToggleThemeButton className={styles.MainLayoutThemeButton} />
      <Footer />
    </div>
  )
}

export default MainLayout
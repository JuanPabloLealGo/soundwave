import { Outlet } from "react-router-dom"
import NavBar from "../NavBar"
import Footer from "../Footer"
import ToggleThemeButton from "../ToggleThemeButton"
import styles from "./MainLayout.module.scss"

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className={styles.MainLayoutContent}>
        <Outlet />
      </div>
      <ToggleThemeButton className={styles.MainLayoutThemeButton} />
      <Footer />
    </>
  )
}

export default MainLayout
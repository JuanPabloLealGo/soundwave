import { useAppDispatch, useAppSelector } from "../../redux-store"
import { logout } from "../../redux-store/reducers/authSlice"
import MainButton, { MainButtonType } from "../MainButton"
import styles from "./Header.module.scss"


const Header = () => {

  return (
    <div className={styles.Header}>
      Header
    </div>
  )
}

export default Header
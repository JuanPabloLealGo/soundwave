import { useAppDispatch, useAppSelector } from "../../redux-store"
import { logout } from "../../redux-store/reducers/authSlice"
import MainButton, { MainButtonType } from "../MainButton"
import styles from "./Header.module.scss"


const Header = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.auth)

  const onLogoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.Header}>
      <h1>Header</h1>
      {data && (
        <MainButton
          label="Sign Out"
          onClick={onLogoutHandler}
          type={MainButtonType.Secondary}
        />
      )}
    </div>
  )
}

export default Header
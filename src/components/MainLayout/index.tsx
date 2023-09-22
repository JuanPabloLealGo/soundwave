import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

import ToastMessage, { MessageType } from "../ToastMessage"
import Footer from "../Footer"
import NavBar from "../NavBar"
import Player from "../Player"
import useAuth from "../../hooks/useAuth"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { uiSelector } from "../../redux-store/selectors"
import { setErrorMessage } from "../../redux-store/reducers/uiSlice"
import { logout } from "../../redux-store/reducers/authSlice"

import styles from "./MainLayout.module.scss"

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const authError = useAuth()
  const { errorMessage } = useAppSelector(uiSelector)
  const [showOpenSpotifyMessage, setShowOpenSpotifyMessage] = useState<boolean>(false)
  const error = authError || errorMessage

  const clickHandler = () => {
    dispatch(setErrorMessage(null))
    dispatch(logout())
  }

  const openSpotifyMessageHandler = (showMessage: boolean) =>
    setShowOpenSpotifyMessage(showMessage)

  const openSpotifyMessage = (
    <section className={styles.OpenSpotifyMessage}>
      <p>Please make sure you have spotify open, play any song for one sec and try play your track in our UI</p>
    </section>
  )

  return (
    <>
      {error && (
        <ToastMessage
          type={MessageType.Error}
          error={error}
          onClick={clickHandler}
        />
      )}
      <Player onShowSpotifyMessage={openSpotifyMessageHandler} />
      <NavBar />
      <main className={styles.MainLayoutContent}>
        {showOpenSpotifyMessage && openSpotifyMessage}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
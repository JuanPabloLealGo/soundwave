import ErrorMessageInterface from "../../interfaces/ErrorMessageInterface"
import { useAppDispatch } from "../../redux-store"
import { logout } from "../../redux-store/reducers/authSlice"
import { setErrorMessage } from "../../redux-store/reducers/uiSlice"
import styles from "./ErrorMessage.module.scss"

interface Props {
  errorMessage: ErrorMessageInterface
}

const ErrorMessage = ({ errorMessage }: Props) => {
  const dispatch = useAppDispatch()
  const { title, error, showLoginAgainButton } = errorMessage

  const clickHandler = () => {
    dispatch(setErrorMessage(null));

    if (showLoginAgainButton) {
      dispatch(logout())
    }
  }

  return (
    <div className={styles.ErrorMessage}>
      <div className={styles.ErrorMessageBackdrop} />
      <div className={styles.ErrorMessagePopup}>
        <div className={styles.ErrorMessagePopupTitle}>{title}</div>
        <div className={styles.ErrorMessagePopupMessage}>{error}</div>
        <div className={styles.ErrorMessagePopupButton}>
          <button className='background-theme color-theme' onClick={clickHandler}>
            {showLoginAgainButton ? 'Click to login again' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage
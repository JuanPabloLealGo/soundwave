import styles from "./ErrorMessage.module.scss"

interface Props {
  errorMessage: string
  onClick?: () => void
  title: string
}

const ErrorMessage = ({ errorMessage, onClick, title }: Props) => {
  return (
    <div className={styles.ErrorMessage}>
      <div className={styles.ErrorMessageBackdrop} />
      <div className={styles.ErrorMessagePopup}>
        <div className={styles.ErrorMessagePopupTitle}>{title}</div>
        <div className={styles.ErrorMessagePopupMessage}>{errorMessage}</div>
        <div className={styles.ErrorMessagePopupButton}>
          <button className='background-theme color-theme' onClick={onClick}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage
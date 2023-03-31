import styles from "./ErrorMessage.module.scss"

interface Props {
  error: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ErrorMessage = ({ error, onClick }: Props) => {

  return (
    <div className={styles.ErrorMessage}>
      <div className={styles.ErrorMessageBackdrop} />
      <div className={styles.ErrorMessagePopup}>
        <div className={styles.ErrorMessagePopupTitle}>Error Message</div>
        <div className={styles.ErrorMessagePopupMessage}>{error}</div>
        <div className={styles.ErrorMessagePopupButton}>
          <button className='background-theme color-theme' onClick={onClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage
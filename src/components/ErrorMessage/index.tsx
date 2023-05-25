import styles from "./ErrorMessage.module.scss"

interface Props {
  error: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ErrorMessage = ({ error, onClick }: Props) => {

  return (
    <section className={styles.ErrorMessage}>
      <div className={styles.ErrorMessageBackdrop} />
      <div className={styles.ErrorMessagePopup}>
        <h2 className={styles.ErrorMessagePopupTitle}>Error Message</h2>
        <p className={styles.ErrorMessagePopupMessage}>{error}</p>
        <div className={styles.ErrorMessagePopupButton}>
          <button className='background-theme color-theme' onClick={onClick}>
            Close
          </button>
        </div>
      </div>
    </section>
  );
}

export default ErrorMessage
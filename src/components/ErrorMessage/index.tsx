import styles from "./ErrorMessage.module.scss"

interface Props {
  error: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ErrorMessage = ({ error, onClick }: Props) => {

  return (
    <div className={styles.ErrorMessage}>
      <div className={styles.ErrorMessageBackdrop} />
      <article className={styles.ErrorMessagePopup}>
        <header>
          <h2>Error Message</h2>
        </header>
        <p className={styles.ErrorMessagePopupMessage}>{error}</p>
        <footer className={styles.ErrorMessagePopupButton}>
          <button className='background-theme color-theme' onClick={onClick}>
            Close
          </button>
        </footer>
      </article>
    </div>
  );
}

export default ErrorMessage
import styles from "./Popup.module.scss"

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode | string
}

const Popup = ({ children, onClick }: Props) => {

  return (
    <div className={styles.ErrorMessage}>
      <div className={styles.ErrorMessageBackdrop} />
      {children}
    </div>
  );
}

export default Popup
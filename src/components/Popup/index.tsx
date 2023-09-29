import styles from "./Popup.module.scss"

interface Props {
  children: React.ReactNode | string
}

const Popup = ({ children }: Props) => {

  return (
    <div className={styles.Popup}>
      <div className={styles.PopupBackdrop} />
      <div className={`${styles.PopupBody} background-theme`} >
        {children}
      </div>
    </div>
  );
}

export default Popup
import Popup from "../Popup";

import { RiCloseCircleFill, RiCheckboxCircleFill } from "react-icons/ri"

import styles from "./ToastMessage.module.scss"
import Button, { ButtonType } from "../Button";

interface Props {
  error: string
  type?: MessageType
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export enum MessageType {
  Default = 'default',
  Error = 'error',
  Success = 'success',
}

const ToastMessage = ({ error, type = MessageType.Default, onClick }: Props) => {

  let icon = null
  let title = 'Hey!'

  if (type === MessageType.Error) {
    icon = <RiCloseCircleFill />
    title = 'OOPS'
  }

  if (type === MessageType.Success) {
    icon = <RiCheckboxCircleFill />
    title = 'SUCCESS'
  }

  return (
    <Popup>
      <article className={`${styles.ToastMessage} background-theme shadowed`}>
        <header className={`${styles.ToastMessageHeader} ${type}`}>
          {icon}
          <h2>{title}</h2>
        </header>
        <p className={styles.ToastMessageBody}>{error}</p>
        <footer className={styles.ToastMessageButton}>
          <Button onClick={onClick} type={ButtonType.Outlined}>
            <span>Close</span>
          </Button>
        </footer>
      </article>
    </Popup>
  );
}

export default ToastMessage
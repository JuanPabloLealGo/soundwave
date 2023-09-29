import styles from "./FeedbackMessage.module.scss"

export enum FeedbackMessageType {
  Error = 'Error',
  Information = 'Information'
}

interface Props {
  type: FeedbackMessageType
  message: string
}

interface IconProps {
  type: FeedbackMessageType
}

const FeedbackMessage = ({ message, type }: Props) => {
  return (
    <article className={styles.FeedbackMessage}>
      <FeedBackIcon type={type} />
      <p className={styles.FeedbackMessageText}>{message}</p>
    </article>
  )
}

const FeedBackIcon = ({ type }: IconProps) => {
  if (type === FeedbackMessageType.Error) {
    return <img className={styles.FeedbackMessageIcon} alt='error' src='/images/sad-emoji.svg' />
  }

  if (type === FeedbackMessageType.Information) {
    return <img className={styles.FeedbackMessageIcon} alt='info' src='/images/crying-emoji.svg' />
  }

  return null
}

export default FeedbackMessage
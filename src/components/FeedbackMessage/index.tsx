import { PiSmileySad, PiNotepadDuotone } from "react-icons/pi"
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
	className: string
}

const FeedbackMessage = ({ message, type }: Props) => {
	return (
		<article className={styles.FeedbackMessage}>
			<FeedBackIcon type={type} className={styles.FeedbackMessageIcon} />
			<span>{message}</span>
		</article>
	)
}

const FeedBackIcon = ({ type, className }: IconProps) => {
	if (type === FeedbackMessageType.Error) {
		return <PiSmileySad className={className} />
	}

	if (type === FeedbackMessageType.Information) {
		return <PiNotepadDuotone className={className} />
	}

	return null
}

export default FeedbackMessage
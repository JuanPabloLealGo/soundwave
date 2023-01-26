import Draggable from "react-draggable"
import styles from "./Player.module.scss"

interface Props {
  isDraggable?: boolean
}

const Player = ({ isDraggable }: Props) => {

  const body = (
    <div className={styles.Player}>
      {`${isDraggable ? 'Draggable' : ''} Player Component`}
    </div>
  )

  return isDraggable ?
    (
      <Draggable bounds='parent'>
        {body}
      </Draggable>
    ) : body
}

export default Player
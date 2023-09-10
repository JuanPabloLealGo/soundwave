import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from "react-icons/bs"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { playerSelector } from "../../redux-store/selectors"
import { changePlayerState } from "../../redux-store/actions/playerActions"
import { PlayerStateEnum } from "../../enums/PlayerStateEnum"

interface Props {
  playerState: boolean
  onChangeState: () => void
}

const PlayerControls = ({ playerState, onChangeState }: Props) => {



  return (
    <section style={{ display: 'flex' }}>
      <div>
        <BsShuffle />
      </div>
      <div>
        {playerState ? (
          <BsFillPauseCircleFill onClick={onChangeState} />
        ) : (
          <BsFillPlayCircleFill onClick={onChangeState} />
        )}
      </div>
    </section>
  )
}

export default PlayerControls
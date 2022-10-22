import PlayListInterface from "../interfaces/PlayListInterface"

interface Props {
  playLists: PlayListInterface[]
}

const PlayLists = ({ playLists }: Props) => {
  return (
    <div>
      {playLists.map((playList, index) => {
        return playList?.id
          ? <div key={index}>{playList?.name.toLowerCase()}</div>
          : null
      })}
    </div>
  )
}

export default PlayLists
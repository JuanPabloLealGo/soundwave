import { UIEvent, useEffect, useState } from "react"
import { PaginationEnum } from "../../enums/PaginationEnum"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import PlaylistCard from "../PlaylistCard"
import styles from "./Playlist.module.scss"
import { playlistPageSelector, uiSelector } from "../../redux-store/selectors"
import { getPlaylistPageByCategory } from "../../redux-store/actions/playlistPageActions"

interface Props {
  categoryId: string
}

const Playlist = ({ categoryId }: Props) => {

  const dispatch = useAppDispatch()
  const [currentOffset, setCurrentOffset] = useState(0)
  const { data } = useAppSelector(playlistPageSelector)
  const { isDragging } = useAppSelector(uiSelector)
  const playlist = data && data[categoryId] ? data[categoryId].items : []

  useEffect(() => {
    if (categoryId) {
      dispatch(getPlaylistPageByCategory({
        categoryId,
        limit: PaginationEnum.playlistsLimit,
        offset: currentOffset
      }))
    }
  }, [categoryId, currentOffset, dispatch])

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
    const hasMoreData = data && data[categoryId] && data[categoryId].next !== null

    if (hasMoreData && (Math.floor(scrollWidth - scrollLeft) <= clientWidth)) {
      setCurrentOffset(prev => prev + PaginationEnum.playlistsLimit)
    }
  }

  if (data && data[categoryId] && (data[categoryId].total === 0 || data[categoryId].items.length === 0)) {
    return (
      <div>No playlists</div>
    )
  }

  return (
    <div
      onScroll={handleScroll}
      style={{ 'overflowX': `${isDragging ? 'hidden' : 'auto'}` }}
      className={styles.Playlists}
    >
      {playlist.map((playlist, i) => {
        return playlist?.id
          ? <PlaylistCard key={i} categoryId={categoryId} playlist={playlist} />
          : null
      })}
    </div>
  )
}

export default Playlist
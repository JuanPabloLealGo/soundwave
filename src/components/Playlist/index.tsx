import { UIEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import PlaylistCard from "../PlaylistCard"
import { PaginationEnum } from "../../enums/PaginationEnum"
import { playlistPageSelector, uiSelector } from "../../redux-store/selectors"
import { getPlaylistPageByCategory } from "../../redux-store/actions/playlistPageActions"

import styles from "./Playlist.module.scss"

interface Props {
  categoryId?: string
}

const Playlist = ({ categoryId }: Props) => {

  const dispatch = useAppDispatch()
  const [currentOffset, setCurrentOffset] = useState(0)
  const { data, isLoading } = useAppSelector(playlistPageSelector)
  const { isDragging } = useAppSelector(uiSelector)

  const playlist = data && categoryId && data[categoryId] ? data[categoryId].items : []
  const hasMoreData = data && categoryId && data[categoryId] && data[categoryId].next !== null

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

    if (hasMoreData && (Math.floor(scrollWidth - scrollLeft - 30) <= clientWidth)) {
      setCurrentOffset(prev => prev + PaginationEnum.playlistsLimit)
    }
  }

  if (data && categoryId && data[categoryId] && (data[categoryId].total === 0 || data[categoryId].items.length === 0)) {
    return (
      <div>No playlists</div>
    )
  }

  let emptyPlayList = Array.from(Array(PaginationEnum.playlistsLimit))
    .map((item, i) => <PlaylistCard key={i} />)

  return (
    <div
      onScroll={handleScroll}
      style={{ 'overflowX': `${isDragging ? 'hidden' : 'auto'}` }}
      className={styles.Playlists}
    >
      {playlist.map((item, i) => {
        return item?.id
          ? <PlaylistCard key={i} playlist={item} />
          : null
      })}
      {(!categoryId || (hasMoreData && isLoading)) && emptyPlayList}
    </div>
  )
}

export default Playlist
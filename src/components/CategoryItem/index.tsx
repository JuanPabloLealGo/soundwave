import { useEffect, useState, UIEvent } from "react"
import CategoryItemInterface from "../../interfaces/CategoryItemIterface"
import { capitalizeFirstLetter } from "../../utils"
import styles from "./CategoryItem.module.scss"
import PlaylistCards from "../PlaylistCards"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { getPlaylistPageByCategory } from "../../redux-store/actions/playlistPageActions"
import { playlistPageSelector } from "../../redux-store/selectors"
import { PaginationEnum } from "../../enums/PaginationEnum"
import SkeletonElement from "../SkeletonElement"
import { SkeletonTypes } from "../../enums/SkeletonTypes"

interface Props {
  hasError: boolean
  item: CategoryItemInterface
  onAddCategoryWithError: (categoryId: string) => void
}

const CategoryItem = ({ hasError, item, onAddCategoryWithError }: Props) => {
  const dispatch = useAppDispatch()
  const {
    data: playlistsByCategory,
    isLoading,
    error
  } = useAppSelector(playlistPageSelector)
  const [currentOffset, setCurrentOffset] = useState(0)
  const hasNextPage = playlistsByCategory?.[item.id]?.next !== null

  useEffect(() => {
    dispatch(getPlaylistPageByCategory({
      categoryId: item.id,
      limit: PaginationEnum.playlistsLimit,
      offset: currentOffset,
    }))
  }, [currentOffset, item, dispatch])

  useEffect(() => {
    if (error) {
      onAddCategoryWithError(item.id)
    }
  }, [error, item, onAddCategoryWithError])

  let content = null

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget

    if (hasNextPage && (Math.floor(scrollWidth - scrollLeft) <= clientWidth)) {
      setCurrentOffset(prev => prev + PaginationEnum.playlistsLimit)
    }
  }

  const categoryIsLoading = !playlistsByCategory?.[item.id] || isLoading

  if (categoryIsLoading) {
    content = <SkeletonElement type={SkeletonTypes.CategoryItem} />
  }

  if (hasError && !isLoading) {
    content = <p>Something went wrong!</p>
  }

  if (playlistsByCategory && playlistsByCategory[item.id]) {
    if (playlistsByCategory[item.id].items.length > 0) {

      const playlistIsLoading = !playlistsByCategory[item.id].items[currentOffset] && isLoading

      content = (
        <PlaylistCards
          isLoading={playlistIsLoading}
          onScrollHandle={handleScroll}
          playlists={playlistsByCategory[item.id]}
        />
      )

    } else {
      content = <p>No items</p>
    }
  }

  return (
    <div className={styles.CategoryItem}>
      <span className={styles.CategoryItemName}>
        {capitalizeFirstLetter(item.name)}
      </span>
      {content}
    </div>
  )
}

export default CategoryItem
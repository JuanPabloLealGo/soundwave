import { UIEvent } from "react"
import Playlists from "./PlayLists"
import CategoryItemInterface from "../interfaces/CategoryItemIterface"
import PlaylistsPageInterface from "../interfaces/PlaylistPageInterface"
import { capitalizeFirstLetter } from "../utils/methods"
import styles from "./CategoryList.module.scss"

interface Props {
  categories: CategoryItemInterface[]
  playlistsByCategories: { [key: string]: PlaylistsPageInterface }
}

const CategoryList = ({ categories, playlistsByCategories }: Props) => {
  // const scrollableContainerRef = useRef<HTMLHeadingElement>(null)
  const handleScroll = (e: UIEvent<HTMLElement>) => {
    // Make sure the data is not loading before send a new request

    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget

    if (Math.floor(scrollWidth - scrollLeft) <= clientWidth) {
      console.log('request')
    }
  }

  return (
    <div className={styles.CategoryList}>
      {categories.map((category) => {
        const categoryPlaylists = playlistsByCategories[category.id];

        return (
          <div
            className={styles.CategoryListItem}
            key={category.id}
            onScroll={handleScroll}
          >
            <span className={styles.CategoryListItemName}>
              {capitalizeFirstLetter(category.name)}
            </span>
            <Playlists
              onScroll={handleScroll}
              playlists={categoryPlaylists?.items ?? []}
            />
          </div>
        )
      })}
    </div>
  )
}

export default CategoryList
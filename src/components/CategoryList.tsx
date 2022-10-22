import CategoryItemInterface from "../interfaces/CategoryItemIterface"
import PlaylistsPageInterface from "../interfaces/PlaylistPageInterface"
import styles from "./CategoryList.module.scss"
import Playlists from "./Playlists"

interface Props {
  categories: CategoryItemInterface[]
  playlistsByCategories: { [key: string]: PlaylistsPageInterface }
}

const CategoryList = ({ categories, playlistsByCategories }: Props) => {
  return (
    <div className={styles.CategoryList}>
      {categories.map((category) => {
        return (
          <div className={styles.CategoryListItem} key={category.id}>
            <div className={styles.CategoryListItemName} >
              {category.name.toLowerCase()}
            </div>
            <Playlists playlists={playlistsByCategories[category.id]?.items ?? []} />
          </div>
        )
      })}
    </div>
  )
}

export default CategoryList
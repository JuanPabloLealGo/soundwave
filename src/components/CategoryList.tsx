import CategoryItemInterface from "../interfaces/CategoryItemIterface"
import PlayListsPageInterface from "../interfaces/PlayListsPageInterface"
import styles from "./CategoryList.module.scss"
import PlayLists from "./PlayLists"

interface Props {
  categories: CategoryItemInterface[]
  playListsByCategories: { [key: string]: PlayListsPageInterface }
}

const CategoryList = ({ categories, playListsByCategories }: Props) => {
  return (
    <div className={styles.CategoryList}>
      {categories.map((category) => {
        return (
          <div className={styles.CategoryListItem} key={category.id}>
            <div className={styles.CategoryListItemName} >{category.name.toLowerCase()}</div>
            <PlayLists playLists={playListsByCategories[category.id]?.items ?? []} />
          </div>
        )
      })}
    </div>
  )

}

export default CategoryList
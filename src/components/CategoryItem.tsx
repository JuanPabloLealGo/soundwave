import { LegacyRef } from "react"
import CategoryItemInterface from "../interfaces/CategoryItemIterface"
import { capitalizeFirstLetter } from "../utils/methods"
import styles from "./CategoryItem.module.scss"
import Playlists from "./Playlists"

interface Props {
  item: CategoryItemInterface
  categoryRef?: LegacyRef<HTMLDivElement>
}

const CategoryItem = ({ item, categoryRef }: Props) => {

  return (
    <div
      ref={categoryRef}
      className={styles.CategoryItem}
      key={item.id}
    >
      <span className={styles.CategoryItemName}>
        {capitalizeFirstLetter(item.name)}
      </span>
      <Playlists categoryId={item.id} />
    </div>
  )
}

export default CategoryItem
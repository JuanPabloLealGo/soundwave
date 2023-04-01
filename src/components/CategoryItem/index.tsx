import { LegacyRef } from "react"
import CategoryItemInterface from "../../interfaces/CategoryItemIterface"
import { capitalizeFirstLetter } from "../../utils/methods"
import styles from "./CategoryItem.module.scss"
import Playlist from "../Playlist"

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
      <Playlist categoryId={item.id} />
    </div>
  )
}

export default CategoryItem
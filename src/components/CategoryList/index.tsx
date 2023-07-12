import { useEffect, useState } from "react"
import { PaginationEnum } from "../../enums/PaginationEnum"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { getCategoryPage } from "../../redux-store/actions/categoryActions"
import CategoryItem from "../CategoryItem"
import { categorySelector } from "../../redux-store/selectors"

import styles from "./CategoryList.module.scss"
import Loader from "../Loader"

const CategoryList = () => {
  const dispatch = useAppDispatch()

  const {
    data: categories,
    isLoading
  } = useAppSelector(categorySelector)
  const [currentOffset, setCurrentOffset] = useState(0)
  const [categoryWithErrorIds, setCategoryWithErrorIds] = useState<string[]>([]);
  const hasNextPage = !!categories?.next

  useEffect(() => {
    dispatch(getCategoryPage({ limit: PaginationEnum.commonLimit, offset: currentOffset }))
  }, [currentOffset, dispatch])

  const handleLoadMoreClick = () => {
    setCurrentOffset(prev => prev + PaginationEnum.commonLimit)
  }

  const handleCategoryWithError = (categoryId: string) => {
    setCategoryWithErrorIds((prev: string[]) => [...prev, categoryId] )
  }

  return (
    <div className={styles.CategoryList}>
      {categories?.items.map((category, i) => {
        return <CategoryItem key={`${category.id}_${i}`} hasError={categoryWithErrorIds.includes(category.id)} item={category} onAddCategoryWithError={handleCategoryWithError}/>
      })}
      {!isLoading && hasNextPage && (
        <button onClick={handleLoadMoreClick}>Load More</button>
      )}
      {isLoading && <Loader />}
    </div>
  )
}

export default CategoryList
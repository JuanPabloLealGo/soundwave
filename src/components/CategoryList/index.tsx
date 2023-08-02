import { useCallback, useEffect, useState } from "react"
import { PaginationEnum } from "../../enums/PaginationEnum"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { getCategoryPage } from "../../redux-store/actions/categoryActions"
import CategoryItem from "../CategoryItem"
import { categorySelector } from "../../redux-store/selectors"

import styles from "./CategoryList.module.scss"
import SkeletonElement from "../SkeletonElement"
import { SkeletonTypes } from "../../enums/SkeletonTypes"

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

  const handleCategoryWithError = useCallback((categoryId: string) => {
    setCategoryWithErrorIds((prev: string[]) => [...prev, categoryId])
  }, []);

  const categoryListIsLoading = !categories || isLoading

  return (
    <div className={styles.CategoryList}>
      {categories?.items.map((category, i) => {
        return (
          <CategoryItem
            key={`${category.id}_${i}`}
            hasError={categoryWithErrorIds.includes(category.id)}
            item={category}
            onAddCategoryWithError={handleCategoryWithError}
          />
        )
      })}
      {categoryListIsLoading && <SkeletonElement type={SkeletonTypes.CategoryList} />}
      {!isLoading && hasNextPage && (
        <button onClick={handleLoadMoreClick}>Load More</button>
      )}
    </div>
  )
}

export default CategoryList
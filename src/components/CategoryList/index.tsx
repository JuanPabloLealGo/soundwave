import { useCallback, useEffect, useRef, useState } from "react"
import { PaginationEnum } from "../../enums/PaginationEnum"
import { useAppDispatch, useAppSelector } from "../../redux-store"
import { getCategoryPage } from "../../redux-store/actions/categoryActions"
import CategoryItem from "../CategoryItem"
import { categorySelector } from "../../redux-store/selectors"

import styles from "./CategoryList.module.scss"
import { getList } from "../../utils"

const CategoryList = () => {
  const dispatch = useAppDispatch()

  const {
    data: categories,
    isLoading
  } = useAppSelector(categorySelector)
  const [currentOffset, setCurrentOffset] = useState(0)
  const hasNextPage = !!categories?.next

  useEffect(() => {
    dispatch(getCategoryPage({ limit: PaginationEnum.commonLimit, offset: currentOffset }))
  }, [currentOffset, dispatch])

  // Intersection Observer
  const intObserver = useRef<IntersectionObserver | null>(null)

  const lastCategoryRef = useCallback((categoryElement: any) => {
    if (isLoading) return

    // we're essentially telling it to stop looking if we already have one there
    if (intObserver.current) intObserver.current.disconnect()

    intObserver.current = new IntersectionObserver(categories => {
      if (categories[0].isIntersecting && hasNextPage) {
        setCurrentOffset(prev => prev + PaginationEnum.commonLimit)
      }
    })

    if (categoryElement) intObserver.current.observe(categoryElement)
  }, [isLoading, hasNextPage])

  const skeletonList = getList(PaginationEnum.commonLimit)

  return (
    <div className={styles.CategoryList}>
      {
        categories?.items.map((category, i) => {

          if (categories.items.length === i + 1) {
            return (
              <CategoryItem
                key={`${category.id}_${i}`}
                categoryRef={lastCategoryRef}
                item={category}
              />)
          }

          return <CategoryItem key={`${category.id}_${i}`} item={category} />
        })
      }
      {isLoading && skeletonList.map((item, i) => <CategoryItem key={i} />)}
    </div>
  )
}

export default CategoryList
import { useEffect } from "react"
import { useRef } from "react"

import { RootState, useAppDispatch, useAppSelector } from "../../redux-store"
import { getCategoryPage } from "../../redux-store/actions/categoryActions"
import { getPlayListsPage } from "../../redux-store/actions/playListActions"
import CategoryList from "../CategoryList"
import Spinner from "../common/Spinner"

import styles from './Home.module.scss'

const Home = () => {
  const dispatch = useAppDispatch()
  const didMountRef = useRef(true)

  const {
    data: categories,
    isLoading: categoriesIsLoading
  } = useAppSelector((state: RootState) => state.category)

  const {
    data: playListsByCategory,
    isLoading: playListsByCategoryIsLoading
  } = useAppSelector((state: RootState) => state.playLists)

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (categories) {
      if (!playListsByCategory) {
        categories.items.forEach((category) => {
          dispatch(getPlayListsPage({ categoryId: category.id, limit: 5, offset: 0 }))
        })
      }
    } else {
      dispatch(getCategoryPage())
    }

  }, [categories, playListsByCategory, dispatch])

  return (
    <div className={styles.Home}>
      <div className={styles.HomeHeadlineImage} />
      {categoriesIsLoading && playListsByCategoryIsLoading
        ? <Spinner />
        : (categories && playListsByCategory && (
          <CategoryList
            categories={categories.items}
            playListsByCategories={playListsByCategory}
          />
        ))
      }
    </div>
  )
}

export default Home
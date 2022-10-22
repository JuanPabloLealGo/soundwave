import { useEffect } from "react"
import { useRef } from "react"

import { RootState, useAppDispatch, useAppSelector } from "../../redux-store"
import { getCategoryPage } from "../../redux-store/actions/categoryActions"
import { getPlaylistsPage } from "../../redux-store/actions/playlistActions"
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
    data: playlistsByCategory,
    isLoading: playlistsByCategoryIsLoading
  } = useAppSelector((state: RootState) => state.playlists)

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (categories) {
      if (!playlistsByCategory) {
        categories.items.forEach((category) => {
          dispatch(getPlaylistsPage({ categoryId: category.id, limit: 5, offset: 0 }))
        })
      }
    } else {
      dispatch(getCategoryPage())
    }

  }, [categories, playlistsByCategory, dispatch])

  return (
    <div className={styles.Home}>
      <div className={styles.HomeHeadlineImage} />
      {categoriesIsLoading && playlistsByCategoryIsLoading
        ? <Spinner />
        : (categories && playlistsByCategory && (
          <CategoryList
            categories={categories.items}
            playlistsByCategories={playlistsByCategory}
          />
        ))
      }
    </div>
  )
}

export default Home
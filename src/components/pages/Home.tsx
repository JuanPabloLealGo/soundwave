import { useEffect } from "react"
import { useRef } from "react"
import CategoryItemInterface from "../../interfaces/CategoryItemIterface"
import { RootState, useAppDispatch, useAppSelector } from "../../redux-store"
import { getCategoryPage } from "../../redux-store/actions/categoryActions"


const Home = () => {
  const dispatch = useAppDispatch()
  const didMountRef = useRef(true)
  const { isLoading, data } = useAppSelector((state: RootState) => state.category)

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    dispatch(getCategoryPage())
  }, [dispatch])

  return (
    <div>
      <h1>Home Page</h1>
      {isLoading
        ? (<h1>Loading...</h1>)
        : (data && (data?.categories.items.map((item: CategoryItemInterface) => {
          return (
            <div key={item.id}>
              {item.name}
            </div>
          )
        })))
      }
    </div>
  )
}

export default Home
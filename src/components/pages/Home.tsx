import { useEffect } from "react"
import { useRef } from "react"
import { AUTH_URL } from "../../environment/appEnvironment"
import CategoryItemInterface from "../../interfaces/CategoryItemIterface"
import { RootState, useAppDispatch, useAppSelector } from "../../redux-store"
import { getCategoryPage } from "../../redux-store/actions/categoryActions"


const Home = () => {
  const dispatch = useAppDispatch()
  const didMountRef = useRef(true)
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.data)

  const handleLoginClick = () => {
    window.location.replace(AUTH_URL)
  }

  useEffect(() => {

    if (didMountRef.current) {
      didMountRef.current = false
      return
    }

    if (isAuthenticated) {
      dispatch(getCategoryPage())
    }

  }, [isAuthenticated, dispatch])


  const { isLoading, data } = useAppSelector((state: RootState) => state.category)

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div>AUTHENTICATED VIEW</div>
          <div>
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              data && (data?.categories.items.map((item: CategoryItemInterface) => {
                return (
                  <div key={item.id}>{item.name}</div>
                )
              }))
            )
            }

          </div>
        </div>
      ) : (
        <button onClick={handleLoginClick}>
          Login with Spotify
        </button>
      )}
    </div>
  )
}

export default Home
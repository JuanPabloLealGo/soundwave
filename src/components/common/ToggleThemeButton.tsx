import { useAppDispatch } from "../../redux-store"
import { toogleTheme } from "../../redux-store/reducers/uiSlice"

const ToggleThemeButton = () => {
  const dispatch = useAppDispatch()


  const onToggleThemeHandler = () => {
    dispatch(toogleTheme())
  }

  return (
    <button onClick={onToggleThemeHandler}>
      Switch Theme
    </button>
  )
}

export default ToggleThemeButton


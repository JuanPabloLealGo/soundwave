import { useAppDispatch, useAppSelector } from "../../redux-store"
import { toogleTheme } from "../../redux-store/reducers/uiSlice"
import { uiSelector } from "../../redux-store/selectors"
import styles from "./ToggleThemeButton.module.scss"
import { WiMoonAltFirstQuarter } from "react-icons/wi"

interface Props {
  className?: Object
}

const ToggleThemeButton = ({ className }: Props) => {
  const dispatch = useAppDispatch()
  const { isDarkTheme } = useAppSelector(uiSelector)

  const onToggleThemeHandler = () => {
    dispatch(toogleTheme())
  }

  return (
    <button
      className={`toggle ${className} ${styles.ToggleThemeBtn} ${!isDarkTheme && styles.ToggleThemeBtnDisabled}`}
      onClick={onToggleThemeHandler}
    >
      <p>{isDarkTheme ? 'Turn off Dark Theme' : 'Turn on Dark Theme'}</p>
      <WiMoonAltFirstQuarter className={styles.ToggleThemeBtnIcon} />
    </button>
  )
}

export default ToggleThemeButton


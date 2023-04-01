import CategoryList from "../../components/CategoryList"
import Player from "../../components/Player"

import styles from './HomePage.module.scss'

const HomePage = () => {
  return (
    <>
      <div className={styles.HomeDragZone}>
        <Player isDraggable />
      </div>
      <div className={`grid`}>
        <CategoryList />
      </div>
    </>
  )
}

export default HomePage
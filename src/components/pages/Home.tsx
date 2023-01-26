import CategoryList from "../CategoryList"
import Player from "../common/Player"

import styles from './Home.module.scss'

const Home = () => {
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

export default Home
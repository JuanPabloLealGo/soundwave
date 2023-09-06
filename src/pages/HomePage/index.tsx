import CategoryList from "../../components/CategoryList"
import Player from "../../components/Player"

import styles from './HomePage.module.scss'

const HomePage = () => {
  return (
    <>
      {/*
      <div className={styles.HomeDragZone}>
        <Player isDraggable isLoading />
      </div>
      */}
      <section className={`grid`}>
        <h1>Explore</h1>
        <CategoryList />
      </section>
    </>
  )
}

export default HomePage
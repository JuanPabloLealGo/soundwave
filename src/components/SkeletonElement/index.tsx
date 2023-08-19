import { PaginationEnum } from "../../enums/PaginationEnum"
import { SkeletonTypes } from "../../enums/SkeletonTypes"
import { convertToRange } from "../../utils"

import styles from './SkeletonElement.module.scss'

interface Props {
  type: SkeletonTypes
}

const SkeletonElement = ({ type }: Props) => {

  if (type === SkeletonTypes.CategoryList) {
    return <CategoryListSkeleton />
  }

  if (type === SkeletonTypes.CategoryItem) {
    return <CategoryItemSkeleton />
  }

  if (type === SkeletonTypes.PlaylistCards) {
    return <PlaylistCardsSkeleton />;
  }

  return <p>Skeleton Element</p>
}

const CategoryListSkeleton = () => {
  return (
    <>
      {convertToRange(PaginationEnum.commonLimit).map((item) => {
        return (
          <section key={item} className={styles.CategoryListSkeleton}>
            <header className={`skeleton ${styles.CategoryListSkeletonTitle}`} />
            <CategoryItemSkeleton />
          </section>
        )
      })}
    </>
  )
}

const CategoryItemSkeleton = () => {
  return (
    <div className={styles.CategoryItemSkeleton}>
      <PlaylistCardsSkeleton />
    </div>
  )
}


const PlaylistCardsSkeleton = () => {
  return (
    <>
      {convertToRange(PaginationEnum.playlistsLimit).map((item) => {
        return PlaylistCardSkeleton(item)
      })}
    </>
  )
}

const PlaylistCardSkeleton = (item: number) => {
  return (<article key={`playlist-${item}`} className={`skeleton ${styles.PlaylistCardsSkeleton}`}>
    <div className={styles.PlaylistCardsSkeletonBlurredContainer}>
      <div className={`skeleton ${styles.PlaylistCardsSkeletonName}`} />
      <div className={`skeleton ${styles.PlaylistCardsSkeletonTracks}`} />
    </div>
  </article>)
}

export default SkeletonElement
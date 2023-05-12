import { FaStar } from "react-icons/fa"

import styles from "./PopularityStars.module.scss"

interface Props {
  value: number
}

const PopularityStars = ({ value }: Props) => {

  const buildStars = () => {
    const stars = []

    for (let i = 1; i <= 5; i++) {
      const starValue = i * 20
      const isFilled = starValue <= value
      const starClassName = isFilled ? styles.FilledStar : styles.EmptyStar

      stars.push(
        <FaStar
          key={i}
          className={`${styles.PopularStarsItem} ${starClassName}`}
        />
      )
    }

    return stars
  }

  return <div className={styles.PopularityStars}>{buildStars()}</div>
}

export default PopularityStars
import Button, { ButtonType } from '../../components/Button'
import styles from './StyleGuidePage.module.scss'

const Colors = () => {
  const colors = [
    '$white',
    '$black',
    '$primary',
  ]

  return (
    <div className={styles.StyleGuideColors}>
      {colors.map((item, index) => {
        const colorClassName = `${styles[`StyleGuideColor${index}`]} ${styles.StyleGuideColor}`
        return (
          <span
            key={index}
            className={colorClassName}
          >
            {item}
          </span>
        )
      })}
    </div>
  )
}

const Tipography = () => {
  return (
    <div className={`${styles.StyleGuideTipography} subgrid`}>
      <p className={styles.StyleGuideTipographyTitle}>Poppins - Sans Serif</p>
      <h1 className={styles.StyleGuideTipographyItem}>Headline 1</h1>
      <h2 className={styles.StyleGuideTipographyItem}>Headline 2</h2>
      <h3 className={styles.StyleGuideTipographyItem}>Headline 3</h3>
      <h4 className={styles.StyleGuideTipographyItem}>Headline 4</h4>
      <h5 className={styles.StyleGuideTipographyItem}>Headline 5</h5>
      <p className={styles.StyleGuideTipographyItem}>Body</p>
    </div>
  )
}

const Grid = () => {
  const columns = Array.from(Array(12).keys());

  return (
    <div className={`${styles.StyleGuideGrid} subgrid`}>
      {columns.map((item, index) => {
        return (
          <span key={index} className={styles.StyleGuideGridColumn}>
            {item + 1}
          </span>
        )
      })}
    </div>
  )
}

const Buttons = () => {
  return (
    <div className={styles.StyleGuideButtons} >
      <Button className={styles.StyleGuideButtonsItem} type={ButtonType.Filled} label='Filled' />
      <Button className={styles.StyleGuideButtonsItem} type={ButtonType.Outlined} label='Outlined' />
      <Button className={styles.StyleGuideButtonsItem} type={ButtonType.Text} label='Text' />
    </div>
  )
}

const StyleGuidePage = () => {
  const content = [
    {
      "title": "Colors",
      "component": <Colors />
    },
    {
      "title": "Typography",
      "component": <Tipography />
    },
    {
      "title": "Grid",
      "component": <Grid />
    },
    {
      "title": "Buttons",
      "component": <Buttons />
    }
  ]

  const Sections = content.map((item, index) => {
    return (
      <section key={index} className={styles.StyleGuideSection}>
        <div className={styles.StyleGuideMasthead}>
          <h1>{item.title}</h1>
        </div>
        <div className={styles.StyleGuideWrapper}>
          {item.component}
        </div>
      </section>
    )
  })

  return (
    <div className='grid'>
      {Sections}
    </div>
  )
}

export default StyleGuidePage
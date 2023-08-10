import Button, { ButtonType } from '../../components/Button'
import ToggleThemeButton from '../../components/ToggleThemeButton'
import styles from './StyleGuidePage.module.scss'

const Colors = () => {
  const colors = [
    '$white',
    '$black',
    '$primary',
    '$secondary',
    '$tertiary'
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
  const title = 'Ejemplo de título'

  return (
    <div className={`${styles.StyleGuideTipography} subgrid`}>
      <h3 className={styles.StyleGuideTipographyTitle}>Main Tipography: Montserrat Sans Serif</h3>
      <h4 className={styles.StyleGuideTipographyTitle}>Secondary Tipography: Comfortaa Cursive</h4>
      <h1 className={styles.StyleGuideTipographyHeading}>{`${title} h1`}</h1>
      <h1 className={`${styles.StyleGuideTipographyHeading} h1--primary`}>{`${title} h1 primary`}</h1>
      <h2 className={styles.StyleGuideTipographyHeading}>{`${title} h2`}</h2>
      <h3 className={styles.StyleGuideTipographyHeading}>{`${title} h3`}</h3>
      <h4 className={styles.StyleGuideTipographyHeading}>{`${title} h4`}</h4>
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
    <>
      <Button className={`${styles.StyleGuideButton}`} type={ButtonType.Filled} label='Primary!' />
      <Button className={`${styles.StyleGuideButton}`} type={ButtonType.Filled} label='Secondary' />
    </>
  )
}

const StyleGuidePage = () => {
  const content = [
    {
      "title": "Theme Toggle",
      "subtitle": "Our project includes a button to switch the theme mode",
      "component": <ToggleThemeButton />
    },
    {
      "title": "Colors",
      "subtitle": "This is the color palette we use in our project",
      "component": <Colors />
    },
    {
      "title": "Tipography",
      "subtitle": "We use the following tipography",
      "component": <Tipography />
    },
    {
      "title": "Grid",
      "subtitle": "This project uses 4 columns for mobile devices and 12 columns for tabled and desktop",
      "component": <Grid />
    },
    {
      "title": "Buttons",
      "subtitle": "Buttons styles available in this project",
      "component": <Buttons />
    }
  ]

  const Sections = content.map((item, index) => {
    return (
      <section key={index} className={styles.StyleGuideSection}>
        <div className={styles.StyleGuideMasthead}>
          <h2>{item.title}</h2>
          <p className={styles.StyleGuideSectionSubtitle}>{item.subtitle}</p>
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
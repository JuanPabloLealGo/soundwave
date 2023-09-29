import CategoryList from "../../components/CategoryList"

const HomePage = () => {
  return (
    <>
      <section className={`grid`}>
        <h1>Explore</h1>
        <CategoryList />
      </section>
    </>
  )
}

export default HomePage
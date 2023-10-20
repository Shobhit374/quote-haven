import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        {/*Home Page Titles*/}
        <h1 className="head_text text-center">
            Explore and Share
            <br />
            <span className="orange_gradient text-center">
                Powerful Quotes
            </span>
        </h1>
        {/*Home page description*/}
        <p className="desc text-center">
        Quotehaven is a community to showcase your quotes and write-ups to people all over the world
        </p>

        <Feed />
    </section>
  )
}

export default Home

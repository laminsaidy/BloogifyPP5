import useFetch from "./useFetch";
import BlogList from "./BlogList";

const Home = () => {
  // Use the custom hook to fetch blogs from the local JSON server
  const { data: blogs, isPending, error } = useFetch("http://localhost:8000/blogposts?format=json");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
import useFetch from "./useFetch";
import BlogList from "./BlogList";

const Home = () => {
  // Use the custom hook to fetch blogs
  const { data: blogs, isPending, error, deleteBlog } = useFetch("https://api.example.com/blogs");

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} handleDelete={deleteBlog} />}
    </div>
  );
};

export default Home;
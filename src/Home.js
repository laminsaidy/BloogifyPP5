import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setBlogs([
        { title: "My new travel blogs!", body: "lorem ipsum...", author: "Alex", id: 1 },
        { title: "Importance of taking a daily shower!", body: "lorem ipsum...", author: "Tijan", id: 2 },
        { title: "Tips on how to get shredded!", body: "lorem ipsum...", author: "Isha", id: 3 },
      ]);
      setIsLoading(false);
    }, 2000); // Simulated delay
  }, []);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  return (
    <div className="home">
      {isLoading ? (
        <div>Loading blogs...</div>
      ) : (
        <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
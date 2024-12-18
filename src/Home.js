import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      // Simulate a successful response from the backend
      const simulatedBlogs = [
        { title: "My new travel blogs!", body: "lorem ipsum...", author: "Alex", id: 1 },
        { title: "Importance of taking a daily shower!", body: "lorem ipsum...", author: "Tijan", id: 2 },
        { title: "Tips on how to get shredded!", body: "lorem ipsum...", author: "Isha", id: 3 },
      ];
      setIsPending(false);
      setBlogs(simulatedBlogs);  // Simulated data
      setError(null);
    }, 1000); // Simulated delay
  }, []);  

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);  // Filter out the blog to delete
    setBlogs(newBlogs);  // Update the state with the new list of blogs
  };

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} handleDelete={handleDelete} />}
    </div>
  );
};

export default Home;
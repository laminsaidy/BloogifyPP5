import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate an API call
        setTimeout(() => {
          const simulatedBlogs = [
            { title: "My new travel blogs!", body: "lorem ipsum...", author: "Alex", id: 1 },
            { title: "Importance of taking a daily shower!", body: "lorem ipsum...", author: "Tijan", id: 2 },
            { title: "Tips on how to get shredded!", body: "lorem ipsum...", author: "Isha", id: 3 },
          ];
          setIsPending(false);
          setData(simulatedBlogs);
          setError(null);
        }, 1000); // Simulated delay
      } catch (error) {
        setError(error.message);
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  // Function to delete a blog by id
  const deleteBlog = (id) => {
    const newBlogs = data.filter((blog) => blog.id !== id);  // Filter out the blog to delete
    setData(newBlogs);  // Update the state with the new list of blogs
  };

  return { data, isPending, error, deleteBlog };
};

export default useFetch;
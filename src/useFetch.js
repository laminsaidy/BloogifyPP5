import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // AbortController instance

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`Could not fetch the data, status: ${response.status}`);
        }

        const data = await response.json(); // Parse the response data as JSON
        setIsPending(false);
        setData(data);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch operation canceled");
        } else {
          setError(err.message);
          setIsPending(false);
        }
      }
    };

    fetchData();

    // Cleanup function to cancel the fetch if the component unmounts
    return () => controller.abort();
  }, [url]);

  // Function to delete a blog by id (if needed later)
  const deleteBlog = (id) => {
    const newBlogs = data.filter((blog) => blog.id !== id); // Filter out the blog to delete
    setData(newBlogs); // Update the state with the new list of blogs
  };

  return { data, isPending, error, deleteBlog };
};

export default useFetch;
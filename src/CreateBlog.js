import { useState } from "react";
import { useHistory } from "react-router-dom";

const BlogForm = () => {
  // State variable to store the title of the blog, initialized as an empty string.
  const [title, setTitle] = useState("");

  // Store the body/content of the blog, initialized as an empty string.
  const [body, setBody] = useState("");

  // State variable to store the entered author for the blog post.
  const [author, setAuthor] = useState("");

  // Tracking the loading status of the form submission.
  const [isLoading, setIsLoading] = useState(false);

  // Store a success message after the blog is successfully submitted.
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize useHistory to programmatically navigate the user.
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setSuccessMessage(""); // Clear any previous success message

    const blog = { title, content:body, author: null}; // Default to "Anonymous" if no author entered

    fetch("http://localhost:8000/blogposts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log("New blog added");
        setTimeout(() => {
          setIsLoading(false); // Stop loading after delay
          setSuccessMessage("Blog submission successful! 🎉");

          // Redirect the user to the home page after a short delay
          setTimeout(() => {
            history.push("/"); // Navigate to the home page
          }, 1000); // 1-second delay to display the success message
        }, 1500); // 1.5 seconds delay
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
        setIsLoading(false); // Stop loading in case of an error
      });
  };

  return (
    <div className="blog-form">
      <h2>Create a Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter blog title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            placeholder="Write your blog content"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} // Allow users to enter a name
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Blog"}
          </button>
        </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default BlogForm;
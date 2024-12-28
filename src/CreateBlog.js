import { useState } from "react";

const BlogForm = () => {

  // State variable to store the title of the blog, initialized as an empty string.
  const [title, setTitle] = useState("");

  // Store the body/content of the blog, initialized as an empty string.
  const [body, setBody] = useState("");

  // State variable to store the selected author for the blog post.
  const [author, setAuthor] = useState("mario");

  // Tracking the loading status of the form submission.
  const [isLoading, setIsLoading] = useState(false);

  // Store a success message after the blog is successfully submitted.
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setSuccessMessage(""); // Clear any previous success message

    const blog = { title, body, author };

    fetch("http://localhost:5000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log("New blog added");
        setTimeout(() => {
          setIsLoading(false); // Stop loading after delay
          setSuccessMessage("Blog submission successful! 🎉");
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
          <select
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="mario">Vivek</option>
            <option value="yoshi">Eylon</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Blog"}
          </button>
        </div>
      </form>
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
    </div>
  );
};

export default BlogForm;
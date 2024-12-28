import { useState } from "react";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    console.log(blog);
  }

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
          <button type="submit">Submit Blog</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;

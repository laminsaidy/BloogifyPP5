import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return <p>No blogs available.</p>; // Handle empty or undefined blogs
  }

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}> {/* Updated URL */}
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
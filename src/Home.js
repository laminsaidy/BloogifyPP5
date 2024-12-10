import { useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My new travel blogs! ', body: 'lorem ipsum...', author: 'Alex', id: 1 },
    { title: 'Importance of taking a daily shower!', body: 'lorem ipsum...', author: 'Tijan', id: 2 },
    { title: 'Tips on how to get schredded!', body: 'lorem ipsum...', author: 'Isha', id: 3 }
  ])

  return (
    <div className="home">
      {blogs.map(blog => (
        <div className="blog-preview" key={blog.id} >
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
        </div>
      ))}
    </div>
  );
}
 
export default Home;
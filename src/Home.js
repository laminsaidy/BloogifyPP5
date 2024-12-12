import { useEffect, useState } from "react";
import BlogList from "./BlogList";


const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My new travel blogs! ', body: 'lorem ipsum...', author: 'Alex', id: 1 },
    { title: 'Importance of taking a daily shower!', body: 'lorem ipsum...', author: 'Tijan', id: 2 },
    { title: 'Tips on how to get schredded!', body: 'lorem ipsum...', author: 'Isha', id: 3 }
  ])

  const [name, setName] = useState('Alex');

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  }

  useEffect(() => {
    console.log('use effect ran');
    console.log(name);
  }, [name])

  return (
    <div className="home">
      <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete} />
      <button onClick={() => setName('lara')}>change name</button>
    </div>
  );
}
 
export default Home;
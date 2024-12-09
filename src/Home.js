const Home = () => {

  const handleClick = (e) => {
    console.log('hello bloggers!', e);
  }

  const handleClickAgain = (name, e) => {
    console.log('hello ' + name, e.target);
  }

  return (
    <div className="home">
      <h2>Homepage</h2>
      <button onClick={handleClick}>Click here</button>
      <button onClick={(e) => handleClickAgain('Alex', e)}>Click here again</button>
    </div>
  );
}

export default Home;
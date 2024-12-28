import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>Page cannot be found</p>
      <Link to="/">Go back to the homepage...</Link>
    </div>
  );
}
 
export default PageNotFound;
import { Link } from 'react-router-dom'

const Home = (props) => {
  return (
    <>
      <h1>home page</h1>
      <h3>Jello! How are you?</h3>
      <Link to="/boards" >Boards</Link>
      <ul>
      {props.authorised ? <li><Link to="/logout">Logout</Link></li> : <li><Link to="/login">Login</Link></li>}
      </ul>
    </>
  )
}

export default Home

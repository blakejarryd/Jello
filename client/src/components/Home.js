import { Link } from 'react-router-dom'

const Home = (props) => {
  return (
    <ul>
      {props.authorised ? <li><Link to="/logout">Logout</Link></li> : <li><Link to="/login">Login</Link></li>}
    </ul>
  )
}

export default Home

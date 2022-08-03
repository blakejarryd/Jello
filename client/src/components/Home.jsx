import { Link } from 'react-router-dom'

const Home = ({authorised}) => {
  return (
    <>
      <div className="container home">
        <h1>Jello - helps teams get a wriggle on</h1>
        <div>
          <h4>Team struggling to gel? Wobbling on how to manage their projects? Solidify your team’s plans. Let Jello help crystallise all of your ideas in one place.</h4>
          {authorised ? <h4>Sign up - it's free</h4> : <h4>Get a Wriggle On</h4>}
          
        </div>
      </div>
    </>
  )
}

export default Home

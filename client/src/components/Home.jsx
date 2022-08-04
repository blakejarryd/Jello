import { Link } from 'react-router-dom'

const Home = ({authorised}) => {
  return (
    <>
      <div className="container home">
        <h1>Jello ~</h1>
        <h2>Helps teams get a jiggle on</h2>
        <div>
          <h4>Team struggling to gel? Wobbling on how to manage their projects? Solidify your team’s plans. Let Jello help crystallise all of your ideas in one place.</h4>
          {!authorised ? <h4><a href="#">Sign up - it's free</a></h4> : <h4><a href="#">Get a Jiggle On</a></h4>}
        </div>
      </div>
    </>
  )
}

export default Home

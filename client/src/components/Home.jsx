import { Link } from 'react-router-dom';

const Home = ({ authorised }) => {
  return (
    <>
      <div className="container home">
        <h1>Jello ~</h1>
        <h2>Helps teams get a jiggle on</h2>
        <div>
          <h4>
            Team struggling to gel? Wobbling on how to manage their projects?
            Solidify your team’s plans. Let Jello help crystallise all of your
            ideas in one place.
          </h4>
          {!authorised ? (
            <Link to="/register" className="link-text">
              <h4>Sign up - it's free</h4>
            </Link>
          ) : (
            <Link to="/boards" className="link-text">
              <h4>Get a Jiggle On</h4>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

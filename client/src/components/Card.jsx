import { Link } from 'react-router-dom'

const Card = ({ card }) => {
  return (
    <Link to={`/${card._id}`} >
      <div className = 'card'>
        <h5>{card.title}</h5>    
      </div>
    </Link>
  )
}
export default Card


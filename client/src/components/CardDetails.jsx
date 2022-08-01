import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const CardDetail = () => {
  const [card, setCard] = useState(null)
  const { id } = useParams()

  const getCard = async (id) => {
    const url = `http://localhost:3000/cards/${id}`
    const res = await fetch(url)
    const cardData = await res.json()
    setCard(cardData)
  }

  useEffect(() => {
    getCard(id)
  }, [])

return (
  card && (
    <div>
      <h1>{card.title}</h1>
      <h4>Descrition</h4>
      <p>{card.description}</p>
      <Link to={'./edit'}>
        <button>Edit</button>
      </Link>
      <Link to='/'>
        <button>Cancel</button>
      </Link>
    </div>
    )
  )
}

export default CardDetail
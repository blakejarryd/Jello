import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

//Component that displays read only card details - based on card param in URL
const CardDetailDisplay = ({ card, handleDelete, switchEdit }) => {
  return (
    <div>
      <h1>{card.title}</h1>
      <h4>Description</h4>
      <p>{card.description}</p>
      <button onClick={switchEdit}>Edit</button>
      <Link to={'/'}>
        <button onClick={() => handleDelete(card._id)}>Delete</button>
      </Link>
      <Link to='/'>
        <button>Cancel</button>
      </Link>
    </div>
  )
}

//Edit form for card
const CardDetailEdit = ({ card, handleEdit, switchEdit }) => {
  const initialState = {
    title: card.title,
    description: card.description
  }
  const [updatedCard, setUpdatedCard] = useState(initialState)
  const handleChange = (event) => {
    let newUpdate = {
      ...updatedCard, 
      [event.target.name]: event.target.value
    }
    setUpdatedCard(newUpdate)
  }
  const submit = (event) => {
    event.preventDefault()
    handleEdit(updatedCard, card._id)
    switchEdit()
  }
  return (
    <div>
      <form onSubmit={submit}>
        <input type="text" name="title" value={updatedCard.title} onChange={handleChange}/>
        <input type="text" name="description" value={updatedCard.description} onChange={handleChange}/>
        <input type="submit" value="Save" />
      </form>
        <button onClick={switchEdit} >Cancel</button>
    </div>
  )
}

const CardDetail = ({ handleDelete, handleEdit }) => {
  const [card, setCard] = useState(null)
  const [editing, setEditing] = useState(false)
  const { id } = useParams()

  const switchEdit = () => {
    setEditing(!editing)
  }

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
  <>
    {card && !editing && < CardDetailDisplay card={card} handleDelete={handleDelete} switchEdit={switchEdit} />}
    {card && editing && < CardDetailEdit card={card} handleEdit={handleEdit} switchEdit={switchEdit} />}
  </>
  )
}

export default CardDetail
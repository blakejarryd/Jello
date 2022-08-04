import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button';

//Component that displays read only card details - based on card param in URL
const CardDetailDisplay = ({ card, handleDelete, switchEdit, board }) => {

  return (
    <div>
      <h1>{card.title}</h1>
      <h5>Description</h5>
      <p>{card.description}</p>
      <p>Status: {card.status}</p>
      <Button variant="light" size="sm" onClick={switchEdit}>Edit</Button>
      <Link to={'/boards'}>
        <Button variant="light" size="sm"  onClick={() => handleDelete(card._id)}>Delete</Button>
      </Link>
      <Link to={`/boards/${board._id}`}>
        <Button variant="light" size="sm"> Cancel</Button>
      </Link>
    </div>
  )
}

//Edit form for card
const CardDetailEdit = ({ card, submitEdit, switchEdit }) => {
  const initialState = {
    title: card.title,
    description: card.description,
    status: card.status
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
    submitEdit(updatedCard)
  }
 
  return (
    <div>
      <form onSubmit={submit}>
        <div class="form-group">
          <label for="title">Title</label>
          <input class="form-control" type="text" name="title" value={updatedCard.title} onChange={handleChange}/>
        </div>
        <div class="input-group">
          <label for="description">Description</label>
          <textarea class="form-control" name="description" value={updatedCard.description} onChange={handleChange}/>
        </div>
        {/* TODO: Update this to use the board specific columns */}
        <div class="form-group">
          <label for="Status">Status</label>
          <br/>
          <select class="form-control" name="status" onChange={handleChange}>
            <option selected>{updatedCard.status}</option>
            <option value="To Do">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <Button type="submit" size="sm">Save</Button>
        <Button variant="light" size="sm" onClick={switchEdit}>Cancel</Button>
      </form>
    </div>
  )
}

const CardDetail = ({ handleDelete, handleEdit, board }) => {
  const [card, setCard] = useState(null)
  const [editing, setEditing] = useState(false)
  const { id } = useParams()

  const switchEdit = () => {
    setEditing(!editing)
  }

  const submitEdit = (updatedCard) => {
    handleEdit(updatedCard, card._id)
    setCard(updatedCard)
    switchEdit()
  }

  const getCard = async (id) => {
    const url = `/cards/${id}`
    const res = await fetch(url)
    const cardData = await res.json()
    setCard(cardData)
  }

  useEffect(() => {
    getCard(id)
  }, [])

return (
  <>
    {card && !editing && < CardDetailDisplay card={card} handleDelete={handleDelete} switchEdit={switchEdit} board={board} />}
    {card && editing && < CardDetailEdit card={card} submitEdit={submitEdit} switchEdit={switchEdit} />}
  </>
  )
}

export default CardDetail
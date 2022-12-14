import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

//Component that displays read only card details - based on card param in URL
const CardDetailDisplay = ({ card, handleDelete, switchEdit, board }) => {
  

  return (
    <Container>
      <div className = 'cardDetail'>
        <h1>{card.title}</h1>
        <p>Description:</p>
        <p className='description'>{card.description}</p>
        <p>Status: {card.status}</p>
        <Button className = "editFormBtn" variant="light" size="sm" onClick={switchEdit}>Edit</Button>
        <Link to={`/boards/${board._id}`}>
          <Button className = "editFormBtn" variant="light" size="sm"  onClick={() => handleDelete(card._id)}>Delete</Button>
        </Link>
        <Link to={`/boards/${board._id}`}>
          <Button className = "editFormBtn" variant="light" size="sm"> Cancel</Button>
        </Link>
      </div>
    </Container>
  )
}

//Edit form for card
const CardDetailEdit = ({ card, submitEdit, switchEdit, board }) => {
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

  const dropDownValues = board.columns.map((col) => {
    if (col === updatedCard.status) {
      return <option selected>{col}</option>} 
    else {
      return <option value={col}>{col}</option>
    }
  })



 
  return (
    <Container>
      <div className = 'cardDetail'>
        <form onSubmit={submit}>
          <label for="title">Title</label>
          <input class="form-control" type="text" name="title" value={updatedCard.title} onChange={handleChange}/>
          <label for="description">Description</label>
          <textarea class="form-control" name="description" value={updatedCard.description} onChange={handleChange}/>
          {/* TODO: Update this to use the board specific columns */}
          <label for="Status">Status</label>
          <select class="form-control" name="status" onChange={handleChange}>
            {dropDownValues}
          </select>
          <Button className = "editFormBtn" type="submit" variant="light" size="sm">Save</Button>
          <Button className = "editFormBtn" variant="light" size="sm" onClick={switchEdit}>Cancel</Button>
        </form>
      </div>
    </Container>
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
    {card && editing && < CardDetailEdit card={card} submitEdit={submitEdit} switchEdit={switchEdit} board={board} />}
  </>
  )
}

export default CardDetail
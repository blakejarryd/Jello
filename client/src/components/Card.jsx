import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';


const CardEdit = ({ card, handleEdit, switchEdit }) => {
  const [cardName, setCardName] = useState(card.title)
  const handleChange = (event) => {
    setCardName(event.target.value)
  }
  const submit = (event) => {
    event.preventDefault()
    handleEdit(cardName, card._id)
    console.log(cardName)
    switchEdit()
  }
  return (
  <div className='card'>
    <form onSubmit={submit}>
      <input type="text" name="title" value={cardName} onChange={handleChange}/>
      <input type="submit" value="Save" />
    </form>
  </div>
  )
}
const CardDisplay = ({ card, edit }) => {
  return (
  <div className='card'>
    <Link to={`/${card._id}`} >
        <h5>{card.title}</h5>   
    </Link>
    <Button variant="light" size="sm" onClick={edit}>Edit</Button> 
  </div>
  )
}

const Card = ({ card, handleEdit }) => {
  const [editing, setEditing] = useState(false)
  const switchEdit = () => {
    setEditing(!editing)
  }
  return (
    <div>
      {!editing && <CardDisplay card={card} edit={switchEdit}/>}
      {editing && <CardEdit card={card} handleEdit={handleEdit} switchEdit={switchEdit}/>}
    </div>
  )
}
export default Card


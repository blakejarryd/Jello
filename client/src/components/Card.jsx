import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'


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
      <Button type="submit" variant="light" size="sm" className="edit-button">
      <i className="bi bi-save" style={{ fontSize: 15 }}></i>
      </Button>
    </form>
  </div>
  )
}
const CardDisplay = ({ card, edit }) => {
  return (
  <div className='card'>
    <div className="card-name">
      <Link to={`/${card._id}`} >
          <h5>{card.title}</h5>   
      </Link>
    </div>
    <div>
      <Button variant="light" size="sm" onClick={edit} className="edit-button">
        <i className="bi bi-pen" style={{ fontSize: 15 }}></i>
      </Button> 
    </div>
  </div>
  )
}

const Card = ({ card, handleEdit }) => {
  const [editing, setEditing] = useState(false)
  const switchEdit = () => {
    setEditing(!editing)
  }
  const [{isDragging}, drag] = useDrag(() => ({
    type: "card",
    item: {id: card._id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      {!editing && <CardDisplay card={card} edit={switchEdit}/>}
      {editing && <CardEdit card={card} handleEdit={handleEdit} switchEdit={switchEdit}/>}
    </div>
  )
}
export default Card


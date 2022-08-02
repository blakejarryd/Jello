import Card from './Card'
import { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


const CreateCard = ({ onFormSubmit, status }) => {
  const [taskName, setTaskName] = useState("")
  const handleChange = (event) => {
    setTaskName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    onFormSubmit(taskName, status)
    setTaskName("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <Button 
          as="input"
          variant="outline-dark"
          type="text"
          name="title"
          value={taskName}
          onChange={handleChange}
        />
      </label>
      <Button as="input" type="submit" variant="secondary" className="add-button" size="sm" value="+"/>
    </form>
  )
}

const Column = ({ cards, name, onFormSubmit, handleEdit, onDrop }) => {
  let columnsCards = []
  cards.map((card) => {
    if(card.status === name) {
      columnsCards.push(card)
    }
  })
  const cardsList = columnsCards.map((card) => {
    return <Card key={card._id} card={card} handleEdit={handleEdit}/>
  })

  const [{isOver}, drop] = useDrop (() => ({
    accept: "card",
    drop: (item) => changeColumn(item.id)
  }))

  const changeColumn = (cardID) => {
    onDrop(cardID, name)
  }
  return (
      <div ref={drop}>
        <h3>{name}</h3>
        {cardsList}
        <CreateCard onFormSubmit={onFormSubmit} status={name} />
      </div>
  )
}

export default Column
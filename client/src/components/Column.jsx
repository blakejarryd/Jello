import Card from './Card'
import { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container'


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
        <input 
          type="text"
          name="title"
          value={taskName}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="+"/>
    </form>
  )
}

const Column = ({ cards, name, onFormSubmit, handleEdit }) => {
  let columnsCards = []
  cards.map((card) => {
    if(card.status === name) {
      columnsCards.push(card)
    }
  })

  const cardsList = columnsCards.map((card) => {
    return <Card card={card} handleEdit={handleEdit}/>
  })

  return (
      <div>
        <h3>{name}</h3>
        {cardsList}
        <CreateCard onFormSubmit={onFormSubmit} status={name} />
      </div>
  )
}

export default Column
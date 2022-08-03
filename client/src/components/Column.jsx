import Card from './Card'
import { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
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
        <input 
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

const Column = ({ cards, name, onFormSubmit, handleEdit, onDrop, board, editBoard }) => {
  const [editing, setEditing] = useState(false)

  const switchEdit = () => {
    setEditing(!editing)
  }
  
  let columnsCards = []
  cards.map((card) => {
    if(card.status === name) {
      columnsCards.push(card)
    }
  })
  const [listOfCards, setListOfCards] = useState(columnsCards)

  const handleInsideDragEnd = (result) => {
    console.log(result)
    const items = Array.from(listOfCards)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    setListOfCards(items)
  }

  const cardsList = listOfCards.map((card, index) => {
    return <Card key={index} id={card._id} card={card} handleEdit={handleEdit} index={index}/>
  })

  const [{isOver}, drop] = useDrop (() => ({
    accept: "card",
    drop: (item) => changeColumn(item.id)
  }))

  const changeColumn = (cardID) => {
    onDrop(cardID, name)
  }

  const ColumnName = () => {
    return (
      <h3 className = "m-2 columntitle" onClick={switchEdit}>{name}</h3>
    )
  }

  const ColumnNameEdit = () => {
    const [columnName, setColumnName] = useState(name)

    const handleChange = (event) => {
      setColumnName(event.target.value)
    }
    const submit = (event) => {
      event.preventDefault()
      let columnsArray = [...board.columns]
      const replaceIndex = columnsArray.indexOf(name)
      columnsArray[replaceIndex] = columnName
      editBoard({
        ...board,
        columns: columnsArray
      })
      switchEdit()
    }
    return (
      <form onSubmit={submit} className="m-1 d-flex align-content-center">
        <input  className="fs-5" type="text" name="title" value={columnName} onChange={handleChange}/>
        <Button className="m-1"type="submit" variant="primary" size="sm">
         <i className="bi bi-arrow-return-right"></i>
        </Button>
      </form>
    )
  }

  return (
    <div ref={drop}>
      {!editing && <ColumnName key="BoardName"/> }
      {editing && <ColumnNameEdit key="BoardNameEdit"/> }
      <DragDropContext onDragEnd={handleInsideDragEnd}>
        <Droppable droppableId='cards'>
          {(provided) => (
            <div className="cards" {...provided.droppableProps} ref={provided.innerRef}>
              {cardsList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateCard onFormSubmit={onFormSubmit} status={name} />
    </div>
  )
}

export default Column
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
    onFormSubmit("new card", status)
    setTaskName("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <Button as="input" type="submit" variant="secondary" className="add-button new-card" size="sm" value="+"/>
    </form>
  )
}

const Column = ({ cards, name, onFormSubmit, handleEdit, board, editBoard, handleDragEnd, editCardsStatus, deleteColumn }) => {
  const [editing, setEditing] = useState(false)

  const switchEdit = () => {
    setEditing(!editing)
  }

  const onDragEnd = (result) => {
    handleDragEnd(result)
  }


  const cardsList = cards ? cards.map((card, index) => {
    return <Card key={index} id={card._id} card={card} handleEdit={handleEdit} index={index}/>
  }) : <Card />
 

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
      //check for existing column name
      const ogName = columnName
      let i = 1
      let newName = ogName
      while (board.columns.includes(newName)) {
        newName =  ogName + ' ' + i
        i++
      }
      columnsArray[replaceIndex] = newName
      editBoard({
        ...board,
        columns: columnsArray
      })
      switchEdit() 
      //update cards with new column ("status") name
      const cardsToUpdate = []
      cards.map((e) => {
        if (e.status === name) {
          cardsToUpdate.push(e._id)
        }
      })
      console.log(cardsToUpdate)
      editCardsStatus(cardsToUpdate, columnName)
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
    cards && 
    <div className="column">
      <div className="col-header">
      {!editing && <ColumnName key="BoardName"/> }
      {editing && <ColumnNameEdit key="BoardNameEdit"/> }
      <Button onClick={() => deleteColumn(name)} className='btn-sm trash' type="submit" variant="secondary">
      <i className="bi bi-trash"></i>
      </Button>
      </div>
      <Droppable droppableId={name}>
        {(provided) => (
          <div className="cards" {...provided.droppableProps} ref={provided.innerRef}>
            {cardsList}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <CreateCard onFormSubmit={onFormSubmit} status={name}/>
    </div>
  )
}

export default Column
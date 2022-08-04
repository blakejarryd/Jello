import { useState, useEffect } from 'react'
import React from 'react'
import Column from './Column'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { DragDropContext } from 'react-beautiful-dnd';



const Board = ({ board, setBoard, editBoard, editCardsStatus, createColumn, deleteColumn, updateBoardOrder }) => {
  const [cards, setCards] = useState(null)
  const [editing, setEditing] = useState(false)

  const switchEdit = () => {
    setEditing(!editing)
  }

  const getCards = async () => {
    const url = '/cards'
    const res = await fetch(url)
    const cardData = await res.json()
    let boardCards = cardData.filter((card) => board.cards.includes(card._id))
    let columns = {}
    for (let i=0; i < board.columns.length; i++) {
      columns[board.columns[i]] = []
      columns[board.columns[i]] = boardCards.filter((card) => board.columns[i]===card.status)
    }
    console.log(columns)
    setCards(columns)
  }

  const addNewCardToBoard = async (card, board) => {
    await fetch(`/boards/${board._id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({cards: [...board.cards, card._id]})
    })
  }

  const handleCreate = async (name, status) => {
    console.log(name)
    console.log(status)
    const res = await fetch('/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title:name, status:status })
    })
    const newCard = await res.json()
    setCards({
      ...cards,
      newCard
    })
    setBoard({
      ...board,
      cards: [...board.cards, newCard._id]
      })
    addNewCardToBoard(newCard, board)
  }
  const handleEdit = async (cardName, cardID) => {
    console.log(cardID)
    await fetch(`/cards/${cardID}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({title: cardName})
    })
    // This needs to be changed to a findByIDAndUpdate instead of fetching, cause its slow
    getCards()
  }
  const handleDrop = async (cardID, updatedColumn) => {
    console.log(cardID, updatedColumn)
    await fetch(`/cards/${cardID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: updatedColumn})
    })

    getCards()
  }
  const handleDragEnd = (result) => {
    console.log(result)
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index && result.destination.index === result.source.index) {
      return;
    }
    const start = result.source.droppableId
    const end = result.destination.droppableId
    console.log('this', start, end)
    if (start === end) {
      const items = Array.from(cards[start])
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)
      let newCards = cards
      newCards[start] = items
      console.log(newCards, 'newCards')
      setCards(newCards)
    } else {
      const oldItems = Array.from(cards[start])
      const [reorderedItem] = oldItems.splice(result.source.index, 1)
      const newItems = Array.from(cards[end])
      newItems.splice(result.destination.index, 0, reorderedItem)
      let newCards = cards
      newCards[start] = oldItems
      newCards[end] = newItems
      setCards(newCards)
      handleDrop(result.draggableId, result.destination.droppableId)
    }
    let allcards = []
    for (let stuff in cards) {
      for (let i=0; i < stuff.length; i++) {
        if (cards[stuff][i]) {
          allcards.push(cards[stuff][i]._id)
        }
      }
    }
    updateBoardOrder(allcards)

  }


  useEffect(() => {
    getCards()
  }, [board])

  const columnsList = board.columns.map((column) => {
    return (cards && 
      <Col><Column 
        key={column}
        name={column} 
        cards={cards[column]} 
        onFormSubmit={handleCreate} 
        handleEdit={handleEdit} 
        onDrop={handleDrop} 
        board={board} 
        editBoard={editBoard} 
        editCardsStatus={editCardsStatus} 
        handleDragEnd={handleDragEnd}
        deleteColumn={deleteColumn}
        /></Col>)
  })

  const BoardName = () => {
    return (
      <h1 className = "m-2 boardtitle" onClick={switchEdit}>{board.name}</h1>
    )
  }

  const BoardNameEdit = () => {
    const [boardName, setBoardName] = useState(board.name)

    const handleChange = (event) => {
      setBoardName(event.target.value)
    }
    const submit = (event) => {
      event.preventDefault()
      editBoard({
        ...board,
        name: boardName
      })
      switchEdit()
    }
    return (
      <form onSubmit={submit} className="m-3 d-flex align-content-center">
        <input className="p-1 fs-2"type="text" name="title" value={boardName} onChange={handleChange}/>
        <Button className="m-1"type="submit" variant="secondary" size="lg">
         <i className="bi bi-arrow-return-right"></i>
        </Button>
      </form>
    )
  }

  return (
    <Container className="horizontal-scroll">
      {!editing && <BoardName key="BoardName"/> }
       {editing && <BoardNameEdit key="BoardNameEdit"/> }
      <Row>
      <DragDropContext onDragEnd={handleDragEnd}>
        {columnsList}
        <Col>
          <Button className="new-column" onClick={createColumn}>New Column</Button>
        </Col>
      </DragDropContext>
      </Row>
    </Container>
  )
}

export default Board


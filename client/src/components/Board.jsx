import { useState, useEffect } from 'react'
import React from 'react'
import Column from './Column'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Board = ({ board, setBoard, editBoard, editCardsStatus }) => {
  const [cards, setCards] = useState(null)
  const [editing, setEditing] = useState(false)
 
  const switchEdit = () => {
    setEditing(!editing)
  }

  const getCards = async () => {
    const url = 'http://localhost:3000/cards'
    const res = await fetch(url)
    const cardData = await res.json()
    let boardCards = cardData.filter((card) => board.cards.includes(card._id))
    setCards(boardCards)
  }

  const addNewCardToBoard = async (card, board) => {
    await fetch(`http://localhost:3000/boards/${board._id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({cards: [...board.cards, card._id]})
    })
  }

  const handleCreate = async (name, status) => {
    const res = await fetch('http://localhost:3000/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title:name, status:status })
    })
    const newCard = await res.json()
    setCards([...cards, newCard])
    setBoard({
      ...board,
      cards: [...board.cards, newCard._id]
      })
    addNewCardToBoard(newCard, board)
  }
  const handleEdit = async (cardName, cardID) => {
    console.log(cardID)
    await fetch(`http://localhost:3000/cards/${cardID}`, {
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
    await fetch(`http://localhost:3000/cards/${cardID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: updatedColumn})
    })

    getCards()
  }

  useEffect(() => {
    getCards()
  }, [board])

  const columnsList = board.columns.map((column) => {
    return (cards && <Col><Column key={column}name={column} cards={cards} onFormSubmit={handleCreate} handleEdit={handleEdit} onDrop={handleDrop} board={board} editBoard={editBoard} editCardsStatus={editCardsStatus}/></Col>)
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
        <Button className="m-1"type="submit" variant="primary" size="lg">
         <i className="bi bi-arrow-return-right"></i>
        </Button>
      </form>
    )
  }

  return (
    <Container>
      {!editing && <BoardName key="BoardName"/> }
       {editing && <BoardNameEdit key="BoardNameEdit"/> }
      <Row>
        {columnsList}
      </Row>
    </Container>
  )
}

export default Board


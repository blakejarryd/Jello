import { useState, useEffect } from 'react'
import Column from './Column'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Board = ({ board }) => {
  const [cards, setCards] = useState(null)
  const [columns, setColumns] = useState(['To Do', 'Doing', 'Done'])

  const getCards = async () => {
    const url = 'http://localhost:3000/cards'
    const res = await fetch(url)
    const cardData = await res.json()
    let boardCards = cardData.filter((card) => board.cards.includes(card._id))
    console.log(boardCards)  
    setCards(boardCards)
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

  const columnsList = columns.map((column) => {
    return (cards && <Col><Column name={column} cards={cards} onFormSubmit={handleCreate} handleEdit={handleEdit} onDrop={handleDrop}/></Col>)
  })

  return (
    <Container>
      <h1>{board.name}</h1>
      <Row>
        {columnsList}
      </Row>
    </Container>
  )
}

export default Board

  // const columns = ['To Do', 'Doing', 'Done']
  // let cardColumns = {}

  // const populateColumns = () => {
  //   for (let i = 0; i < columns.length; i++) {
  //     let Columnlist = []
  //     cards.map((card) => {
  //       if(card.status === columns[i]) {
  //         Columnlist.push(card)
  //       }
  //     })
  //     cardColumns[columns[i]] = Columnlist
  //     console.log(cardColumns)
  //   }
  // }

  // const createColumns = () => {
  //   let columns = []
  //   for (let status in cardColumns) {
  //     columns.push(<Column cards={cardColumns[status]} />)
  //   }
  //   return columns
  // }

   // useEffect(() => {
  //   cards && populateColumns()
  //   col = createColumns()
  //   console.log(col)
  // }, [cards])


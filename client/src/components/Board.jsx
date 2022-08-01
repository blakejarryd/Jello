import { useState, useEffect } from 'react'

const Board = () => {
  const [cards, setCards] = useState(null)

  const getCards = async () => {
    const url = 'http://localhost:3000/cards'
    const res = await fetch(url)
    const cardData = await res.json()
    setCards(cardData)
  }

  useEffect(() => {
    getCards()
  }, [])

  return (
    <h1>Hi</h1>
  )
}

export default Board
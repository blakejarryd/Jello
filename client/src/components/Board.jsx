import { useState, useEffect } from 'react'
import Column from './Column'

const Board = () => {
  const [cards, setCards] = useState(null)
  const [columns, setColumns] = useState(['To Do', 'Doing', 'Done'])

  const getCards = async () => {
    const url = 'http://localhost:3000/cards'
    const res = await fetch(url)
    const cardData = await res.json()
    setCards(cardData)
  }

  useEffect(() => {
    getCards()
  }, [])

  const columnsList = columns.map((column) => {
    return <Column name={column} cards={cards} />
  })

  return (
    <div>
      {columnsList}
    </div>
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



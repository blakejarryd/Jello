import Card from './Card'
const createCard = () => {
  return (
    <h1></h1>
  )
}

const Column = ({ cards, name }) => {
  let columnsCards = []
  cards.map((card) => {
    if(card.status === name) {
      columnsCards.push(card)
    }
  })

  const cardsList = columnsCards.map((card) => {
    return <Card card={card} />
  })

  return (
    <div>
      <h3>{name}</h3>
      {cardsList}
    </div>
  )
}

export default Column
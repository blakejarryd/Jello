import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'


const BoardHome = ({ boards }) => {
  const boardCards = boards.map((board) => {
    return (
      <Link to={`/boards/${board._id}`} >
        <Card style={{ width: '18rem' }} className="boardCard">
        <Card.Body>
          <Card.Title>{board.name}</Card.Title>
          <Card.Text>
            Cards: {board.cards.length}
          </Card.Text>
        </Card.Body>
        </Card>   
       </Link>
    )
  })

  return (   
  <Container >
    <h1 className = "m-2 boardHomeTitle">Your Boards</h1>
    <div className = "boardHome" >
    {boardCards}
    </div>
  </Container>)


}

export default BoardHome
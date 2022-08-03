import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import Image from "react-bootstrap/Image"


const NavBar = ({ boards, setBoard, createBoard, authorised }) => {

  const boardDropdown = boards.map((board) => {
    return <NavDropdown.Item key={board.name} onClick={() => setBoard(board)}>{board.name}</NavDropdown.Item>
  })

  return (
    <Navbar className="colour-nav">
    <Container>
      <img className="nav-img" src="jello.png" />
      <Navbar.Brand as={Link} to="/" >Jello</Navbar.Brand>
      <Nav className="me-auto">
      
      <NavDropdown title="Boards" id="basic-nav-dropdown">
        {boardDropdown}
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => createBoard()}>Create New Board</NavDropdown.Item>
      </NavDropdown>

        {authorised ? <Nav.Link as={Link} to="/logout">Logout</Nav.Link> : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
      </Nav>
    </Container>
  </Navbar>
  )
}

export default NavBar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'


const NavBar = ({ boards, setBoard, createBoard }) => {

  const boardDropdown = boards.map((board) => {
    return <NavDropdown.Item onClick={() => setBoard(board)}>{board.name}</NavDropdown.Item>
  })

  return (
    <Navbar bg="primary" variant="dark">
    <Container>
      <Navbar.Brand as={Link} to="/" >Jello</Navbar.Brand>
      <Nav className="me-auto">
      <NavDropdown title="Boards" id="basic-nav-dropdown">
        {boardDropdown}
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => createBoard()}>New Board</NavDropdown.Item>
      </NavDropdown>
        <Nav.Link as={Link} to="/user">User</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default NavBar
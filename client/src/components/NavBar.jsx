import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from "react-bootstrap/Image"
import Logout from "./Logout"

const NavBar = ({ boards, setBoard, createBoard, authorised, handleLogout}) => {
  console.log(handleLogout, "annoying")
  let { boardID } = useParams()

  useEffect(() => {
    let selectedBoard = [...boards].filter((e) => e._id === boardID)
    setBoard(selectedBoard[0])
  }, [boardID])

  const boardDropdown = boards.map((board) => {
    let id = board._id
    return <NavDropdown.Item key={board.name} as={Link} to={"/boards/" + id}>{board.name}</NavDropdown.Item>
  })

  return (
    <Navbar className="colour-nav">
    <Container>
      <img className="nav-img" src="/jello.png" />
      <Navbar.Brand as={Link} to="/" >Jello</Navbar.Brand>
      <Nav className="me-auto">
      
      <NavDropdown title="Boards" id="basic-nav-dropdown">
        {boardDropdown}
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/boards" onClick={() => createBoard()}>Create New Board</NavDropdown.Item>
      </NavDropdown>

        {authorised ? <Logout handleLogout={handleLogout}/> : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
      </Nav>
    </Container>
  </Navbar>
  )
}

export default NavBar
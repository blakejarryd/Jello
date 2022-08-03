import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css';

import Home from "./components/Home"
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import Board from './components/Board'
import CardDetail from './components/CardDetails';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const [authorised, setAuthorised] = useState(null)
  const [boards, setBoards] = useState(null)
  const [board, setBoard] = useState('')

  const navigate = useNavigate()

  const handleAuth = (authed) => {
    setAuthorised(authed)
    navigate("/")
  }

  const handleLogout = () => {
    setAuthorised(false)
    navigate("/")
  }

  const getBoards = async () => {
    const url = '/boards'
    const res = await fetch(url)
    const boardData = await res.json()
    setBoards(boardData)
  }

  const deleteCardFromBoard = async (cardID, board) => {
    const boardCards = [...board.cards]
    const updatedCards = boardCards.pop(cardID)
    console.log(boardCards)
    console.log(updatedCards)
    await fetch(`/boards/${board._id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({cards: boardCards})
    })
  }

  const handleDelete = async (id) => {
    console.log(id)
    const url = `/cards/${id}`
    await fetch(url, {
      method: 'DELETE'
    })
    deleteCardFromBoard(id, board)
  }

  const handleEdit = async (updatedCard, cardID) => {
    await fetch(`/cards/${cardID}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(updatedCard)
    })
  }

  const createBoard = async () => {
    const res = await fetch('/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: "New Board"})
    })
    const newBoard = await res.json()
    setBoard(newBoard)
    setBoards([...boards, newBoard])
  }

  const editBoard = async (board) => {
    console.log(board)
    const res = await fetch(`/boards/${board._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(board)
    })
    const updatedBoard = await res.json()
    setBoard(updatedBoard)
    let updatedboards = [...boards] 
    const updateIndex = updatedboards.findIndex((e) => e._id === updatedBoard._id)
    updatedboards[updateIndex] = updatedBoard
    setBoards(updatedboards)
  }

  const editCardsStatus = async (cardsToUpdate, status) => {
    const body = {
      cards: cardsToUpdate,
      status: status
    }
    const res = await fetch(`/cards`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const updatedCards = await res.json()
    console.log(updatedCards)
  }

  const createColumn = () => {
    const updatedBoard = {
      ...board,
      columns: [...board.columns, "New Column"]
    }
    editBoard(updatedBoard)
  }


  const deleteColumn = (columnName) => {
    console.log(columnName)
    let columns = [...board.columns]
    let updatedColumns = columns.filter((e) => e != columnName)
    const updatedBoard = {
      ...board,
      columns: updatedColumns
    }
    editBoard(updatedBoard)
  }

  // code for protected route
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch("/users/isauthorised")
      const data = await res.json()
      console.log(data.msg)
      setAuthorised(data.authorised)
    }
    checkIfLoggedIn()
  }, [])

  useEffect(() => {
    getBoards()
  }, [])



  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={
          <>
            {boards && <NavBar boards={boards} setBoard={setBoard} createBoard={createBoard} authorised={authorised} /> }        
            <Home />
            <Register handleRegister={handleAuth} />
          </>
        }/>

        <Route path="/login" element={<Login handleLogin={handleAuth} />} />
        <Route path="/register" element={<Register handleRegister={handleAuth} />} />
        <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
        
        <Route path='/boards' element={
          <>
            {boards && <NavBar boards={boards} setBoard={setBoard} createBoard={createBoard} authorised={authorised} /> }
            <DndProvider backend={HTML5Backend}>
              <ProtectedRoute authorised={authorised}>  
                {board && <Board 
                  board={board} 
                  setBoard={setBoard} 
                  editBoard={editBoard} 
                  editCardsStatus={editCardsStatus} 
                  createColumn={createColumn}
                  deleteColumn={deleteColumn}
                  /> }
              </ProtectedRoute>
            </DndProvider>
          </>
        } />

        <Route path='/:id' element={<CardDetail handleDelete={handleDelete} handleEdit={handleEdit}/>} />
      </Routes>
    </div>
  );
}

export default App;
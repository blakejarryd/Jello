import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';

import Home from "./components/Home"
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import Board from './components/Board'
import CardDetail from './components/CardDetails';
import NavBar from './components/NavBar';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const [boards, setBoards] = useState(null)
  const [board, setBoard] = useState('')

  const getBoards = async () => {
    const url = 'http://localhost:3000/boards'
    const res = await fetch(url)
    const boardData = await res.json()
    setBoards(boardData)
  }

  const deleteCardFromBoard = async (cardID, board) => {
    const boardCards = [...board.cards]
    const updatedCards = boardCards.pop(cardID)
    console.log(boardCards)
    console.log(updatedCards)
    await fetch(`http://localhost:3000/boards/${board._id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({cards: boardCards})
    })
  }

  const handleDelete = async (id) => {
    console.log(id)
    const url = `http://localhost:3000/cards/${id}`
    await fetch(url, {
      method: 'DELETE'
    })
    deleteCardFromBoard(id, board)
  }

  const handleEdit = async (updatedCard, cardID) => {
    await fetch(`http://localhost:3000/cards/${cardID}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(updatedCard)
    })
  }

  const createBoard = async () => {
    const res = await fetch('http://localhost:3000/boards', {
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
    const res = await fetch(`http://localhost:3000/boards/${board._id}`, {
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

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/boards' element={
          <>
            {boards && <NavBar boards={boards} setBoard={setBoard} createBoard={createBoard} /> }
            <DndProvider backend={HTML5Backend}>
              {board && <Board board={board} setBoard={setBoard} editBoard={editBoard}/> }
            </DndProvider>
          </>
        } />
        <Route path='/:id' element={<CardDetail handleDelete={handleDelete} handleEdit={handleEdit}/>} />
      </Routes>
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';

import Home from "./components/Home"
import Board from './components/Board'
import CardDetail from './components/CardDetails';
import NavBar from './components/NavBar';

const App = () => {
  const [boards, setBoards] = useState(null)
  const [board, setBoard] = useState('')

  const getBoards = async () => {
    const url = 'http://localhost:3000/boards'
    const res = await fetch(url)
    const boardData = await res.json()
    setBoards(boardData)
  }

  const handleDelete = async (id) => {
    console.log(id)
    const url = `http://localhost:3000/cards/${id}`
    await fetch(url, {
      method: 'DELETE'
    })
  }

  const handleEdit = async (updatedCard, cardID) => {
    console.log(updatedCard)
    await fetch(`http://localhost:3000/cards/${cardID}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(updatedCard)
    })
  }

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/boards' element={
          <>
            {boards && <NavBar boards={boards} setBoard={setBoard} /> }
            {board && <Board board={board} /> }
          </>
        } />
        <Route path='/:id' element={<CardDetail handleDelete={handleDelete} handleEdit={handleEdit}/>} />
      </Routes>
    </div>
  );
}

export default App;

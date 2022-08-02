import { Routes, Route } from 'react-router-dom'
import './App.css';
import Board from './components/Board'
import CardDetail from './components/CardDetails';

const App = () => {
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

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Board />} />
        <Route path='/:id' element={<CardDetail handleDelete={handleDelete} handleEdit={handleEdit}/>} />
      </Routes>
    </div>
  );
}

export default App;

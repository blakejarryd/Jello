import { Routes, Route } from 'react-router-dom'
import './App.css';
import Board from './components/Board'
import CardDetail from './components/CardDetails';



const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Board />} />
        <Route path='/:id' element={<CardDetail />} />
      </Routes>
    </div>
  );
}

export default App;

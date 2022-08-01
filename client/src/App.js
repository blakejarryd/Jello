import { Routes, Route } from 'react-router-dom'
import './App.css';
import Board from './components/Board'



const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;

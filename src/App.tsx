import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Cards from './components/cards/cards'
import Card from './components/card/card';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="*" element={<>Page not found</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

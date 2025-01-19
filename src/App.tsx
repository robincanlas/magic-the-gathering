import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Cards from './components/cards/cards'
import Card from './components/card/card';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/card/:id" element={<Card />} />
          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

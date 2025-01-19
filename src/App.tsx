import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import './App.css'
import Cards from './components/cards/cards'
import Card from './components/card/card';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from "react";
import useCardStore from "./store/cardStore";
import useCardSearch from "./hooks/useCardSearch";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const Layout = () => {
  const setCardsLoading = useCardStore((state) => state.setCardsLoading);
  const setSearchTerm = useCardStore((state) => state.setSearchTerm);
  const { lazyFetch } = useCardSearch();

  useEffect(() => {
    setCardsLoading(true);
    setSearchTerm('is:reserved');
    lazyFetch('is:reserved', () => {
      setCardsLoading(false);
    });
  }, []);
  
  return <Outlet />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Cards />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/card/:id" element={<Card />} />
            <Route path="*" element={<>Page not found</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

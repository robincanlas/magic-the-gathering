import { HashRouter, Routes, Route, Outlet, useSearchParams } from "react-router";
import './App.css'
import Cards from './components/cards/cards'
import Card from './components/card/card';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from "react";
import useCardStore from "./store/cardStore";
import useCardSearch from "./hooks/useCardSearch";
import SearchBar from './components/searchbar/searchbar';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const INITIAL_SEARCH_TERM = 'is:reserved';

const Layout = () => {
  const [searchParams, setSearchParams] = useSearchParams(); 
  const query = searchParams.get('search');
  const setCardsLoading = useCardStore((state) => state.setCardsLoading);
  const { lazyFetch } = useCardSearch();

  useEffect(() => {
    let isMounted = true;
    const searchValue = query || INITIAL_SEARCH_TERM;

    if (!query) {
      setSearchParams({ search: searchValue }, { replace: true });
      return () => {
        isMounted = false;
      };
    }

    setCardsLoading(true);
    lazyFetch(searchValue, () => {
      if (isMounted) {
        setCardsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [query, lazyFetch, setCardsLoading, setSearchParams]);
  
  return (
    <>
      <SearchBar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Cards />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/card/:id" element={<Card />} />
            <Route path="*" element={<>Page not found</>} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App

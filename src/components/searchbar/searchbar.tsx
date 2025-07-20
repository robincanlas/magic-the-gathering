import { useState } from 'react';
import useCardStore from '../../store/cardStore';
import useCardSearch from '../../hooks/useCardSearch';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Slide } from '@mui/material';
import logo from '../../assets/magic-logo.svg';
import ThemeSwitcher from '../theme-switcher/theme-switcher';
import { useLocation, useNavigate } from 'react-router';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function HideOnScroll({ children }: { children: React.ReactElement }) {
  
  const trigger = useScrollTrigger({
    target: window,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

const homepage = ['/', '/cards'];

export default function SearchAppBar() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const setCardsLoading = useCardStore((state) => state.setCardsLoading);
  const setSearchTermStore = useCardStore((state) => state.setSearchTerm);
  const { lazyFetch } = useCardSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (!homepage.includes(location.pathname)) {
      navigate('/');
    }

    setCardsLoading(true);
    setSearchTermStore(searchTerm);
    lazyFetch(searchTerm, () => {
      setCardsLoading(false);
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>

              <img style={{
                transform: 'scale(3) translate(16px, 0)',
                transformOrigin: 'center',
                position: 'relative'
              }} src={logo} alt="logo" width={50} height={50} />
            </div>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
              />
            </Search>
            <ThemeSwitcher />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
}

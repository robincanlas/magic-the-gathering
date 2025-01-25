import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useEffect } from 'react';

const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    if (!mode) {
      setMode('dark');
    }
  }, [mode]);

  if (!mode) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, paddingLeft: 2, cursor: 'pointer' }}>
      {mode === 'dark' ? (
        <DarkModeIcon onClick={() => setMode('light')} />
      ) : (
        <LightModeIcon onClick={() => setMode('dark')} />
      )}
    </Box>
  );
}

export default ThemeSwitcher;
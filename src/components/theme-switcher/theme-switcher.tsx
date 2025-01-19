import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();

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
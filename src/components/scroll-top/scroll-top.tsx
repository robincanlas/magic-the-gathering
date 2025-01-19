import Box from '@mui/material/Box';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Fab, Fade } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollTop({ children }: { children: React.ReactElement }) {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const ScrollTopButton = () => {
  return (
    <ScrollTop >
      <Fab size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
   </ScrollTop>
  );
}

export default ScrollTopButton
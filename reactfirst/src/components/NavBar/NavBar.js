import { useState } from 'react';
import {AppBar, Button, Box, Container, CssBaseline, createTheme, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const pages = [];
const darkTheme = createTheme({ palette: { mode: 'dark'}});
const lightTheme = createTheme({ palette: { mode: 'light'}});

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [theme,switchtheme] = useState(lightTheme);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <AppBar enableColorOnDark color='primary'>
      <Container maxWidth="s">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>
            Butterfly
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon/>
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
              keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }}
              open={Boolean(anchorElNav)}  onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' }, }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant="h5" noWrap component="a" href=""
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem',
              color: 'inherit', textDecoration: 'none', }}>
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>
          <IconButton sx={{ ml: 1 }} onClick={() => {theme === darkTheme ? switchtheme(lightTheme) : switchtheme(darkTheme)}} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    </>
  );
}
export default NavBar;







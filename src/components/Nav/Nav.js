import React from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';
import { AppBar,  IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

// Material-ui styling
const styles = makeStyles(theme => ({
  menuButton: {
      marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav(){
  // Adds material-ui styling
  const classes = styles;

  // State for menu button
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Handles menu opening
  function handleMenu(event){
    setAnchorEl(event.currentTarget)
  }

  // Handles clicking menu button
  function handleClose(event, path){
    setAnchorEl(null)
    if(path){
      history.push(path);
    }
}

  let history = useHistory();
  return(
    <AppBar position='static'>
      <Toolbar>
        <IconButton 
          onClick={handleMenu} 
          className={classes.menuButton} 
          color="inherit"
        >
          <MenuIcon/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{vertical: 'top', horizontal: 'left'}} 
          keepMounted
          transformOrigin={{vertical: 'top', horizontal: 'left'}}
          open={Boolean(anchorEl)}
          onClose={(event)=>handleClose(event)}>
          <MenuItem onClick={(event)=>{handleClose(event, '/')}}>Movies</MenuItem>
          <MenuItem onClick={(event)=>{handleClose(event, '/genres/')}}>Genres</MenuItem>
        </Menu>
        <Typography variant="h6" className={classes.title}>
            Movie List
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
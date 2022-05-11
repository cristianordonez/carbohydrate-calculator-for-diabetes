import React from 'react';
import '../../styles/Nav.css';
import {
   AppBar,
   Typography,
   Toolbar,
   CssBaseline,
   Button,
   Avatar,
   Paper,
   Box,
   Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LogoutIcon from '@mui/icons-material/Logout';

function Nav(props) {
   let navigate = useNavigate();

   async function handleClick() {
      await axios.get('api/logout');
      navigate('/', {
         state: {
            loggedOut: true,
         },
      });
   }
   const paperStyle = {
      backgroundColor: '#003BA7',
      color: '#E8E6E3',
   };
   const navLinksStyle = {
      display: 'flex',
      justifyContent: 'flexEnd',
   };
   return (
      <AppBar
         className='navbar'
         position='absolute'
         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
         {' '}
         <div style={{ display: 'none' }} id='edamam-badge'></div>
         <Paper elevation={1} style={paperStyle}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
               <Avatar sx={{ bgcolor: '#1D2D44' }}>
                  <Link to='/home' className='link'>
                     <FoodBankIcon />
                  </Link>
               </Avatar>

               <Link to='/recipe' className='link'>
                  <Typography variant='h6'>Find Recipes</Typography>
               </Link>

               <Link to='/mealplan' className='link'>
                  <Typography variant='h6'>Your Meals</Typography>
               </Link>
               <Tooltip title='Logout' placement='bottom-end'>
                  <Button
                     variant='outlined'
                     color='logout'
                     onClick={handleClick}
                  >
                     <LogoutIcon />
                  </Button>
               </Tooltip>
            </Toolbar>
         </Paper>
      </AppBar>
   );
}

export default Nav;

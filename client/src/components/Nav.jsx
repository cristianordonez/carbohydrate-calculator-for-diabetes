import React, { Component } from 'react';
import './styles/Nav.css';
import {
   AppBar,
   Typography,
   Toolbar,
   CssBaseline,
   Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Nav(props) {
   let navigate = useNavigate();

   async function handleClick() {
      await axios.get('/logout');
      navigate('/login', { replace: true });
   }
   return (
      <AppBar
         sx={{ zIndex: 1251, backgroundColor: '#414361', color: 'white' }}
         className='navbar'
         position='fixed'
      >
         <CssBaseline />
         <Toolbar>
            <Typography variant='h4' className='logo'>
               <div style={{ display: 'none' }} id='edamam-badge'></div>
            </Typography>
            <div className='navLinks'>
               <Link to='/home' className='link'>
                  Home
               </Link>
               <Link to='/recipe' className='link'>
                  Find Recipes
               </Link>
               <Link to='/mealplan' className='link'>
                  Meal Plan
               </Link>
               <Button onClick={handleClick} className='link'>
                  Logout
               </Button>
            </div>
         </Toolbar>
      </AppBar>
   );
}

export default Nav;

import React, { Component } from 'react'
import './styles/Nav.css'
import { AppBar, Typography, Toolbar, CssBaseline } from '@mui/material'
import { Link } from 'react-router-dom'
class Nav extends Component {
   constructor(props) {
      super(props)
   }

   render() {
      return (
         <AppBar
            sx={{ backgroundColor: '#414361', color: 'white' }}
            className='navbar'
            position='static'
         >
            <CssBaseline />
            <Toolbar>
               <Typography variant='h4' className='logo'>
                  <div id={this.props.id}></div>
               </Typography>
               <div className='navLinks'>
                  <Link to='/' className='link'>
                     Home
                  </Link>
                  <Link to='/recipe' className='link'>
                     Find Recipes
                  </Link>
                  <Link to='/mealplan' className='link'>
                     Meal Plan
                  </Link>
                  <Link to='/logout' className='link'>
                     Signout
                  </Link>
               </div>
            </Toolbar>
         </AppBar>
      )
   }
}

export default Nav

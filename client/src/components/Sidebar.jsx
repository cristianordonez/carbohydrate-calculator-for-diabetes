import React, { Component } from 'react'
import {
   TextField,
   Box,
   Drawer,
   CssBaseline,
   Typography,
   InputAdornment,
   Autocomplete,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
const axios = require('axios')
const drawerWidth = 340
class Sidebar extends Component {
   constructor(props) {
      super(props)
      this.state = { query: '', meal: '', hasSubmitError: false }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
   }
   handleSubmit(e) {
      e.preventDefault()
      console.log('this.state:', this.state)
      if (this.state.query.length === 0 || this.state.meal.length === 0) {
         this.setState({ hasSubmitError: true })
      } else {
         console.log('here in hadnle submit')
         let promise = axios.get('/recipes', this.state)
         console.log('promise:', promise)
         promise.then((result) => {
            console.log('result:', result)
         })
      }
   }
   handleChange(e) {
      let input = e.target.value
      console.log('input:', input)
      this.setState({ [e.target.name]: e.target.value })
   }
   render() {
      const mealTypes = [
         { id: 1, label: 'Breakfast' },
         { id: 2, label: 'Lunch' },
         { id: 3, label: 'Dinner' },
         { id: 4, label: 'Snack' },
      ]
      return (
         <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
               sx={{
                  width: drawerWidth,
                  // marginTop: '3px',
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                     width: drawerWidth,
                     boxSizing: 'border-box',
                  },
               }}
               variant='persistent'
               anchor='left'
               open={true}
            >
               <Box sx={{ paddingTop: 25 }}>
                  <Typography variant='h6'>
                     Enter a food, and get recipes for meals that match your
                     carbohydrate range:
                  </Typography>
                  <form
                     onClick={(e) => {
                        this.handleSubmit(e)
                     }}
                  >
                     <TextField
                        fullWidth
                        error={
                           this.state.hasSubmitError &&
                           this.state.query.length === 0
                        }
                        required
                        onClick={(e) => {
                           e.target.value = ''
                        }}
                        onChange={this.handleChange}
                        margin='normal'
                        label='Search for Recipes'
                        name='query'
                        type='search'
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position='start'>
                                 <SearchIcon />
                              </InputAdornment>
                           ),
                        }}
                     />
                     <Autocomplete
                        disablePortal
                        required
                        error={
                           this.state.hasSubmitError
                              ? this.state.meal.length
                              : undefined
                        }
                        onChange={(event, value) => {
                           console.log('value:', value)
                           this.setState({ meal: value.label })
                        }}
                        required
                        isOptionEqualToValue={(option, value) =>
                           option.id === value.id
                        }
                        options={mealTypes}
                        //  style={{ width: '100%' }}
                        renderInput={(params) => (
                           <TextField {...params} label='Select meal type' />
                        )}
                     />
                     <input type='submit' />
                  </form>
               </Box>
            </Drawer>
         </Box>
      )
   }
}

export default Sidebar

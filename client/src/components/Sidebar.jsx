import React, { Component } from 'react';
import {
   TextField,
   Box,
   Drawer,
   Grid,
   CssBaseline,
   Typography,
   InputAdornment,
   Autocomplete,
   Button,
   Input,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const drawerWidth = 340;

class Sidebar extends Component {
   constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleAutoComplete = this.handleAutoComplete.bind(this);
   }
   handleSubmit(e) {
      e.preventDefault();
      this.props.handleSearch();
   }
   handleChange(e) {
      let inputName = e.target.name;
      let inputValue = e.target.value;
      this.props.handleChildChange(inputName, inputValue);
   }
   handleAutoComplete(option) {
      if (option) {
         let inputName = option.name;
         let inputValue = option.label;

         this.props.handleChildChange(inputName, inputValue);
      }
   }

   render() {
      return (
         <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
               sx={{
                  width: drawerWidth,
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
               <Grid
                  container
                  direction='column'
                  justifyContent='space-evenly'
                  alignItems='center'
                  sx={{ marginTop: 25, padding: 5 }}
               >
                  <Box sx={{ textAlign: '' }}>
                     <Typography variant='h6'>
                        Search for recipes by ingredient and meal type:
                     </Typography>
                  </Box>
                  <form onSubmit={this.handleSubmit}>
                     <TextField
                        fullWidth
                        required
                        variant='outlined'
                        onChange={(event, value) => {
                           this.handleChange(event);
                        }}
                        margin='normal'
                        label='Search for Recipes'
                        name='query'
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
                        isOptionEqualToValue={(option, value) =>
                           option.id === value.id
                        }
                        getOptionLabel={(option) => option.label}
                        required
                        options={this.props.mealTypes}
                        onChange={(event, value) => {
                           this.handleAutoComplete(value);
                        }}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              name='meal'
                              required
                              label='Select meal type'
                           />
                        )}
                     />

                     <Button
                        sx={{ marginTop: 2 }}
                        id='search-button'
                        type='submit'
                        variant='contained'
                     >
                        Search Recipes
                     </Button>
                  </form>
                  <Typography sx={{ marginTop: 5 }} variant='subtitle1'>
                     No need to enter your determined carbohydrates or calories!
                     All recipes will be automatically searched with your
                     ranges.
                  </Typography>
               </Grid>
            </Drawer>
         </Box>
      );
   }
}

export default Sidebar;

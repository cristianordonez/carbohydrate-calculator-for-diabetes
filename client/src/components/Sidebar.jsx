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
    let inputName = option.name;
    let inputValue = option.label;
    this.props.handleChildChange(inputName, inputValue);
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
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>
                Enter a food, and get recipes for meals that match your
                carbohydrate range:
              </Typography>
            </Box>
            <form>
              <TextField
                fullWidth
                required
                onChange={(event, value) => {
                  this.handleChange(event);
                }}
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
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.label}
                options={this.props.mealTypes}
                onChange={(event, value) => {
                  this.handleAutoComplete(value);
                }}
                //  style={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} name='meal' label='Select meal type' />
                )}
              />
              <Box display='flex' justifyContent='center'>
                <label htmlFor='search-button'>
                  <Button
                    sx={{ marginTop: 2 }}
                    onClick={this.handleSubmit}
                    id='search-button'
                    type='submit'
                    variant='contained'
                    component='span'
                  >
                    Search Recipes
                  </Button>
                </label>
              </Box>
            </form>
          </Grid>
        </Drawer>
      </Box>
    );
  }
}

export default Sidebar;

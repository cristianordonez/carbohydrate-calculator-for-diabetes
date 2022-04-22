import React, { Component } from 'react';
import Metrics from './Metrics.jsx';
import MealPlan from './MealPlan.jsx';
import Recipe from './Recipe.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Nav from './Nav.jsx';
// import { Route } from 'react-router-dom'
import {
   Box,
   MenuItem,
   TextField,
   Grid,
   Autocomplete,
   RadioGroup,
   FormControlLabel,
   FormHelperText,
   FormControl,
   FormLabel,
   Radio,
   Button,
   CssBaseline,
   Typography,
} from '@mui/material';
import axios from 'axios';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         height: null,
         weight: null,
         age: null,
         gender: '',
         activityLevel: null,
         total_CHO: null,
         total_calories: null,
         error: false,
         helperText: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   //page checks db if user has made metrics before, if so Metrics component is rendered and state is set
   async componentDidMount() {
      try {
         let result = await axios.get('/metrics');
         this.setState({
            total_calories: result.data.total_calories,
            total_CHO: result.data.total_CHO,
         });
      } catch (err) {
         throw new Error(err);
      }
   }

   handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
   }

   async handleSubmit() {
      if (this.state.gender.length === 0) {
         this.setState({ error: true, helperText: 'Please enter an option' });
         return;
      } else {
         let response = await axios.post('/metrics', this.state);
         this.setState({
            total_CHO: response.data.total_CHO,
            total_calories: response.data.total_calories,
            error: false,
         });
      }
   }

   render() {
      const activityLevels = [
         {
            id: 1,
            label: 'little to no exercise',
         },
         {
            id: 1.1,
            label: 'light exercise 1-3 times per week',
         },
         {
            id: 1.3,
            label: 'moderate exercise 3-5 times per week',
         },
         {
            id: 1.5,
            label: 'heavy exercise 5-7 times per week',
         },
      ];
      const ages = [];
      for (let i = 16; i < 81; i++) {
         let result = {};
         (result.id = i), (result.label = i + ''), ages.push(result);
      }
      const heights = [];
      for (let i = 48; i < 85; i++) {
         let result = {};
         (result.id = i), (result.label = i + ''), heights.push(result);
      }
      const weights = [];
      for (let i = 80; i < 350; i++) {
         let result = {};
         (result.id = i), (result.label = i + ''), weights.push(result);
      }

      return (
         <>
            <Nav />
            <CssBaseline />
            <Grid
               container
               direction='row'
               justifyContent='space-evenly'
               alignItems='center'
               spacing={0.5}
               sx={{ marginTop: 15 }}
            >
               <Grid sx={{ paddingLeft: 35 }} item>
                  <Typography variant='h6'>
                     Enter metrics to find out recommended calories and
                     carbohydrates per meal
                  </Typography>
               </Grid>
               <form onSubmit={this.handleSubmit}>
                  <Grid
                     item
                     sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                     }}
                     noValidate
                     autoComplete='off'
                     justifyContent='center'
                     alignItems='center'
                  >
                     <Autocomplete
                        disablePortal
                        type='number'
                        onChange={(event, value) => {
                           this.setState({ age: value.id });
                        }}
                        required
                        name='age'
                        isOptionEqualToValue={(option, value) =>
                           option.id === value.id
                        }
                        options={ages}
                        renderInput={(params) => (
                           <TextField {...params} required label='Enter Age' />
                        )}
                     />
                     <FormControl error={this.state.error}>
                        <FormLabel id='demo-row-radio-buttons-group-label'>
                           Gender
                        </FormLabel>
                        <RadioGroup
                           row
                           aria-labelledby='demo-row-radio-buttons-group-label'
                           name='gender'
                           onChange={this.handleChange}
                        >
                           <FormControlLabel
                              value='female'
                              control={<Radio />}
                              label='Female'
                           />
                           <FormControlLabel
                              value='male'
                              control={<Radio />}
                              label='Male'
                           />
                           <FormControlLabel
                              value='other'
                              control={<Radio />}
                              label='Other'
                           />
                        </RadioGroup>
                        <FormHelperText>{this.state.helperText}</FormHelperText>
                     </FormControl>

                     <Autocomplete
                        disablePortal
                        type='number'
                        onChange={(event, value) => {
                           this.setState({ height: value.id });
                        }}
                        required
                        name='height'
                        isOptionEqualToValue={(option, value) =>
                           option.id === value.id
                        }
                        options={heights}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              required
                              label='Enter Height (inches)'
                           />
                        )}
                     />

                     <Autocomplete
                        disablePortal
                        type='number'
                        onChange={(event, value) => {
                           this.setState({ weight: value.id });
                        }}
                        required
                        name='weight'
                        isOptionEqualToValue={(option, value) =>
                           option.id === value.id
                        }
                        options={weights}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              required
                              label='Enter Weight (lbs)'
                           />
                        )}
                     />
                     <Autocomplete
                        disablePortal
                        onChange={(event, value) => {
                           this.setState({ activityLevel: value.id });
                        }}
                        required
                        isOptionEqualToValue={(option, value) =>
                           option.id === value.id
                        }
                        name='activityLevel'
                        options={activityLevels}
                        //  style={{ width: '100%' }}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              label='Enter Activity Level'
                           />
                        )}
                     />
                     <Box display='flex' justifyContent='center'>
                        <Button type='submit' variant='outlined'>
                           Submit
                        </Button>
                     </Box>
                  </Grid>
               </form>
               {this.state.total_calories && this.state.total_CHO && (
                  <Metrics
                     total_calories={this.state.total_calories}
                     total_CHO={this.state.total_CHO}
                     size={750}
                  />
               )}
            </Grid>
         </>
      );
   }
}

export default App;

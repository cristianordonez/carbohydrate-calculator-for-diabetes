import React, { Component } from 'react';
import MetricsMeal from './MetricsMeal.jsx';
import {
   CircularProgress,
   Box,
   Typography,
   Grid,
   Paper,
   IconButton,
   Tooltip,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   TextField,
   Button,
   Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
class Metrics extends Component {
   constructor(props) {
      super(props);
      this.state = {
         openDialog: false,
         total_calories: 0,
         total_CHO: 0,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }
   //handles submit when dialog changes are submitted, sends state to parent
   handleSubmit(e) {
      e.preventDefault();
      this.setState({ openDialog: !this.state.openDialog });
      this.props.handleChildSubmit(
         this.state.total_calories,
         this.state.total_CHO
      );
   }
   //handles opening and closing dialog
   handleClick() {
      this.setState({ openDialog: !this.state.openDialog });
   }
   handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
   }
   render() {
      return (
         <>
            <Dialog open={this.state.openDialog}>
               <DialogTitle>Enter custom calorie and carbohydrate</DialogTitle>
               <form onSubmit={this.handleSubmit}>
                  <DialogContent>
                     <Box display='flex' flexDirection='column' gap='10px'>
                        <TextField
                           required
                           onChange={this.handleChange}
                           name='total_calories'
                           type='number'
                           label='Calories'
                           placeholder='Enter calorie goal'
                        ></TextField>
                        <TextField
                           required
                           name='total_CHO'
                           onChange={this.handleChange}
                           type='number'
                           label='Carbohydrates'
                           placeholder='Enter carbohydrate goal'
                        ></TextField>
                     </Box>
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={this.handleClick}>Cancel</Button>
                     <Button type='submit'>Submit</Button>
                  </DialogActions>
               </form>
            </Dialog>
            <Grid
               container
               spacing={2}
               alignItems='stretch'
               sx={{ height: '100%', width: '100%' }}
            >
               <Grid
                  item
                  display='flex'
                  sx={{ flexDirection: 'column' }}
                  alignItems='center'
                  justifyContent='center'
                  xs={5}
               >
                  <Typography variant='h6'> Total Calories Daily</Typography>
                  <Typography sx={{ color: '#D16666' }} variant='h6'>
                     {`   ${this.props.total_calories}`}
                  </Typography>
               </Grid>
               <Grid
                  item
                  display='flex'
                  sx={{ flexDirection: 'column' }}
                  alignItems='center'
                  justifyContent='center'
                  xs={5}
               >
                  <Typography variant='h6'>Total Carbs Daily</Typography>
                  <Typography sx={{ color: '#D16666' }} variant='h6'>
                     {' '}
                     {this.props.total_CHO}
                  </Typography>
               </Grid>
               <Grid item xs={2}>
                  <Tooltip
                     placement='right'
                     title='Click here if you prefer entering calorie and carbohydrate ranges manually.'
                  >
                     <Avatar>
                        <IconButton onClick={this.handleClick}>
                           <EditIcon />
                        </IconButton>
                     </Avatar>
                  </Tooltip>
               </Grid>

               <Grid item xs={6}>
                  <MetricsMeal
                     icon='Breakfast'
                     minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 5)}
                     maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 5)}
                     maxKcal={Math.floor(
                        (this.props.total_calories / 7) * 2 + 100
                     )}
                     minKcal={Math.floor(
                        (this.props.total_calories / 7) * 2 - 100
                     )}
                  />
               </Grid>
               <Grid item xs={6}>
                  <MetricsMeal
                     icon='Lunch'
                     minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 5)}
                     maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 5)}
                     maxKcal={Math.floor(
                        (this.props.total_calories / 7) * 2 + 100
                     )}
                     minKcal={Math.floor(
                        (this.props.total_calories / 7) * 2 - 100
                     )}
                  />
               </Grid>
               <Grid item xs={6}>
                  <MetricsMeal
                     icon='Dinner'
                     minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 5)}
                     maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 5)}
                     maxKcal={Math.floor(
                        (this.props.total_calories / 7) * 2 + 100
                     )}
                     minKcal={Math.floor(
                        (this.props.total_calories / 7) * 2 - 100
                     )}
                  />
               </Grid>
               <Grid item xs={6}>
                  <MetricsMeal
                     icon='Snacks'
                     minCarbs={Math.floor(this.props.total_CHO / 7 - 5)}
                     maxCarbs={Math.floor(this.props.total_CHO / 7 + 5)}
                     maxKcal={Math.floor(this.props.total_calories / 7 + 100)}
                     minKcal={Math.floor(this.props.total_calories / 7 - 100)}
                  />
               </Grid>
            </Grid>
         </>
      );
   }
}

export default Metrics;

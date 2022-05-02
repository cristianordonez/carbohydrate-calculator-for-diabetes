import React, { Component } from 'react';
import MetricsMeal from './MetricsMeal.jsx';
import { CircularProgress, Box, Typography, Grid } from '@mui/material';

class Metrics extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      return (
         <>
            <Box display='flex' justifyContent='center'>
               <Typography variant='h6' align='center'>
                  Total Calories Per Day:
               </Typography>
               <Typography sx={{ color: '#D16666' }} variant='h6'>
                  {this.props.total_calories}
               </Typography>
            </Box>
            <Box display='flex' justifyContent='center'>
               <Typography variant='h6' align='right'>
                  Total Carbohydrates Per Day:
               </Typography>
               <Typography sx={{ color: '#D16666' }} variant='h6'>
                  {' '}
                  {this.props.total_CHO}
               </Typography>
            </Box>
            <MetricsMeal
               icon='Breakfast'
               minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 5)}
               maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 5)}
               maxKcal={Math.floor((this.props.total_calories / 7) * 2 + 100)}
               minKcal={Math.floor((this.props.total_calories / 7) * 2 - 100)}
            />

            <MetricsMeal
               icon='Lunch'
               minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 5)}
               maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 5)}
               maxKcal={Math.floor((this.props.total_calories / 7) * 2 + 100)}
               minKcal={Math.floor((this.props.total_calories / 7) * 2 - 100)}
            />

            <MetricsMeal
               icon='Dinner'
               minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 5)}
               maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 5)}
               maxKcal={Math.floor((this.props.total_calories / 7) * 2 + 100)}
               minKcal={Math.floor((this.props.total_calories / 7) * 2 - 100)}
            />

            <MetricsMeal
               icon='Snacks'
               minCarbs={Math.floor(this.props.total_CHO / 7 - 5)}
               maxCarbs={Math.floor(this.props.total_CHO / 7 + 5)}
               maxKcal={Math.floor(this.props.total_calories / 7 + 100)}
               minKcal={Math.floor(this.props.total_calories / 7 - 100)}
            />
         </>
      );
   }
}

export default Metrics;

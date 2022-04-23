import React, { Component } from 'react';
import MetricsMeal from './MetricsMeal.jsx';
import { CircularProgress, Box, Typography, Grid } from '@mui/material';

class Metrics extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      //this is edamame badge I need to include
      return (
         <>
            {/* <Grid
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position='absolute'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  direction='column'
                  container
               > */}
            <Box display='flex' justifyContent='space-evenly'>
               <Typography variant='h6' align='left'>
                  Total Calories Per Day:
               </Typography>
               <Typography variant='h5'>{this.props.total_calories}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-evenly'>
               <Typography variant='h6' align='left'>
                  Total Carbohydrates Per Day:
               </Typography>
               <Typography variant='h5'>{this.props.total_CHO}</Typography>
            </Box>
            <MetricsMeal
               icon='Breakfast'
               minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 10)}
               maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 10)}
               maxKcal={Math.floor((this.props.total_calories / 7) * 2 + 150)}
               minKcal={Math.floor((this.props.total_calories / 7) * 2 - 150)}
            />

            <MetricsMeal
               icon='Lunch'
               minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 10)}
               maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 10)}
               maxKcal={Math.floor((this.props.total_calories / 7) * 2 + 150)}
               minKcal={Math.floor((this.props.total_calories / 7) * 2 - 150)}
            />

            <MetricsMeal
               icon='Dinner'
               minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 10)}
               maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 10)}
               maxKcal={Math.floor((this.props.total_calories / 7) * 2 + 150)}
               minKcal={Math.floor((this.props.total_calories / 7) * 2 - 150)}
            />

            <MetricsMeal
               icon='Snacks'
               minCarbs={Math.floor(this.props.total_CHO / 7 - 10)}
               maxCarbs={Math.floor(this.props.total_CHO / 7 + 10)}
               maxKcal={Math.floor(this.props.total_calories / 7 + 150)}
               minKcal={Math.floor(this.props.total_calories / 7 - 150)}
            />
         </>
      );
   }
}

export default Metrics;

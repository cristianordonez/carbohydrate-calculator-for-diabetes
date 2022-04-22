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
      <div>
        <Box position='relative' display='inline-flex'>
          <CircularProgress
            sx={{ color: '#414361' }}
            variant='determinate'
            size={900}
            value={75}
            thickness={1.0}
          />
          <Grid
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
          >
            <Box>
              <Typography variant='h6' component='div' color='textSecondary'>
                {`${this.props.total_calories} Total Calories Recommended Per Day`}
              </Typography>
            </Box>
            <Box>
              <Typography variant='h6' component='div' color='textSecondary'>
                {`${this.props.total_CHO} Total Carbohydrates Recommended Per Day`}
              </Typography>
            </Box>
            <Box>
              <MetricsMeal
                icon='Breakfast'
                minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 5)}
                maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 5)}
                maxKcal={Math.floor((this.props.total_calories / 7) * 2 + 100)}
                minKcal={Math.floor((this.props.total_calories / 7) * 2 - 100)}
              />
            </Box>
            <Box>
              <MetricsMeal
                icon='Lunch'
                minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 5)}
                maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 5)}
                maxKcal={Math.floor((this.props.total_calories / 7) * 2 + 100)}
                minKcal={Math.floor((this.props.total_calories / 7) * 2 - 100)}
              />
            </Box>
            <Box>
              <MetricsMeal
                icon='Dinner'
                minCarbs={Math.floor((this.props.total_CHO / 7) * 2 - 5)}
                maxCarbs={Math.floor((this.props.total_CHO / 7) * 2 + 5)}
                maxKcal={Math.floor((this.props.total_calories / 7) * 2 + 100)}
                minKcal={Math.floor((this.props.total_calories / 7) * 2 - 100)}
              />
            </Box>
            <Box>
              <MetricsMeal
                icon='Snacks'
                minCarbs={Math.floor(this.props.total_CHO / 7 - 5)}
                maxCarbs={Math.floor(this.props.total_CHO / 7 + 5)}
                maxKcal={Math.floor(this.props.total_calories / 7 + 100)}
                minKcal={Math.floor(this.props.total_calories / 7 - 100)}
              />
            </Box>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Metrics;

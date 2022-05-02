import React, { Component } from 'react';
import { Card, CardContent, Paper, Typography, Box } from '@mui/material';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
class MetricsMeal extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      //this is edamame badge I need to include
      return (
         <Card sx={{ maxWidth: 400, margin: '10px auto' }}>
            <Paper elevation={24}>
               <CardContent>
                  <Box display='flex' justifyContent='space-between'>
                     <Typography gutterBottom variant='h5' component='div'>
                        {this.props.icon}
                     </Typography>
                     {this.props.icon === 'Breakfast' && (
                        <BreakfastDiningIcon />
                     )}
                     {this.props.icon === 'Lunch' && <LunchDiningIcon />}
                     {this.props.icon === 'Dinner' && <DinnerDiningIcon />}
                     {this.props.icon === 'Snacks' && <LocalDiningIcon />}
                  </Box>
                  <Typography variant='subtitle1' color='text.secondary'>
                     Recommended Kcal Range: {this.props.minKcal} -{' '}
                     {this.props.maxKcal} kcal
                  </Typography>
                  <Typography variant='subtitle1' color='text.secondary'>
                     Recommended Carb Range: {this.props.minCarbs} -
                     {this.props.maxCarbs} g
                  </Typography>
               </CardContent>
            </Paper>
         </Card>
      );
   }
}

export default MetricsMeal;

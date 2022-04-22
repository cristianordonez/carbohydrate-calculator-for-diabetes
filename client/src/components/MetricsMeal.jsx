import React, { Component } from 'react';
import { Card, CardContent, Paper, Typography } from '@mui/material';
import { MdFreeBreakfast, MdLunchDining, MdDinnerDining } from 'react-icons/Md';
import { GiChipsBag } from 'react-icons/Gi';

class MetricsMeal extends Component {
   constructor(props) {
      super(props);
   }
   render() {
      //this is edamame badge I need to include
      return (
         <Card sx={{ maxWidth: 400 }}>
            <CardContent>
               {this.props.icon === 'Breakfast' && <MdFreeBreakfast />}
               {this.props.icon === 'Lunch' && <MdLunchDining />}
               {this.props.icon === 'Dinner' && <MdDinnerDining />}
               {this.props.icon === 'Snacks' && <GiChipsBag />}
               <Typography gutterBottom variant='h5' component='div'>
                  {this.props.icon}
               </Typography>
               <Typography variant='subtitle1' color='text.secondary'>
                  Recommended Kcal Range: {this.props.minKcal} -{' '}
                  {this.props.maxKcal}
               </Typography>
               <Typography variant='subtitle1' color='text.secondary'>
                  Recommended Carb Range: {this.props.minCarbs} -{' '}
                  {this.props.maxCarbs}
               </Typography>
            </CardContent>
         </Card>
      );
   }
}

export default MetricsMeal;

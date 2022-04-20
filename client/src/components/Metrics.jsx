import React, { Component } from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'

class Metrics extends Component {
   constructor(props) {
      super(props)
   }
   render() {
      //this is edamame badge I need to include
      return (
         <div>
            <Box position='relative' display='inline-flex'>
               <CircularProgress
                  sx={{ color: '#414361' }}
                  variant='determinate'
                  size={400}
                  value={75}
                  thickness={1.0}
               />
               <Box
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  position='absolute'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
               >
                  <Typography
                     variant='caption'
                     component='div'
                     color='textSecondary'
                  >
                     {this.props.total_CHO}
                  </Typography>
               </Box>
            </Box>
         </div>
      )
   }
}

export default Metrics

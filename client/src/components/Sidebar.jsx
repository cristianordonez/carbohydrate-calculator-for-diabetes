import React, { Component } from 'react'
import { Box, Drawer, CssBaseline, Typography } from '@mui/material'

const drawerWidth = 240
class Sidebar extends Component {
   constructor(props) {
      super(props)
      this.state = { drawerWidth: 240 }
   }
   render() {
      return (
         <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
               sx={{
                  width: drawerWidth,
                  // marginTop: '3px',
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
               <Box sx={{ paddingTop: 25 }}>
                  <Typography variant='h4'>
                     Search for Recipes within your Carb Range:
                  </Typography>
               </Box>
            </Drawer>
         </Box>
      )
   }
}

export default Sidebar

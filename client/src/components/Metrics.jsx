import React, { Component } from 'react'
import { CircularProgress } from '@mui/material'

class Home extends Component {
   constructor(props) {
      super(props)
   }
   render() {
      console.log('this.props in metrics component:', this.props)
      //this is edamame badge I need to include
      return (
         <div>
            <CircularProgress variant='determinate' value={75} />
         </div>
      )
   }
}

export default Home

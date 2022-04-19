import React, { Component } from 'react'

class Home extends Component {
   constructor(props) {
      super(props)
   }
   render() {
      //this is edamame badge I need to include
      return <div id={this.props.id}>this should work</div>
   }
}

export default Home

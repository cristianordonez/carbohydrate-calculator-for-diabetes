import React, { Component } from 'react'
import Sidebar from './Sidebar.jsx'
import Recipe from './Recipe.jsx'
class RecipeList extends Component {
   constructor(props) {
      super(props)
   }

   render() {
      //this component will show sidebar only at first, then will show recipe cards after a search
      return (
         <div>
            <Sidebar />
            <Recipe />
         </div>
      )
   }
}

export default RecipeList

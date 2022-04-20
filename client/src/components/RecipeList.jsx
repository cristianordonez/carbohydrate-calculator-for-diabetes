import React, { Component } from 'react'
import Sidebar from './Sidebar.jsx'
import Recipe from './Recipe.jsx'
import axios from 'axios'

class RecipeList extends Component {
   constructor(props) {
      super(props)
      this.state = { query: '', meal: '', hasSubmitError: false }
      this.handleSearch = this.handleSearch.bind(this)
      this.handleChildChange = this.handleChildChange.bind(this)
   }

   handleSearch() {
      console.log('this.state:', this.state)
      // let promise = axios.get('/recipes', this.state)

      promise.then((result) => {
         console.log('result:', result)
      })
   }

   handleChildChange(name, value) {
      console.log('name:', name)
      console.log('value:', value)
      this.setState({ [name]: value })
      console.log('this.stat:', this.state)
   }

   render() {
      const mealTypes = [
         { id: 1, label: 'Breakfast', name: 'meal' },
         { id: 2, label: 'Lunch', name: 'meal' },
         { id: 3, label: 'Dinner', name: 'meal' },
         { id: 4, label: 'Snack', name: 'meal' },
      ]
      //this component will show sidebar only at first, then will show recipe cards after a search
      return (
         <div>
            <Sidebar
               handleSearch={this.handleSearch}
               handleChildChange={this.handleChildChange}
               mealTypes={mealTypes}
            />
            <Recipe />
         </div>
      )
   }
}

export default RecipeList

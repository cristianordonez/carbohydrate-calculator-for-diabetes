import React, { Component } from 'react'
import Sidebar from './Sidebar.jsx'
import Recipe from './Recipe.jsx'
import axios from 'axios'
import { Grid } from '@mui/material'
class RecipeList extends Component {
   constructor(props) {
      super(props)
      this.state = { query: '', meal: '', recipes: [] }
      this.handleSearch = this.handleSearch.bind(this)
      this.handleChildChange = this.handleChildChange.bind(this)
      this.handleCardClick = this.handleCardClick.bind(this)
   }

   handleSearch() {
      let promise = axios.get('/recipes', { params: this.state })
      promise.then((result) => {
         console.log('result:', result)
         this.setState({ recipes: result.data.hits })
      })
   }

   handleChildChange(name, value) {
      console.log('name:', name)
      console.log('value:', value)
      this.setState({ [name]: value })
      console.log('this.stat:', this.state)
   }
   //todo allow user to only save one recipe per meal type
   handleCardClick(id, name) {
      let options = { recipe_id: id, recipe_name: name }
      let promise = axios.post('/recipes', options)
      promise.then((response) => {
         console.log('response:', response)
      })
   }

   render() {
      const mealTypes = [
         { id: 1, label: 'Breakfast', name: 'meal' },
         { id: 2, label: 'Lunch', name: 'meal' },
         { id: 3, label: 'Dinner', name: 'meal' },
         { id: 4, label: 'Snack', name: 'meal' },
      ]
      //this component will show sidebar only at first, then will show recipe cards after a search
      if (this.state.recipes.length > 0) {
         console.log(this.state.recipes[0])
         return (
            <div>
               <Sidebar
                  handleSearch={this.handleSearch}
                  handleChildChange={this.handleChildChange}
                  mealTypes={mealTypes}
               />
               <div style={{ padding: 40 }}>
                  <Grid container spacing={5}>
                     {this.state.recipes.map((recipe) => (
                        <Recipe
                           getId={recipe.recipe.uri}
                           key={recipe.recipe.label}
                           imageUrl={recipe.recipe.image}
                           name={recipe.recipe.label}
                           total_calories={recipe.recipe.calories}
                           total_CHO={
                              recipe.recipe.totalNutrients.CHOCDF.quantity
                           }
                           total_yield={recipe.recipe.yield}
                           shareLink={recipe.recipe.shareAs}
                           handleCardClick={this.handleCardClick}
                        />
                     ))}
                  </Grid>
               </div>
            </div>
         )
      } else {
         return (
            <div>
               <Sidebar
                  handleSearch={this.handleSearch}
                  handleChildChange={this.handleChildChange}
                  mealTypes={mealTypes}
               />
            </div>
         )
      }
   }
}

export default RecipeList

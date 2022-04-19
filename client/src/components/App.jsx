import React, { Component } from 'react'
import Home from './Home.jsx'
import { Switch, Route } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import MealPlan from './MealPlan.jsx'
import Recipe from './Recipe.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
const axios = require('axios')

class App extends Component {
   constructor(props) {
      super(props)
      this.state = { saveRecipe: 123 }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }
   handleChange(e) {
      this.setState({ [e.target.name]: e.target.value })
   }

   async handleSubmit() {
      let data = {
         recipe_id: '4caf01683bf99ddc7c08c35774aae54c',
         recipe_name: 'sdfsd',
      }
      let response = await axios.get('/test/mealplan')
      console.log('response:', response)
   }
   render() {
      return (
         <div>
            <Home id='edamam-badge' />
            <p>this is in App.jsx</p>

            <div>
               Home Page
               <form
                  onSubmit={(e) => {
                     e.preventDefault()
                     this.handleSubmit()
                  }}
               >
                  <div>
                     <label htmlFor='saveRecipe'>Enter username:</label>
                     <TextField
                        onChange={this.handleChange}
                        name='saveRecipe'
                        required
                        id='username'
                     />
                  </div>
                  <input type='submit' value='submit recipe' />
               </form>
            </div>
         </div>
      )
   }
}

export default App

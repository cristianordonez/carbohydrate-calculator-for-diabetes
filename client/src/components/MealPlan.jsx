import React, { Component } from 'react'
import Meal from './Meal.jsx'
import axios from 'axios'
import { Grid, Typography } from '@mui/material'

class MealPlan extends Component {
   constructor(props) {
      super(props)
      this.state = { breakfast: [], lunch: [], dinner: [], snack: [] }
   }

   async componentDidMount() {
      let promise = await axios.get('mealplan')
      console.log('promise:', promise)

      promise.data.forEach((recipe) => {
         console.log(recipe.recipe.mealType[0])
         if (
            recipe.recipe.mealType[0].includes('dinner') &&
            recipe.recipe.dishType[0] === 'main course'
         ) {
            this.setState((state) => {
               const dinner = state.dinner.concat(recipe)
               return {
                  dinner,
               }
            })
            console.log('this.state:', this.state)
            console.log('here in dinner block after set State')
         } else if (recipe.recipe.mealType[0].includes('breakfast')) {
            this.setState((state) => {
               const breakfast = state.breakfast.concat(recipe)
               return {
                  breakfast,
               }
            })
         } else if (recipe.recipe.mealType[0].includes('snack')) {
            this.setState((state) => {
               const snack = state.snack.concat(recipe)
               return {
                  snack,
               }
            })
         } else {
            this.setState((state) => {
               const lunch = state.lunch.concat(recipe)
               return {
                  lunch,
               }
            })
         }
      })
   }
   render() {
      return (
         <Grid sx={{ marginTop: 25 }}>
            <Typography variant='h3' color='text.secondary'>
               BreakFast
            </Typography>
            {this.state.breakfast.length > 0 &&
               this.state.breakfast.map((meal) => (
                  <Meal
                     key={meal.recipe.label}
                     imageUrl={meal.recipe.image}
                     shareLink={meal.recipe.shareAs}
                     name={meal.recipe.label}
                     total_calories={meal.recipe.calories}
                     total_CHO={meal.recipe.totalNutrients.CHOCDF.quantity}
                     total_yield={meal.recipe.yield}
                     ingredientLines={meal.recipe.ingredientLines}
                     protein={meal.recipe.totalNutrients.PROCNT.quantity}
                     fat={meal.recipe.totalNutrients.FAT.quantity}
                     fiber={meal.recipe.totalNutrients.FIBTG.quantity}
                  />
               ))}
            <Typography variant='h3' color='text.secondary'>
               Lunch
            </Typography>
            {this.state.lunch.length > 0 &&
               this.state.lunch.map((meal) => (
                  <Meal
                     key={meal.recipe.label}
                     imageUrl={meal.recipe.image}
                     shareLink={meal.recipe.shareAs}
                     name={meal.recipe.label}
                     total_calories={meal.recipe.calories}
                     total_CHO={meal.recipe.totalNutrients.CHOCDF.quantity}
                     total_yield={meal.recipe.yield}
                     ingredientLines={meal.recipe.ingredientLines}
                     protein={meal.recipe.totalNutrients.PROCNT.quantity}
                     fat={meal.recipe.totalNutrients.FAT.quantity}
                     fiber={meal.recipe.totalNutrients.FIBTG.quantity}
                  />
               ))}
            <Typography variant='h3' color='text.secondary'>
               Dinner
            </Typography>
            {this.state.dinner.length > 0 &&
               this.state.dinner.map((meal) => (
                  <Meal
                     key={meal.recipe.label}
                     imageUrl={meal.recipe.image}
                     shareLink={meal.recipe.shareAs}
                     name={meal.recipe.label}
                     total_calories={meal.recipe.calories}
                     total_CHO={meal.recipe.totalNutrients.CHOCDF.quantity}
                     total_yield={meal.recipe.yield}
                     ingredientLines={meal.recipe.ingredientLines}
                     protein={meal.recipe.totalNutrients.PROCNT.quantity}
                     fat={meal.recipe.totalNutrients.FAT.quantity}
                     fiber={meal.recipe.totalNutrients.FIBTG.quantity}
                  />
               ))}
            <Typography variant='h3' color='text.secondary'>
               Snack
            </Typography>
            {this.state.snack.length > 0 &&
               this.state.snack.map((meal) => (
                  <Meal
                     key={meal.recipe.label}
                     imageUrl={meal.recipe.image}
                     shareLink={meal.recipe.shareAs}
                     name={meal.recipe.label}
                     total_calories={meal.recipe.calories}
                     total_CHO={meal.recipe.totalNutrients.CHOCDF.quantity}
                     total_yield={meal.recipe.yield}
                     ingredientLines={meal.recipe.ingredientLines}
                     protein={meal.recipe.totalNutrients.PROCNT.quantity}
                     fat={meal.recipe.totalNutrients.FAT.quantity}
                     fiber={meal.recipe.totalNutrients.FIBTG.quantity}
                  />
               ))}
         </Grid>
      )
   }
}

export default MealPlan

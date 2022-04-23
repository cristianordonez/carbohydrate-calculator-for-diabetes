import React, { Component } from 'react';
import Meal from './Meal.jsx';
import Nav from './Nav.jsx';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

class MealPlan extends Component {
   constructor(props) {
      super(props);
      this.state = {
         breakfast: [],
         lunch: [],
         dinner: [],
         snack: [],
         user: '',
      };
      this.handleChildDelete = this.handleChildDelete.bind(this);
   }

   async componentDidMount() {
      let promise = await axios.get('http://localhost:8080/api/mealplan');
      this.setState({ user: promise.data.username });
      promise.data.recipes.forEach((recipe) => {
         if (
            recipe.recipe.mealType[0].includes('dinner') &&
            recipe.recipe.dishType[0] === 'main course'
         ) {
            this.setState((state) => {
               const dinner = state.dinner.concat(recipe);
               return {
                  dinner,
               };
            });
         } else if (recipe.recipe.mealType[0].includes('breakfast')) {
            this.setState((state) => {
               const breakfast = state.breakfast.concat(recipe);
               return {
                  breakfast,
               };
            });
         } else if (recipe.recipe.mealType[0].includes('snack')) {
            this.setState((state) => {
               const snack = state.snack.concat(recipe);
               return {
                  snack,
               };
            });
         } else {
            this.setState((state) => {
               const lunch = state.lunch.concat(recipe);
               return {
                  lunch,
               };
            });
         }
      });
   }

   handleChildDelete(id) {
      console.log('id in meal plan parent component:', id);
      let body = {};
      body.recipe_id = id;
      let promise = axios.post('api/mealplan', body);
      promise.then((response) => {
         console.log('response:', response);
         window.location.reload();
      });
   }
   render() {
      return (
         <>
            <Nav />
            <Grid sx={{ padding: 15 }}>
               <Typography variant='h2'>Saved Recipes</Typography>
               <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
               >
                  <Grid item xs={6}>
                     <Typography variant='h4'>Breakfast</Typography>
                     {this.state.breakfast.length > 0 &&
                        this.state.breakfast.map((meal) => (
                           <Meal
                              key={meal.recipe.label}
                              id={meal.recipe.uri.slice(
                                 meal.recipe.uri.indexOf('_') + 1,
                                 meal.recipe.uri.length
                              )}
                              imageUrl={meal.recipe.images.REGULAR.url}
                              shareLink={meal.recipe.shareAs}
                              name={meal.recipe.label}
                              total_calories={meal.recipe.calories}
                              total_CHO={
                                 meal.recipe.totalNutrients.CHOCDF.quantity
                              }
                              total_yield={meal.recipe.yield}
                              ingredientLines={meal.recipe.ingredientLines}
                              protein={
                                 meal.recipe.totalNutrients.PROCNT.quantity
                              }
                              fat={meal.recipe.totalNutrients.FAT.quantity}
                              fiber={meal.recipe.totalNutrients.FIBTG.quantity}
                              handleChildDelete={this.handleChildDelete}
                           />
                        ))}
                     {this.state.breakfast.length === 0 && (
                        <Typography variant='h6' color='text.secondary'>
                           {' '}
                           No breakfasts saved
                        </Typography>
                     )}
                  </Grid>
                  <Grid item xs={6}>
                     <Typography variant='h4'>Lunch</Typography>
                     {this.state.lunch.length > 0 &&
                        this.state.lunch.map((meal) => (
                           <Meal
                              key={meal.recipe.label}
                              imageUrl={meal.recipe.images.REGULAR.url}
                              shareLink={meal.recipe.shareAs}
                              name={meal.recipe.label}
                              total_calories={meal.recipe.calories}
                              total_CHO={
                                 meal.recipe.totalNutrients.CHOCDF.quantity
                              }
                              total_yield={meal.recipe.yield}
                              ingredientLines={meal.recipe.ingredientLines}
                              protein={
                                 meal.recipe.totalNutrients.PROCNT.quantity
                              }
                              fat={meal.recipe.totalNutrients.FAT.quantity}
                              fiber={meal.recipe.totalNutrients.FIBTG.quantity}
                              handleChildDelete={this.handleChildDelete}
                           />
                        ))}
                     {this.state.lunch.length === 0 && (
                        <Typography variant='h6' color='text.secondary'>
                           {' '}
                           No lunches saved
                        </Typography>
                     )}
                  </Grid>
                  <Grid item xs={6}>
                     <Typography variant='h4'>Dinner</Typography>
                     {this.state.dinner.length > 0 &&
                        this.state.dinner.map((meal) => (
                           <Meal
                              key={meal.recipe.label}
                              id={meal.recipe.uri.slice(
                                 meal.recipe.uri.indexOf('_') + 1,
                                 meal.recipe.uri.length
                              )}
                              imageUrl={meal.recipe.images.REGULAR.url}
                              shareLink={meal.recipe.shareAs}
                              name={meal.recipe.label}
                              total_calories={meal.recipe.calories}
                              total_CHO={
                                 meal.recipe.totalNutrients.CHOCDF.quantity
                              }
                              total_yield={meal.recipe.yield}
                              ingredientLines={meal.recipe.ingredientLines}
                              protein={
                                 meal.recipe.totalNutrients.PROCNT.quantity
                              }
                              fat={meal.recipe.totalNutrients.FAT.quantity}
                              fiber={meal.recipe.totalNutrients.FIBTG.quantity}
                              handleChildDelete={this.handleChildDelete}
                           />
                        ))}
                     {this.state.dinner.length === 0 && (
                        <Typography variant='h6' color='text.secondary'>
                           {' '}
                           No dinners saved
                        </Typography>
                     )}
                  </Grid>
                  <Grid item xs={6}>
                     <Typography variant='h4'>Snack</Typography>
                     {this.state.snack.length > 0 &&
                        this.state.snack.map((meal) => (
                           <Meal
                              key={meal.recipe.label}
                              imageUrl={meal.recipe.images.REGULAR.url}
                              shareLink={meal.recipe.shareAs}
                              name={meal.recipe.label}
                              total_calories={meal.recipe.calories}
                              total_CHO={
                                 meal.recipe.totalNutrients.CHOCDF.quantity
                              }
                              total_yield={meal.recipe.yield}
                              ingredientLines={meal.recipe.ingredientLines}
                              protein={
                                 meal.recipe.totalNutrients.PROCNT.quantity
                              }
                              fat={meal.recipe.totalNutrients.FAT.quantity}
                              fiber={meal.recipe.totalNutrients.FIBTG.quantity}
                              handleChildDelete={this.handleChildDelete}
                           />
                        ))}
                     {this.state.snack.length === 0 && (
                        <Typography variant='h6' color='text.secondary'>
                           {' '}
                           No snacks saved
                        </Typography>
                     )}
                  </Grid>
               </Grid>
            </Grid>
         </>
      );
   }
}

export default MealPlan;

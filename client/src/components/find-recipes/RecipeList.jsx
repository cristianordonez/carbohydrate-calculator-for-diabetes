import React, { Component } from 'react';
import Sidebar from './Sidebar.jsx';
import Nav from '../navigation/Nav.jsx';
import Recipe from './Recipe.jsx';
import axios from 'axios';
import {
   Grid,
   Typography,
   Snackbar,
   Alert,
   Box,
   CircularProgress,
} from '@mui/material';
class RecipeList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         query: '',
         meal: '',
         recipes: [],
         calPerMeal: null,
         carbsPerMeal: null,
         open: false,
         isLoading: false,
         childSaved: false,
         hasErrorOnSave: false,
         //refactor to get response from server for save haserroronsaveresponse
         hasErrorOnSaveResponse: '',
         hasErrorOnSearch: false,
         hasErrorOnSearchResponse: '',
      };
      this.handleSearch = this.handleSearch.bind(this);
      this.handleChildChange = this.handleChildChange.bind(this);
      this.handleCardClick = this.handleCardClick.bind(this);
      this.handleChildSave = this.handleChildSave.bind(this);
   }

   //* handles sending request to server to fetch recipes from db
   handleSearch() {
      this.setState({ isLoading: true });
      let options = { query: this.state.query, meal: this.state.meal };
      let self = this;
      axios
         .get('http://localhost:8080/api/recipes', {
            params: options,
         })
         .then((result) => {
            let data = result.data;
            this.setState({
               recipes: data.body,
               calPerMeal: data.calPerMeal,
               carbsPerMeal: data.carbsPerMeal,
               open: true,
               isLoading: false,
               childSaved: false,
            });
         })
         .catch(function (err) {
            if (err.response) {
               //request was made and server responds with status code
               console.log('error.response.data:', err.response.data);
               console.log('this:', this);
               self.setState({
                  hasErrorOnSearch: true,
                  hasErrorOnSearchResponse: err.response.data,
                  isLoading: false,
                  open: true,
               });
            } else if (err.request) {
               //request was made but no response was received
               console.log('err.request:', err.request);
            } else {
               //something else happended that triggered an error
               console.log('err.message:', err.message);
            }
         });
   }

   //* handles opening alert when card is clicked to be saved
   handleChildSave() {
      this.setState({ childSaved: !this.state.childSaved });
   }

   //* handles getting values from textfields
   handleChildChange(name, value) {
      this.setState({ [name]: value });
   }

   //* handles saving recipes to database
   handleCardClick(id, name, type) {
      let options = {
         recipe_id: id,
         recipe_name: name,
         meal_type: this.state.meal.toLowerCase(),
      };
      let promise = axios.post('http://localhost:8080/api/recipes', options);
      promise.then((response) => {
         console.log('recipe has been saved to db');
      });
      //if error, change state to display different message alert
      promise.catch((err) => {
         this.setState({ hasErrorOnSave: true });
      });
   }

   render() {
      const mealTypes = [
         { id: 1, label: 'Breakfast', name: 'meal' },
         { id: 2, label: 'Lunch', name: 'meal' },
         { id: 3, label: 'Dinner', name: 'meal' },
         { id: 4, label: 'Snack', name: 'meal' },
      ];
      //this component will show sidebar only at first, then will show recipe cards after a search
      return (
         <>
            <Nav />
            <Sidebar
               handleSearch={this.handleSearch}
               handleChildChange={this.handleChildChange}
               mealTypes={mealTypes}
            />
            {this.state.isLoading && (
               <Box sx={{ display: 'flex', paddingLeft: 50, paddingTop: 15 }}>
                  <CircularProgress size={200} />
               </Box>
            )}
            {!this.state.hasErrorOnSearch && (
               <Snackbar
                  open={this.state.open}
                  onClick={() => {
                     this.setState({ open: false });
                  }}
                  autoHideDuration={10000}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  onClose={() => {
                     this.setState({ open: false });
                  }}
               >
                  <Alert severity='success' sx={{ width: '100%' }}>
                     Success! All recipes have between{' '}
                     {Math.round(this.state.calPerMeal + 150)}
                     {Math.round(this.state.calPerMeal - 150)} - Kcal per recipe
                     and {Math.round(this.state.carbsPerMeal - 10)} -
                     {Math.round(this.state.carbsPerMeal + 10)} Carbs per recipe
                  </Alert>
               </Snackbar>
            )}
            {this.state.hasErrorOnSearch && (
               <Snackbar
                  open={this.state.open}
                  onClick={() => {
                     this.setState({ open: false });
                  }}
                  autoHideDuration={10000}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  onClose={() => {
                     this.setState({ open: false });
                  }}
               >
                  <Alert severity='error' sx={{ width: '100%' }}>
                     {this.state.hasErrorOnSearchResponse}
                  </Alert>
               </Snackbar>
            )}
            <Grid
               container
               spacing={1}
               sx={{
                  height: '100%',
                  width: '100%',
                  paddingLeft: 50,
                  paddingTop: 5,
               }}
            >
               {this.state.recipes.length > 0 &&
                  this.state.recipes.map((recipe, index) => (
                     <Grid sx={{ margin: 0, padding: 0 }} item key={index}>
                        <Recipe
                           getId={recipe.recipe.uri}
                           hasSaveError={this.state.hasErrorOnSave}
                           meal_type={recipe.recipe.mealType[0]}
                           key={recipe.recipe.label}
                           imageUrl={recipe.recipe.images.REGULAR.url}
                           name={recipe.recipe.label}
                           total_calories={recipe.recipe.calories}
                           total_CHO={
                              recipe.recipe.totalNutrients.CHOCDF.quantity
                           }
                           total_yield={recipe.recipe.yield}
                           shareLink={recipe.recipe.shareAs}
                           handleCardClick={this.handleCardClick}
                           handleChildSave={this.handleChildSave}
                           isSaved={this.state.childSaved}
                        />
                     </Grid>
                  ))}
            </Grid>
         </>
      );
   }
}

export default RecipeList;

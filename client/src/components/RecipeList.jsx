import React, { Component } from 'react';
import Sidebar from './Sidebar.jsx';
import Nav from './Nav.jsx';
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
      total_calories: null,
      total_CHO: null,
      open: false,
      isLoading: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChildChange = this.handleChildChange.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleSearch() {
    this.setState({ isLoading: true });
    let options = { query: this.state.query, meal: this.state.meal };
    let promise = axios.get('/recipes', { params: options });
    promise.then((result) => {
      let data = result.data;
      console.log('data:', data);
      this.setState({
        recipes: data.body.hits,
        total_calories: data.metrics.total_calories,
        total_CHO: data.metrics.total_CHO,
        open: true,
        isLoading: false,
      });
    });
  }

  handleChildChange(name, value) {
    this.setState({ [name]: value });
  }
  //todo allow user to only save one recipe per meal type
  handleCardClick(id, name, type) {
    let options = {
      recipe_id: id,
      recipe_name: name,
      meal_type: this.state.meal.toLowerCase(),
    };
    let promise = axios.post('/recipes', options);
    promise.then((response) => {
      console.log('response:', response);
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
        {this.state.total_calories && this.state.total_CHO && (
          <Grid sx={{ paddingLeft: 50, paddingTop: 15 }}>
            <Snackbar
              open={this.state.open}
              autoHideDuration={8000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={() => {
                this.setState({ open: false });
              }}
            >
              <Alert severity='success' sx={{ width: '100%' }}>
                Success! All recipes have between{' '}
                {Math.round(this.state.total_calories / 7) * 2 - 150} -
                {Math.round(this.state.total_calories / 7) * 2 + 150} Kcal per
                recipe and {Math.round(this.state.total_CHO / 7) * 2 - 10}-
                {Math.round(this.state.total_CHO / 7) * 2 + 10} Carbs per recipe
              </Alert>
            </Snackbar>
          </Grid>
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
                  meal_type={recipe.recipe.mealType[0]}
                  key={recipe.recipe.label}
                  imageUrl={recipe.recipe.images.REGULAR.url}
                  name={recipe.recipe.label}
                  total_calories={recipe.recipe.calories}
                  total_CHO={recipe.recipe.totalNutrients.CHOCDF.quantity}
                  total_yield={recipe.recipe.yield}
                  shareLink={recipe.recipe.shareAs}
                  handleCardClick={this.handleCardClick}
                />
              </Grid>
            ))}
        </Grid>
      </>
    );
  }
}

export default RecipeList;

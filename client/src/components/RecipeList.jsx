import React, { Component } from 'react';
import Sidebar from './Sidebar.jsx';
import Nav from './Nav.jsx';
import Recipe from './Recipe.jsx';
import axios from 'axios';
import { Grid } from '@mui/material';
class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '', meal: '', recipes: [] };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChildChange = this.handleChildChange.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleSearch() {
    let options = { query: this.state.query, meal: this.state.meal };
    let promise = axios.get('/recipes', { params: options });
    promise.then((result) => {
      this.setState({ recipes: result.data.hits });
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
    if (this.state.recipes.length > 0) {
      return (
        <>
          <Nav />
          <Sidebar
            handleSearch={this.handleSearch}
            handleChildChange={this.handleChildChange}
            mealTypes={mealTypes}
          />
          <Grid
            container
            spacing={0.5}
            sx={{
              height: '100%',
              width: '100%',
              paddingLeft: 50,
              paddingTop: 25,
            }}
          >
            {this.state.recipes.map((recipe, index) => (
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
    } else {
      return (
        <>
          <Nav />
          <div>
            <Sidebar
              handleSearch={this.handleSearch}
              handleChildChange={this.handleChildChange}
              mealTypes={mealTypes}
            />
          </div>
        </>
      );
    }
  }
}

export default RecipeList;

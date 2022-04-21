import React from 'react';
import App from './components/App.jsx';
import MealPlan from './components/MealPlan.jsx';
import RecipeList from './components/RecipeList.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Nav from './components/Nav.jsx';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

//todo handle conditional rendering of login logout button
const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);
root.render(
   <HashRouter>
      {/* <Nav id='edamam-badge' /> */}
      <Routes>
         <Route path='/' element={<Login />}></Route>
         <Route path='/home' element={<App />}></Route>
         <Route path='/signup' element={<Signup />}></Route>
         <Route path='/recipe' element={<RecipeList />}></Route>
         <Route path='/mealplan' element={<MealPlan />}></Route>
      </Routes>
   </HashRouter>
);

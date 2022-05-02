import React from 'react';
import App from './components/home/App.jsx';
import MealPlan from './components/your-meals/MealPlan.jsx';
import RecipeList from './components/find-recipes/RecipeList.jsx';
import Login from './components/landing-login-page/Login.jsx';
import Signup from './components/landing-login-page/Signup.jsx';
import Nav from './components/navigation/Nav.jsx';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
   typography: {
      fontFamily: ['Plus Jakarta Sans', 'sans-serif'].join(','),
   },
   palette: {
      logout: createColor('#white'),
   },
});

//todo handle conditional rendering of login logout button
const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);
root.render(
   <HashRouter>
      <ThemeProvider theme={theme}>
         <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/home' element={<App />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/recipe' element={<RecipeList />}></Route>
            <Route path='/mealplan' element={<MealPlan />}></Route>
         </Routes>
      </ThemeProvider>
   </HashRouter>
);

import React from 'react'
import App from './components/App.jsx'
import MealPlan from './components/MealPlan.jsx'
import Recipe from './components/Recipe.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import * as ReactDOMClient from 'react-dom/client'
import { HashRouter, Routes, Route, Switch } from 'react-router-dom'

const container = document.getElementById('app')
const root = ReactDOMClient.createRoot(container)
root.render(
   <HashRouter>
      <Routes>
         <Route path='/' element={<App />}></Route>
         <Route path='/login' element={<Login />}></Route>
         <Route path='signup' element={<Signup />}></Route>
         <Route path='recipe' element={<Recipe />}></Route>
         <Route path='mealplan' element={<MealPlan />}></Route>
      </Routes>
   </HashRouter>
)

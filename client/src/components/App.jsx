import React, { Component } from 'react'
import Home from './Home.jsx'
import { Switch, Route } from 'react-router-dom'
import MealPlan from './MealPlan.jsx'
import Recipe from './Recipe.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Home id='edamam-badge' />
                <p>this is in App.jsx</p>
            </div>
        )
    }
}

export default App

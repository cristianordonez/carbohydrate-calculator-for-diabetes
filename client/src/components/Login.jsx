import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
const axios = require('axios')
class Login extends Component {
   constructor(props) {
      super(props)
      this.state = {
         username: '',
         password: '',
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }
   handleChange(e) {
      this.setState({ [e.target.name]: e.target.value })
   }
   async handleSubmit() {
      console.log('this.stste:', this.state)
      let response = await axios.post('/login', this.state)
      console.log('response:', response)
   }
   render() {
      return (
         <div>
            Login
            <form
               onSubmit={(e) => {
                  e.preventDefault()
                  this.handleSubmit()
               }}
            >
               <div>
                  <label htmlFor='username'>Enter username:</label>
                  <TextField
                     onChange={this.handleChange}
                     name='username'
                     required
                     id='username'
                  />
               </div>
               <div>
                  <label htmlFor='password'>Enter password:</label>
                  <TextField
                     onChange={this.handleChange}
                     name='password'
                     required
                     id='password'
                  />
               </div>
               <input type='submit' value='Login' />
            </form>
            <p>
               Don't have an account yet? <Link to='/signup'>Signup</Link>
            </p>
         </div>
      )
   }
}

export default Login

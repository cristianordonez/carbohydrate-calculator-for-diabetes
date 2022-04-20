import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
const axios = require('axios')
class Login extends Component {
   constructor(props) {
      super(props)
      this.state = {
         username: '',
         password: '',
         redirect: false,
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
      if (response) {
         this.setState({ redirect: true })
      } else {
         this.setState({ redirect: false })
      }
   }
   render() {
      if (this.state.redirect) {
         return <Navigate replace to='/' />
      } else {
         return (
            <div style={{ marginTop: 65 }}>
               Login
               <form
                  onSubmit={(e) => {
                     e.preventDefault()
                     this.handleSubmit()
                  }}
               >
                  <div>
                     <TextField
                        onChange={this.handleChange}
                        name='username'
                        required
                        id='username'
                        label='Enter username'
                     />
                  </div>
                  <div>
                     <TextField
                        onChange={this.handleChange}
                        name='password'
                        required
                        label='Enter Password'
                        type='password'
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
}

export default Login

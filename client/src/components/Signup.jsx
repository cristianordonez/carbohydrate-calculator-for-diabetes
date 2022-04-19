import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
const axios = require('axios')
class Signup extends Component {
   constructor(props) {
      super(props)
      this.state = {
         username: '',
         password: '',
         confirmPassword: '',
         error: false,
         helperText: '',
         shouldRedirect: false,
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }
   handleChange(e) {
      this.setState({ [e.target.name]: e.target.value })
   }
   handleSubmit() {
      //check if password and confirmed are equal

      if (this.state.password !== this.state.confirmPassword) {
         this.setState({ error: true, helperText: 'Passwords do not match' })
      } else if (this.state.password.length < 5) {
         this.setState({ error: true, helperText: 'Password is too short' })
      } else {
         this.setState({ error: false })
         axios
            .post('/signup', {
               username: this.state.username,
               password: this.state.password,
            })
            .then((response) => {
               this.setState({ shouldRedirect: true })
            })
            .catch((err) => {
               console.log('err:', err)
            })
      }
   }

   render() {
      if (this.state.shouldRedirect) {
         return <Navigate replace to='/login' />
      } else {
         return (
            <div>
               SIGNUP
               <form
                  onSubmit={(e) => {
                     e.preventDefault()
                     this.handleSubmit()
                  }}
               >
                  <div>
                     <label htmlFor='username'>Enter username:</label>
                     <input
                        onChange={this.handleChange}
                        type='text'
                        name='username'
                        required
                        id='username'
                     />
                  </div>
                  <div>
                     <label htmlFor='password'>Enter password:</label>

                     <TextField
                        // defaultValue='hello world'

                        onChange={this.handleChange}
                        name='password'
                        required
                        id='password'
                     />
                     <label htmlFor='confirmPassword'>Confirm password:</label>

                     <TextField
                        // defaultValue='hello world'
                        error={this.state.error}
                        helperText={this.state.helperText}
                        onChange={this.handleChange}
                        name='confirmPassword'
                        required
                        id='confirmPassword'
                     />
                  </div>
                  <input
                     type='submit'
                     value='Create account'
                     // onClick={this.handleSubmit}
                  />
               </form>
               <p>
                  Have an account already? <Link to='/login'>Login</Link>
               </p>
            </div>
         )
      }
   }
}

export default Signup

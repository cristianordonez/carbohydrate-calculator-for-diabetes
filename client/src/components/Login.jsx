import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { TextField, Snackbar, Alert, CssBaseline } from '@mui/material';
import axios from 'axios';
class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         redirect: false,
         open: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
   }
   async handleSubmit() {
      try {
         let response = await axios.post('/login', this.state);
         this.setState({ redirect: true });
      } catch (err) {
         console.log('err:', err);
         this.setState({ redirect: false, open: true });
      }
   }

   render() {
      if (this.state.redirect) {
         return <Navigate replace to='/home' />;
      } else {
         return (
            <div style={{ marginTop: 75 }}>
               <CssBaseline />
               Login
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     this.handleSubmit();
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
               <Snackbar
                  open={this.state.open}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  autoHideDuration={4000}
                  onClose={() => {
                     this.setState({ open: false });
                  }}
               >
                  <Alert
                     onClose={this.state.handleClose}
                     severity='error'
                     sx={{ width: '100%' }}
                  >
                     Incorrect Username or Password
                  </Alert>
               </Snackbar>
               <p>
                  Don't have an account yet? <Link to='/signup'>Signup</Link>
               </p>
            </div>
         );
      }
   }
}

export default Login;

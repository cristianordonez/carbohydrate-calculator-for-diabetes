import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import {
   TextField,
   Paper,
   Grid,
   Avatar,
   Button,
   Snackbar,
   Alert,
   Typography,
   Link,
   Box,
   CssBaseline,
} from '@mui/material';
import axios from 'axios';
import LockOpenIcon from '@mui/icons-material/LockOpen';
class Signup extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         confirmPassword: '',
         error: false,
         helperText: '',
         shouldRedirect: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
   }
   handleSubmit() {
      //check if password and confirmed are equal

      if (this.state.password !== this.state.confirmPassword) {
         this.setState({ error: true, helperText: 'Passwords do not match' });
      } else if (this.state.password.length < 5) {
         this.setState({ error: true, helperText: 'Password is too short' });
      } else {
         this.setState({ error: false });
         axios
            .post('/signup', {
               username: this.state.username,
               password: this.state.password,
            })
            .then((response) => {
               this.setState({ shouldRedirect: true });
            })
            .catch((err) => {
               throw new Error(err);
            });
      }
   }

   render() {
      const paperStyle = {
         padding: 20,
         height: '50vh',
         width: 500,
         margin: '20px auto',
      };
      const badgeStyle = {
         display: 'none',
      };
      const avatarStyle = {
         backgroundColor: '#3E82FF',
      };
      const inputStyle = {
         margin: '10px 0',
      };
      const infoStyle = {
         //  height: '50vh',
         width: '50vh',
      };
      if (this.state.shouldRedirect) {
         return <Navigate replace to='/' />;
      } else {
         return (
            <Box
               sx={{
                  display: 'flex',
                  padding: '150',
                  backgroundColor: '#3E82FF',
                  height: '100vh',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               <Grid
                  container
                  align='center'
                  direction='column'
                  justifyContent='center'
                  sx={{ width: '50vw' }}
               >
                  <Paper elevation={24} style={paperStyle}>
                     <CssBaseline />
                     <Grid align='center'>
                        <Avatar style={avatarStyle}>
                           <LockOpenIcon />
                        </Avatar>
                        <Typography variant='h5'>Sign up</Typography>
                     </Grid>

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
                              label='Username'
                              placeholder='Enter username'
                              fullWidth
                              style={inputStyle}
                           />
                        </div>
                        <div>
                           <TextField
                              onChange={this.handleChange}
                              name='password'
                              required
                              label='Password'
                              placeholder='Enter password'
                              type='password'
                              fullWidth
                              style={inputStyle}
                           />
                        </div>
                        <TextField
                           error={this.state.error}
                           helperText={this.state.helperText}
                           onChange={this.handleChange}
                           name='confirmPassword'
                           required
                           type='password'
                           label='Confirm Password'
                           fullWidth
                           placeholder='Confirm password'
                        />
                        <Button
                           style={inputStyle}
                           variant='contained'
                           type='submit'
                           fullWidth
                        >
                           Signup
                        </Button>
                        <Snackbar
                           open={this.state.open}
                           anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                           }}
                           autoHideDuration={4000}
                           onClose={() => {
                              this.setState({ open: false });
                           }}
                        >
                           <Alert severity='error' sx={{ width: '100%' }}>
                              Incorrect Username or Password
                           </Alert>
                        </Snackbar>
                        <Typography sx={{ marginTop: 'auto' }}>
                           Have an account already?
                           <Link href='/'>Login</Link>
                        </Typography>
                     </form>
                     <div id='edamam-badge' style={badgeStyle}></div>
                     <Snackbar
                        open={this.state.open}
                        anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        autoHideDuration={4000}
                        onClose={() => {
                           this.setState({ open: false });
                        }}
                     >
                        <Alert severity='error' sx={{ width: '50%' }}>
                           Incorrect Username or Password
                        </Alert>
                     </Snackbar>
                  </Paper>
               </Grid>
            </Box>
         );
      }
   }
}

export default Signup;

import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import {
   TextField,
   Snackbar,
   Alert,
   CssBaseline,
   Typography,
   Grid,
   Paper,
   Avatar,
   Button,
   Link,
   Box,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import landingPageImg from '../../img/background.svg';
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
         let { username, password } = this.state;
         let response = await axios.get('/api/login', {
            params: {
               username,
               password,
            },
         });
         this.setState({ redirect: true });
      } catch (err) {
         //if user is not authenticated, response will go to catch block and redirect will be set to false
         this.setState({ redirect: false, open: true });
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
         backgroundColor: '#003BA7',
      };
      const inputStyle = {
         margin: '10px 0',
      };
      const infoStyle = {
         width: '50vh',
      };
      if (this.state.redirect) {
         return <Navigate replace to='/home' />;
      } else {
         return (
            <Box
               sx={{
                  display: 'flex',
                  padding: '0px',

                  height: '100vh',
               }}
            >
               <Grid
                  align='center'
                  sx={{
                     margin: '0',
                     padding: '20px',
                     backgroundColor: '#003BA7',
                     color: '#E8E6E3',
                  }}
               >
                  <Box
                     sx={{
                        display: 'flex-column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 auto',
                     }}
                  >
                     <Typography variant='h1'>
                        Recipe Nutrition Calculator
                     </Typography>

                     <Box
                        sx={{
                           padding: '0 auto',
                           width: '50vw',
                           margin: 'auto',
                        }}
                     >
                        <Typography
                           align='left'
                           variant='body1'
                           sx={{ padding: '0 10vw' }}
                        >
                           {' '}
                           Get personalized carbohydrate recommendations based
                           on height, weight, age, gender, and activity level,
                           then find recipes with the foods of your choice that
                           matches these recommendations.
                        </Typography>
                     </Box>
                  </Box>
                  <img src={landingPageImg}></img>
               </Grid>
               <Grid
                  container
                  align='center'
                  direction='column'
                  justifyContent='center'
                  sx={{ width: '50vw' }}
               >
                  <Paper elevation={10} style={paperStyle}>
                     <CssBaseline />
                     <Grid align='center'>
                        <Avatar style={avatarStyle}>
                           <LockIcon />
                        </Avatar>
                        <Typography variant='h5'>Log In</Typography>
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
                        <Button
                           style={inputStyle}
                           variant='contained'
                           type='submit'
                           fullWidth
                        >
                           Login
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
                           Don't have an account?
                           <Link href='/#/signup'>Sign up</Link>
                        </Typography>
                     </form>
                     <div id='edamam-badge' style={badgeStyle}></div>
                  </Paper>
               </Grid>
            </Box>
         );
      }
   }
}

export default Login;

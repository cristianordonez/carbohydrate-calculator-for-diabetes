import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
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

const Login = () => {
   const location = useLocation();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [redirect, setRedirect] = useState(false);
   const [open, setOpen] = useState(false);
   const [message, showMessage] = useState(false);
   //handles showing alert if user has been redirected from logout button
   useEffect(() => {
      if (location.state) {
         showMessage(true);
      }
   }, []);
   const handleChange = (e) => {
      if (e.target.name === 'password') {
         setPassword(e.target.value);
      } else if (e.target.name === 'username') {
         setUsername(e.target.value);
      }
   };
   const handleClose = () => {
      showMessage(false);
   };
   const handleSubmit = async () => {
      try {
         let response = await axios.get('/api/login', {
            params: {
               username,
               password,
            },
         });
         setRedirect(true);
      } catch (err) {
         //if user is not authenticated, response will go to catch block and redirect will be set to false
         setRedirect(false);
         setOpen(true);
      }
   };

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
   if (redirect) {
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
                     Diabetes Recipe Nutrition Calculator
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
                        Get personalized carbohydrate recommendations based on
                        height, weight, age, gender, and activity level, then
                        find recipes with the foods of your choice that matches
                        these recommendations.
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
                        handleSubmit();
                     }}
                  >
                     <div>
                        <TextField
                           onChange={handleChange}
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
                           onChange={handleChange}
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
                        open={open}
                        anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        autoHideDuration={4000}
                        onClose={() => {
                           setOpen(false);
                        }}
                     >
                        <Alert severity='error' sx={{ width: '100%' }}>
                           Incorrect username or password.
                        </Alert>
                     </Snackbar>
                     <Snackbar
                        open={message}
                        anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        autoHideDuration={4000}
                        onClose={() => {
                           handleClose();
                        }}
                     >
                        <Alert severity='success' sx={{ width: '100%' }}>
                           You have been logged out successfully.
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
};

export default Login;

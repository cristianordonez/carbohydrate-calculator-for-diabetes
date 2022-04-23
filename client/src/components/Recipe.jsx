import * as React from 'react';
import {
   Card,
   CardContent,
   CardMedia,
   Typography,
   Button,
   CardActionArea,
   CardActions,
   CssBaseline,
   Paper,
   Grid,
   Tooltip,
   Snackbar,
   Alert,
} from '@mui/material';

//recipe id will be inside the recipe uri
function Recipe({
   getId,
   imageUrl,
   name,
   total_calories,
   total_CHO,
   total_yield,
   shareLink,
   handleCardClick,
   meal_type,
   handleChildSave,
   isSaved,
}) {
   const handleClick = () => {
      handleSave();
      let recipe_id = getId.slice(getId.indexOf('_') + 1, getId.length);
      handleCardClick(recipe_id, name, meal_type);
   };
   const handleSave = () => {
      handleChildSave();
   };
   return (
      <>
         <CssBaseline />
         <Card sx={{ maxWidth: 345, minWidth: 150, margin: 0, maxHeight: 450 }}>
            <Paper elevation={24} sx={{ width: '100%', height: '100%' }}>
               <Tooltip title='Click to save recipe' placement='top-end' arrow>
                  <CardActionArea onClick={handleClick}>
                     <CardMedia
                        component='img'
                        height='194'
                        image={imageUrl}
                        alt=''
                     />
                     <CardContent>
                        <Typography gutterBottom variant='h6' component='div'>
                           {name}
                        </Typography>
                        <Typography component='div'>
                           {`Total Servings: ${total_yield}`}
                        </Typography>
                        <Grid
                           container
                           alignItems='center'
                           direction='column'
                           justifyContent='center'
                        >
                           <Typography
                              sx={{ textDecoration: 'underline' }}
                              variant='subtitle1'
                              color='text.secondary'
                           >
                              Kcal/Nutrients Per Serving
                           </Typography>
                           <Typography
                              variant='subtitle2'
                              color='text.secondary'
                           >
                              {`Total Calories Per Serving: ${Math.floor(
                                 total_calories / total_yield
                              )}`}
                           </Typography>
                           <Typography
                              variant='subtitle2'
                              color='text.secondary'
                           >
                              {`Total Carbohydrates Per Serving: ${Math.floor(
                                 total_CHO / total_yield
                              )}`}
                           </Typography>
                        </Grid>
                     </CardContent>
                     <Snackbar
                        open={isSaved}
                        autoHideDuration={4000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        onClose={() => {
                           handleSave();
                        }}
                     >
                        <Alert severity='info' sx={{ width: '100%' }}>
                           Recipe saved! Go to Your Meals to view saved recipes.
                        </Alert>
                     </Snackbar>
                  </CardActionArea>
               </Tooltip>
               <CardActions>
                  <Button
                     size='small'
                     color='primary'
                     href={shareLink}
                     target='_blank'
                  >
                     See Entire Recipe
                  </Button>
               </CardActions>
            </Paper>
         </Card>
      </>
   );
}

export default Recipe;

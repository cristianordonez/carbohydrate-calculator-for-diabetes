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
}) {
   console.log('shareLink:', shareLink);
   const handleClick = () => {
      let recipe_id = getId.slice(getId.indexOf('_') + 1, getId.length);
      handleCardClick(recipe_id, name, meal_type);
   };
   return (
      <Card sx={{ maxWidth: 345, margin: 5 }}>
         <Paper elevation={3}>
            <CssBaseline />
            <CardActionArea onClick={handleClick}>
               <CardMedia
                  component='img'
                  height='140'
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
                     ></Typography>
                     <Typography variant='subtitle2' color='text.secondary'>
                        {`Total Calories Per Serving: ${Math.floor(
                           total_calories / total_yield
                        )}`}
                     </Typography>
                     <Typography variant='subtitle2' color='text.secondary'>
                        {`Total Carbohydrates Per Serving: ${Math.floor(
                           total_CHO / total_yield
                        )}`}
                     </Typography>
                  </Grid>
               </CardContent>
            </CardActionArea>
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
   );
}

export default Recipe;

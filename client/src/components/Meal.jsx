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
   Box,
} from '@mui/material';

//recipe id will be inside the recipe uri
function Meal({
   imageUrl,
   name,
   total_calories,
   total_CHO,
   total_yield,
   ingredientLines,
   protein,
   fat,
   fiber,
   shareLink,
}) {
   return (
      <Card sx={{ maxWidth: 355, margin: 5 }}>
         <Paper elevation={3}>
            <CssBaseline />
            <CardActionArea>
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
                     {/* <Box sx={{ fontWeight: 'strong' }} display='inline'> */}
                     Total Servings: {total_yield}
                     {/* </Box> */}
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
                        Nutrients Per Serving Size
                     </Typography>
                     <Typography variant='subtitle2' color='text.secondary'>
                        {`Calories: ${Math.floor(
                           total_calories / total_yield
                        )}`}
                     </Typography>
                     <Typography variant='subtitle2' color='text.secondary'>
                        {`Carbohydrates: ${Math.floor(
                           total_CHO / total_yield
                        )}`}
                     </Typography>
                     <Typography variant='subtitle2' color='text.secondary'>
                        {`Protein: ${Math.floor(protein / total_yield)}`}
                     </Typography>
                     <Typography variant='subtitle2' color='text.secondary'>
                        {`Fat: ${Math.floor(fat / total_yield)}`}
                     </Typography>
                     <Typography variant='subtitle2' color='text.secondary'>
                        {`Fiber: ${Math.floor(fiber / total_yield)}`}
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

export default Meal;

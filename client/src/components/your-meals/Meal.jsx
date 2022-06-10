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
   handleChildDelete,
   id,
}) {
   const handleDelete = () => {
      handleChildDelete(id);
   };
   return (
      <div>
         <CssBaseline />
         <Card sx={{ maxWidth: 355, margin: 5 }}>
            <Paper elevation={10}>
               <Tooltip
                  title='Click to delete recipe'
                  arrow
                  placement='top-end'
               >
                  <CardActionArea onClick={handleDelete}>
                     <CardMedia
                        component='img'
                        height='300'
                        image={imageUrl}
                        alt=''
                     />
                     <CardContent>
                        <Typography gutterBottom variant='h6' component='div'>
                           {name}
                        </Typography>
                        <Typography component='div'>
                           Total Servings: {total_yield}
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
                              {`Calories: ${Math.floor(
                                 total_calories / total_yield
                              )}`}
                           </Typography>
                           <Typography
                              variant='subtitle2'
                              color='text.secondary'
                           >
                              {`Carbohydrates: ${Math.floor(
                                 total_CHO / total_yield
                              )}`}
                           </Typography>
                           <Typography
                              variant='subtitle2'
                              color='text.secondary'
                           >
                              {`Protein: ${Math.floor(protein / total_yield)}`}
                           </Typography>
                           <Typography
                              variant='subtitle2'
                              color='text.secondary'
                           >
                              {`Fat: ${Math.floor(fat / total_yield)}`}
                           </Typography>
                           <Typography
                              variant='subtitle2'
                              color='text.secondary'
                           >
                              {`Fiber: ${Math.floor(fiber / total_yield)}`}
                           </Typography>
                        </Grid>
                     </CardContent>
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
      </div>
   );
}

export default Meal;

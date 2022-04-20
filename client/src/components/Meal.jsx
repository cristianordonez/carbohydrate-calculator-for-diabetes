import * as React from 'react'
import {
   Card,
   CardContent,
   CardMedia,
   Typography,
   Button,
   CardActionArea,
   CardActions,
   CssBaseline,
} from '@mui/material'

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
      <Card sx={{ maxWidth: 345, margin: 5 }}>
         <CssBaseline />
         <CardActionArea>
            <CardMedia component='img' height='140' image={imageUrl} alt='' />
            <CardContent>
               <Typography gutterBottom variant='h6' component='div'>
                  {name}
               </Typography>
               <Typography variant='subtitle1' color='text.secondary'>
                  {`Total Servings: ${total_yield}`}
               </Typography>
               <Typography variant='subtitle1' color='text.secondary'>
                  {`Total Calories Per Serving: ${Math.floor(
                     total_calories / total_yield
                  )}`}
               </Typography>
               <Typography variant='subtitle1' color='text.secondary'>
                  {`Total Carbohydrates Per Serving: ${Math.floor(
                     total_CHO / total_yield
                  )}`}
               </Typography>
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
      </Card>
   )
}

export default Meal

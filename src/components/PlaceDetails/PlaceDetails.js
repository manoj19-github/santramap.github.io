  import React from 'react'
import {Box,Typography,Button,Card,CardMedia,CardContent,CardActions,Chip} from "@material-ui/core"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from "./PlaceDetailsStyles"
import {GiModernCity} from "react-icons/gi"
function ProductDetails({place,selected,refProp}) {

  const classes=useStyles()
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });


  return (
    <Card elevation={6}>
      <CardMedia
        style={{height:350}}
        image={place.photo?place.photo.images.large.url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMWSg6qDGDy6Jy7quqwAbSRJjDpSBvHWz1ng&usqp=CAU'}
        title={place.name}


        />
      <CardContent>
        <Typography gutterBottom variant="h6">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1"><GiModernCity/></Typography>
          <Typography gutterBottom variant="subtitle1">{place.parent_display_name}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">

            <Rating size="small"
              value={Number(place.rating)}
              readOnly/>
            <Typography variant="subtitle1">out of{place.num_reviews} reviews</Typography>
        </Box>
        {
          place.awards?.map((award,index)=>{

            return(
              <Box key={index} my={1} display="flex" justifyContent="space-between" alignItems="center">
                <img src={award.images.small} alt={award.display_name}/>
                <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
              </Box>

            )
          })
        }
        {
          place?.cuisine?.map(({name})=>{
            return(
              <Chip key={name} size="small" label={name} className={classes.chip}/>
            )
          })
        }
      </CardContent>
      {
        place?.address &&(
          <Typography gutterBottom variant="body2" color="textSecondary" classes={classes.subtitle} pr={3}><LocationOnIcon/>
          {place.address}
        </Typography>
        )
      }
      {
        place?.phone &&(
          <Typography gutterBottom variant="body2" color="textSecondary" classes={classes.subtitle} pr={3}><PhoneIcon pr={3}/>
          {place.phone}
        </Typography>
        )
      }
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={()=>window.open(place.web_url,'_blank')}
          >Trip Advisor</Button>
          <Button
            size="small"
            color="primary"
            onClick={()=>window.open(place.website,'_blank')}
            >Website</Button>
      </CardActions>
    </Card>

  )
}

export default ProductDetails

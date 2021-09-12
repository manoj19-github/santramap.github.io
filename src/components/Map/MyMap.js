import React,{useEffect,useState} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapReact from "google-map-react"
import {Paper,Typography,useMediaQuery} from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import useStyles from "./MapStyles"
import {MymapStyles} from "./MymapStyles"
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 14
  };
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function MyMap({setCoordinates,setBounds,coordinates,bounds,places,setChildClicked,weatherData}) {


  const classes=useStyles()
  const isMobile=useMediaQuery('(min-width:600px)');
  const isDesktop=useMediaQuery('(min-width:600px)');


  return (
     // Important! Always set the container height explicitly
     <div style={{ height: '100vh', width: '100%' }}>
       <GoogleMapReact
         bootstrapURLKeys={{ key: "AIzaSyBD4d1cDmHf_es5xz8HhT4g25aN_O4pL7M"}}
         defaultCenter={coordinates}
         defaultZoom={defaultProps.zoom}
         center={coordinates}
         margin={[50,50,50,50]}
         options={{disableDefauklt:true,zoomControl:true}}
         onChange={(e)=>{
           console.log(e)
           setCoordinates({lat:e.center.lat,lng:e.center.lng})
           setBounds({ne:e.marginBounds.ne,nw:e.marginBounds.nw,se:e.marginBounds.se,sw:e.marginBounds.sw})
         }}
         onChildClick={(child)=>setChildClicked(child)}
       >
         {
           places?.map((place,index)=>(
             <div className={classes.markerContainer}
               lat={Number(place.latitude)}
               lng={Number(place.longitude)}
               key={index}



               >
                 {
                   !isDesktop ?(
                     <LocationOnOutlinedIcon
                       color="primary"
                       fontSize="large"/>


                   ):(
                     <Paper elevation={3} className={classes.paper}>
                       <Typography
                         className={classes.typography}
                         variant="subtitle2"
                         gutterBottom
                         >{place.name}</Typography>
                           <img className={classes.pointer}

                               src={place.photo?place.photo.images.large.url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMWSg6qDGDy6Jy7quqwAbSRJjDpSBvHWz1ng&usqp=CAU'}
                               alt={place.name}
                             />
                           <Rating size="small"
                             className={classes.rating}
                             value={Number(place.rating)}
                             readOnly/>

                     </Paper>

                   )
                 }

             </div>
           ))}
           {weatherData?.list?.map((data,index)=>{
             return(
               <div
                 key={index}
                 lat={data.coord.lat}
                 lng={data.coord.lon}>
                  <img style={{height:"5rem",width:"4rem"}} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />

                  </div>





             )
           })}

       </GoogleMapReact>
     </div>
   );

}
export default MyMap

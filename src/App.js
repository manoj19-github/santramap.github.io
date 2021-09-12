import logo from './logo.svg';
import React,{useState,useEffect} from "react"

import {CssBaseline,Grid} from "@material-ui/core"
import Header from "./components/Header/Header"
import List from "./components/List/List"
import MyMap from "./components/Map/MyMap"
import "@fontsource/allura";
import "@fontsource/roboto";
import {getPlacesData,getWeatherData} from "./api"


function App() {
  const [filterPlaces,setFilterPlaces]=useState([])
  const [places,setPlaces]=useState([])
  const [coordinates,setCoordinates]=useState({})
  const [bounds,setBounds]=useState({})
  const [childClicked,setChildClicked]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  const [type,setType]=useState('restaurants')
  const [rating,setRating]=useState('')
  const [autocomplete,setAutocomplete]=useState(null)
  const [weatherData,setWeatherData]=useState([])
  const onPlaceChanged=()=>{
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    setCoordinates({lat,lng})
  }
  const onLoad=(auto)=>{
    setAutocomplete(auto)

  }
  useEffect(()=>{
    navigator.geolocation && navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude})
    })
  },[])
  useEffect(()=>{
    const filteredPlaces=places.filter(place=>place.rating >rating);
    setFilterPlaces(filteredPlaces)

  },[rating])
  useEffect(()=>{

    if(bounds.sw && bounds.ne){
      setIsLoading(true)
      getWeatherData({coordinates}).then(data=>setWeatherData(data))

      getPlacesData(type,bounds.sw,bounds.ne)
      .then(data=>{
        console.log(data)
        setPlaces(data)
        setFilterPlaces([])
        setIsLoading(false)

      })
    }

  },[type,coordinates,bounds])
  return (
    <>
      <CssBaseline>
        <Header setCoordinates={setCoordinates} onLoad={onLoad} onPlaceChanged={onPlaceChanged}/>
      </CssBaseline>
      <Grid container spacing={3} style={{width:"100%"}}>
        <Grid item xs={12} md={4}>
          <List
            places={filterPlaces.length?filterPlaces:places} childClicked={childClicked} isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <MyMap
            places={filterPlaces.length?filterPlaces:places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            bounds={bounds}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>


    </>
  );
}

export default App;

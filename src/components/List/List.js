import React,{useState,useEffect,createRef} from 'react'
import {CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select} from "@material-ui/core"
import useStyles from "./ListStyles"
import PlaceDetails from "../PlaceDetails/PlaceDetails"


function List({places,childClicked,isLoading,rating,setRating,type,setType}) {

  console.log(childClicked)
  const classes=useStyles()


  const [elRef,setElRef]=useState([])



  useEffect(()=>{
    setElRef((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));



  },[places])

  return (
    <div className={classes.container}>
      <Typography variant="h5">Resturents,Hotels & Attractions around You</Typography>
    {
      isLoading?(
        <div  className={classes.loading}>
          <CircularProgress size="4rem"/>
        </div>


      ):(
          <>
            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e)=>setType(e.target.value)}>
              <MenuItem value="restaurants">Resturents</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>

          </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={3.0}>Above 3.0</MenuItem>
                  <MenuItem value={4.0}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
              {
                places?.map((place,index)=>{
                  return(
                    <>
                    <Grid ref={elRef[index]} item key={index} xs={12}>
                      <PlaceDetails
                        place={place}
                        selected={Number(childClicked)===index}
                        refProp={elRef[index]}


                      />

                    </Grid>

                    </>
          )
        })

      }

      </Grid>
    </>
    )}
  </div>
  )}

export default List

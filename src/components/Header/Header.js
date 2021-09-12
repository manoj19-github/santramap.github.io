import React,{useState} from 'react'
import {Autocomplete} from "@react-google-maps/api"
import {AppBar,Toolbar,Typography,InputBase,Box} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import useStyles from "./Headerstyles"

function Header({setCoordinates,onLoad,onPlaceChanged}) {
  const classes=useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div>
          <Typography variant="h3" className={classes.title,classes.mainTitle}>
            <i>Santra Maps</i>
          </Typography>
          <p className={classes.subtitle}>
            Exclusively Decorated For Traveling
          </p>
        </div>


        <Box display="flex">
          
        {/*   <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase placeholder="Search ..... "  classes={{root:classes.inputRoot,input:classes.inputInput}}/>
            </div>
          </Autocomplete>*/}
        </Box>

      </Toolbar>
    </AppBar>
  )
}

export default Header

import axios from "axios";


export const getPlacesData=async (type,sw,ne)=>{
  try{
    const url= `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
    const {data:{data}} =await axios.get(url,{


      params: {
        bl_latitude:sw.lat,
        tr_latitude:ne.lat,
        bl_longitude:sw.lng,
        tr_longitude:ne.lng,

      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': '8ccec07010msh953db0fc77578a8p1dd438jsnada92175c88e'
      }
    }
)
    return data;
  }catch(error){
    console.log(error)

  }
}
export const getWeatherData=async(lat,lng)=>{
  try{
    const {data}=await axios.get(`https://community-open-weather-map.p.rapidapi.com/find`,{
      params: {lon: '0',lat: '0',},
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': '8ccec07010msh953db0fc77578a8p1dd438jsnada92175c88e'
      }
    })
    return data


  }catch(error){
    console.log(error)

  }
}


const options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/find',


};

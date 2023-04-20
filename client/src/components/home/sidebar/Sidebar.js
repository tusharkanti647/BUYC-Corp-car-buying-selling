import { useEffect, useState } from "react";
import "./Sidebar.css";
import { Box, createTheme, Grid } from '@mui/material';

function Sidebar({setFilterCarData}) {
const [filterData, setFilterData]=useState({
    color:"",
    price:"",
    mileage:""
});
const [numberOfModel, setNumberOfModel]=useState("");



useEffect(()=>{
   
    const fetchFun =async ()=>{
        try {
            let queryString = "http://localhost:8000/filter-car";
            queryString = queryString + '?color=' + filterData.color + '&price=' + filterData.price + '&mileage=' + filterData.mileage;
            const respons = await fetch(queryString);
            const data = await respons.json();
            console.log(data);
            setFilterCarData(data);
          } catch (err) {
            console.log(err);
          }
    }
    fetchFun();
},[filterData]);

useEffect(()=>{
    const fetchFun =async ()=>{
        const response = await fetch("http://localhost:8000/models-count");
        const data = await response.json();
        setNumberOfModel(data.count);
    }
    fetchFun();
},[])



    return (
        <Box sx={{ width: "25%", borderRight: "solid 0.5px #888888", color: "#888888" }} className="sidebar-category">
            <Box>
                <h4> filters</h4>

                <label for="cars">Choose car Price:</label><br />
                <select id="car-price-filter" name="car-price-filter" onChange={(e)=>setFilterData({ price:e.target.value})}>
                    <option value="" ></option>
                    <option value="500000">below the 5 Lakh</option>
                    <option value="1000000">5 Lakh to 10 Lakh</option>
                    <option value="1000001">above 10 Lakh</option>
                </select> <br/>

                <label for="cars">Choose car Mileage:</label><br />
                <select id="car-mileage-filter" name="car-mileage-filter" onChange={(e)=>setFilterData({mileage:e.target.value})}>
                    <option value=""></option>
                    <option value="15">below the 15 L/km</option>
                    <option value="30">15 L/km to 30 L/km</option>
                    <option value="31">above 30 L/km</option>
                </select> <br/>

                <label for="cars">Choose a car color:</label><br />
                <select id="car-colors-filter" name="car-colors-filter" onChange={(e)=>setFilterData({color:e.target.value})}>
                    <option value=""></option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="red">Red</option>
                    <option value="gray">Gray</option>
                </select> <br/>

            </Box>

            <Box>
                <h4>Models</h4>
                <p>
                {numberOfModel} number of OEM models available
                </p>
            </Box>
        </Box>
    )
}

export default Sidebar;
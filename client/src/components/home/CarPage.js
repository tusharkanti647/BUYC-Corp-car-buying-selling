import { Box, } from "@mui/material";
import Sidebar from "./sidebar/Sidebar";
import { useEffect, useState } from "react";
import "./CarPage.css";
import CarCard from "../card/CarCard";
import { useNavigate } from "react-router-dom";


function CarPage({ searchCarData }) {
    const [carData, setCarData] = useState([]);
    const [filterCarData, setFilterCarData] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (searchCarData.length > 0) {
            setCarData(searchCarData);
        }
    }, [searchCarData]);
    useEffect(() => {
        if (filterCarData.length > 0) {
            setCarData(filterCarData);
        }
    }, [filterCarData])

    useEffect(() => {
        const fetchFun = async () => {
            const response = await fetch("http://localhost:8000/get-cars", {
                method: "GET",
                headers: { "Authorization": token },
            });
            if (response.statusText === "Unauthorized") {
                console.log("hello");
                navigate("/login-first");
            } else {
                const data = await response.json();
                setCarData(data);
            }
        }
        fetchFun()
    }, [])


    return (
        <Box className="product-page">
            <Box sx={{ width: "95%", display: "flex", }}>
                <Sidebar setFilterCarData={setFilterCarData} />


                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, }}>



                    <Box className="card-contaner">
                        {carData.map((eachCarData) => <CarCard eachCarData={eachCarData} />)}
                    </Box>

                </Box>
            </Box>


        </Box>
    )
}

export default CarPage;
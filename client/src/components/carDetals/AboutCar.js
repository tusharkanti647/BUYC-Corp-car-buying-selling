
import "./AboutCar.css"

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Sidebar from "../home/sidebar/Sidebar";






function AboutCar() {
    const [checked, setChecked] = useState(false);
    const [oneCarData, setOneCarData] = useState({});
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { id } = useParams();

    //get one product from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get-cars/${id}`, {
                    method: "GET",
                    headers: { "Authorization": token },
                });
                if (response.statusText === "Unauthorized") {
                    console.log("hello");
                    navigate("/login-first");
                } else {
                    const data = await response.json();
                    setOneCarData({ ...data });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);




    return (

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: "center" }} className="About-product-main">
            <Box sx={{ width: "95%", display: "flex" }} className="upperPart">

                <Sidebar />

                {/* ---------------------------------------------------------------------------- */}
                <img src={oneCarData.imgLink} alt="" />

                {/* ------------------------------+ ---------------------------------------------- */}
                {oneCarData.price && (
                    <Box className="upperPart-right" sx={{ ml: "20px" }}>

                        <h4>{oneCarData.modelName + "  " + oneCarData.modelYear}</h4>

                        <Box>

                            <h4 id="price">Price:Rs {oneCarData.price} </h4>

                            <div className="aboutProduct-button-wrapper">
                                <Button variant="contained" color="success">
                                    Edit
                                </Button>
                                <Button sx={{ml:"5%"}} variant="outlined" color="error">
                                    Delete
                                </Button>
                                <Button  sx={{ml:"5%"}} variant="contained" color="success">
                                    By
                                </Button>
                            </div>
                        </Box>

                        <Box onClick={() => setChecked(!checked)} className="product-weight-value-slect">

                        </Box>
                    </Box>
                )}



            </Box>


            {/* ---------------------------------------------------------------------------- */}
            {oneCarData.price && (
                <Box sx={{ width: "95%", }} className="lowerPart">
                    <div>
                        <h4>{oneCarData.modelName + "  " + oneCarData.modelYear}</h4>
                    </div>

                    <Box className="product-about-section" sx={{ borderBottom: "solid 0.5px #888888", color: "#888888" }}>
                        <h3>Original Equipment Manufacturers Specifications</h3>
                        <table>
                            <tr>
                                <th>Parameters</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td>Model Name</td>
                                <td>{oneCarData.modelName}</td>
                            </tr>
                            <tr>
                                <td>Model Year</td>
                                <td>{oneCarData.modelYear}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{oneCarData.price}</td>
                            </tr>
                            <tr>
                                <td>Colors</td>
                                <td>{oneCarData.colors}</td>
                            </tr>
                            <tr>
                                <td>Mileage</td>
                                <td>{oneCarData.mileage}</td>
                            </tr>
                            <tr>
                                <td>Power</td>
                                <td>{oneCarData.power}</td>
                            </tr>
                            <tr>
                                <td>MaxSpeed</td>
                                <td>{oneCarData.maxSpeed}</td>
                            </tr>



                        </table>


                        <h3>Inventory-Related Information</h3>
                        <table>
                            <tr>
                                <th>Parameters</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td>KMs on Odometer</td>
                                <td>{oneCarData.odometerValue}</td>
                            </tr>
                            <tr>
                                <td>Major Scratches</td>
                                <td>{oneCarData.majorScratches}</td>
                            </tr>
                            <tr>
                                <td>Original Paint</td>
                                <td>{oneCarData.originalPaint}</td>
                            </tr>
                            <tr>
                                <td>Number of accidents reported</td>
                                <td>{oneCarData.accidents}</td>
                            </tr>
                            <tr>
                                <td>numberOfPreviousBuyers</td>
                                <td>{oneCarData.numberOfPreviousBuyers}</td>
                            </tr>
                            <tr>
                                <td>registrationPlace</td>
                                <td>{oneCarData.registrationPlace}</td>
                            </tr>
                        </table>
                    </Box>


                    <Box className="product-about-section" sx={{ borderBottom: "solid 0.5px #888888", color: "#888888" }}>
                        <h3>About the Car</h3>
                        <ul>
                            <li>
                                {oneCarData.description[0]}
                            </li>
                            <li>
                                {oneCarData.description[1]}
                            </li>
                            <li>
                                {oneCarData.description[2]}
                            </li>
                        </ul>
                    </Box>
                </Box >
            )}

        </Box>
    )
}

export default AboutCar;
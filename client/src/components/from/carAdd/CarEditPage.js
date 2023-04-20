import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function CarEditPage() {
    const [editCarData, setEditCarData] = useState({});
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { id } = useParams();

    //fetch car detals
    //-------------------------------------------------------------------------
    useEffect(() => {
        const fetchFun = async () => {

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
                    setEditCarData({ ...data, description1: data.description[0], description2: data.description[1], description3: data.description[2] });
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchFun();
    }, [])

    //handel control input
    //-------------------------------------------------------------------------
    const handelInput = (event) => {
        const { name, value } = event.target;
        setEditCarData({ ...editCarData, [name]: value });
    }

    //car data send to the server
    //-------------------------------------------------------------------------
    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            const { modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description1, description2, description3 } = editCarData;

            //console.log("hello");
            const respons = await fetch(`http://localhost:8000/cars/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description1, description2, description3 })
            });
            if (respons.statusText === "Unauthorized") {
                console.log("hello");
                navigate("/login-first");
            } else {
                const data = await respons.json();
                if (respons.status === 422 || !editCarData) {
                    alert("no data");
                } else {
                    alert("sucessfull edit the car Details");

                    //navigate to the home page
                    navigate("/");

                    setEditCarData({
                        ...editCarData,
                        modelName: "",
                        modelYear: "",
                        price: "",
                        colors: "",
                        mileage: "",
                        power: "",
                        maxSpeed: "",
                        imgLink: "",
                        odometerValue: "",
                        majorScratches: "",
                        originalPaint: "",
                        accidents: "",
                        numberOfPreviousBuyers: "",
                        registrationPlace: "",
                        description1: "",
                        description2: "",
                        description3: "",
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (<>
        {editCarData.modelName ? (
            <Box
                component="form"
                method="POST"
                onSubmit={handelSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="on"
            >
                <div >
                    <h2>Add new Car Information</h2>

                    <TextField
                        error={false}
                        required
                        name="modelName"
                        id="outlined-required-modelName"
                        label="Model Name"
                        value={editCarData.modelName}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="modelYear"
                        type="number"
                        id="outlined-required-number"
                        label="Model Year"
                        value={editCarData.modelYear}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="price"
                        id="outlined-required-price"
                        label="Price"
                        type="number"
                        value={editCarData.price}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="colors"
                        id="outlined-required-colors"
                        label="Colors"
                        value={editCarData.colors}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="mileage"
                        type="number"
                        id="outlined-required-mileage"
                        label="Mileage"
                        value={editCarData.mileage}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="power"
                        type="number"
                        id="outlined-required-power"
                        label="power"
                        value={editCarData.power}
                        onChange={handelInput}
                    />

                    <TextField
                        error={false}
                        required
                        name="maxSpeed"
                        type="number"
                        id="outlined-required-maxSpeed"
                        label="MaxSpeed"
                        value={editCarData.maxSpeed}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="odometerValue"
                        type="number"
                        id="outlined-required-odometerValue"
                        label="KMs on Odometer"
                        value={editCarData.odometerValue}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="majorScratches"
                        //type="number"
                        id="outlined-required-majorScratches"
                        label=" Major Scratches"
                        value={editCarData.majorScratches}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="originalPaint"
                        id="outlined-required-originalPaint"
                        label="Original Paint"
                        value={editCarData.originalPaint}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="accidents"
                        type="number"
                        id="outlined-required-accidents"
                        label=" Number of accidents reported"
                        value={editCarData.accidents}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="numberOfPreviousBuyers"
                        type="number"
                        id="outlined-required-numberOfPreviousBuyers"
                        label="Number of previous buyers"
                        value={editCarData.numberOfPreviousBuyers}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="registrationPlace"
                        id="outlined-required-registrationPlace"
                        label="Registration Place"
                        value={editCarData.registrationPlace}
                        onChange={handelInput}
                    />
                    <TextField
                        name="description1"
                        id="outlined-multiline-description1"
                        label="Description Point One"
                        value={editCarData.description1}
                        onChange={handelInput}
                        multiline
                        rows={4}

                    />
                    <TextField
                        name="description2"
                        id="outlined-multiline-description2"
                        label="Description Point Two"
                        value={editCarData.description2}
                        onChange={handelInput}
                        multiline
                        rows={4}
                    />
                    <TextField
                        name="description3"
                        id="outlined-multiline-description3"
                        label="Description Point Three"
                        value={editCarData.description3}
                        onChange={handelInput}
                        multiline
                        rows={4}
                    />
                    <button >CONTINUE</button>


                </div>

            </Box>) : <></>}
    </>);
};

export default CarEditPage;
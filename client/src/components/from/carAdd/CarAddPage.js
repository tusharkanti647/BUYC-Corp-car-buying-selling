import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function CarAddPage() {
    const [carAddData, setCarAddData] = useState({
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
    const [carId, setCarId] = useState(null);
    const [imgAddLink, setImgAddLink] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    //handel control input
    //-------------------------------------------------------------------------
    const handelInput = (event) => {
        const { name, value } = event.target;
        setCarAddData({ ...carAddData, [name]: value });
    }

    //car data send to the server
    //-------------------------------------------------------------------------
    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            const { modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description1, description2, description3 } = carAddData;

            //console.log("hello");
            const respons = await fetch("http://localhost:8000/add-car", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description1, description2, description3 })
            });
            if (respons.statusText === "Unauthorized") {
                navigate("/login-first");
            } else {
                const data = await respons.json();
                if (respons.status === 422 || !carAddData) {
                    alert("no data");
                } else {
                    alert("sucessfull add the new car Details");

                    //navigate to the home page
                    //navigate("/");
                    setCarId(data.productData._id);
                    setImgAddLink(`/car-add-page/img-add/${data.productData._id}`);

                    setCarAddData({
                        ...carAddData,
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

    // if(carId){
    //     let imgAddLink = `/car-add-page/img-add/${carId}`
    // }

    return (<>
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
                    value={carAddData.modelName}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="modelYear"
                    type="number"
                    id="outlined-required-number"
                    label="Model Year"
                    value={carAddData.modelYear}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="price"
                    id="outlined-required-price"
                    label="Price"
                    type="number"
                    value={carAddData.price}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="colors"
                    id="outlined-required-colors"
                    label="Colors"
                    value={carAddData.colors}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="mileage"
                    type="number"
                    id="outlined-required-mileage"
                    label="Mileage"
                    value={carAddData.mileage}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="power"
                    type="number"
                    id="outlined-required-power"
                    label="power"
                    value={carAddData.power}
                    onChange={handelInput}
                />

                <TextField
                    error={false}
                    required
                    name="maxSpeed"
                    type="number"
                    id="outlined-required-maxSpeed"
                    label="MaxSpeed"
                    value={carAddData.maxSpeed}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="odometerValue"
                    type="number"
                    id="outlined-required-odometerValue"
                    label="KMs on Odometer"
                    value={carAddData.odometerValue}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="majorScratches"
                    //type="number"
                    id="outlined-required-majorScratches"
                    label=" Major Scratches"
                    value={carAddData.majorScratches}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="originalPaint"
                    id="outlined-required-originalPaint"
                    label="Original Paint"
                    value={carAddData.originalPaint}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="accidents"
                    type="number"
                    id="outlined-required-accidents"
                    label=" Number of accidents reported"
                    value={carAddData.accidents}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="numberOfPreviousBuyers"
                    type="number"
                    id="outlined-required-numberOfPreviousBuyers"
                    label="Number of previous buyers"
                    value={carAddData.numberOfPreviousBuyers}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="registrationPlace"
                    id="outlined-required-registrationPlace"
                    label="Registration Place"
                    value={carAddData.registrationPlace}
                    onChange={handelInput}
                />
                <TextField
                    name="description1"
                    id="outlined-multiline-description1"
                    label="Description Point One"
                    value={carAddData.description1}
                    onChange={handelInput}
                    multiline
                    rows={4}

                />
                <TextField
                    name="description2"
                    id="outlined-multiline-description2"
                    label="Description Point Two"
                    value={carAddData.description2}
                    onChange={handelInput}
                    multiline
                    rows={4}
                    defaultValue="Default "
                />
                <TextField
                    name="description3"
                    id="outlined-multiline-description3"
                    label="Description Point Three"
                    value={carAddData.description3}
                    onChange={handelInput}
                    multiline
                    rows={4}
                    defaultValue="Default "
                />


                {/* //<Link to="/car-add-page/img-add" >
                    <button >CONTINUE</button>
                </Link> */}
                <button >SAVE</button>

            </div>
            {carId ? <Link to={imgAddLink} > <button >CONTINUE</button> </Link> : " "}

        </Box>
    </>);
};

export default CarAddPage;

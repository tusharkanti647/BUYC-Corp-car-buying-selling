
import "./CarCard.css"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import { Link, useNavigate } from "react-router-dom";


function CarCard({ eachCarData }) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    //handel car details delete
    //---------------------------------------------------------------------------------
    const handelDelete = async () => {
        try {
            const respons = await fetch(`http://localhost:8000/cars/delete/${id}`, {
                method: "DELETE",
                headers: { "Authorization": token },
            });
            if (respons.statusText === "Unauthorized") {
                navigate("/login-first");
            } else {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }



    //creat link and product id
    //---------------------------------------------------------------------------------
    const id = eachCarData._id;
    const link = `aboutCar/${id}`;
    const editLink = `car-edit-page/${id}`

    //---------------------------------------------------------------------------------
    return (
        <>
            <Card className="card">

                <Link to={link} >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        // height="100%"
                        width="100%"
                        height="auto"
                        image={eachCarData.imgLink}
                    />
                </Link>
                <CardContent sx={{ pb: "0px", pt: "1px" }}>

                    <Link to={link} >
                        <Typography sx={{ fontSize: 12 }} variant="h6" component="div">
                            {eachCarData.modelName + "  " + eachCarData.modelYear}
                        </Typography>
                    </Link>

                    <Typography sx={{ fontSize: 12, color: "#888888", bgcolor: "#F4F3F2" }} component="div">
                        RS {eachCarData.price}
                    </Typography>

                </CardContent>
                <CardActions sx={{ pt: "0px", bgcolor: "#F4F3F2" }}>
                    <Link to={editLink}>
                        <Button variant="contained" color="success">
                            Edit
                        </Button>
                    </Link>
                    <Button onClick={handelDelete} variant="outlined" color="error">
                        Delete
                    </Button>
                    <Button variant="contained" color="success">
                        Bye
                    </Button>

                    
                </CardActions>
            </Card>
        </>
    );
}

export default CarCard;
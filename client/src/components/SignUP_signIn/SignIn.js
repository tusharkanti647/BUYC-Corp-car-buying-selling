
import "./SignIn.css"

// import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const style = {
    // as 'absolute',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function SignIn({menuClose}) {
    const [open, setOpen] = useState(false);
    const [cookieValue, setCookieValue] = useState('');
    const [signInData, setSignInData] = useState({
        password: "",
        email: ""
    });


    //handel model close or open
    //-------------------------------------------------------------------------
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //-------------------------------------------------------------------------


    //handel control input
    //-------------------------------------------------------------------------
    const handelInput = (event) => {
        const { name, value } = event.target;
        setSignInData({ ...signInData, [name]: value });
    }


    //signin data send to the server
    //-------------------------------------------------------------------------
    const signinUser = async (event) => {
        event.preventDefault();
        const { email, password } = signInData;


        const respons = await fetch("http://localhost:8000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'same-origin',
            body: JSON.stringify({ email, password })
        });

        //console.log(respons.headers);

        const data = await respons.json();
        if (respons.status === 400 || !signInData) {
            alert("no data");
        } else {
            alert("user sucessfull signin");
            //console.log(data);
            localStorage.setItem("token", data.token);
            
            
            //navigate to home page
            handleClose();
            menuClose();

            setSignInData({
                ...signInData,
                email: "",
                password: ""
            });
        }
    }

    

    
//console.log(cookieValue);
    return (
        <div>
            <Button onClick={handleOpen}>login</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style, width: 400 }}>
                    
                    <Box
                        component="form"
                        method="POST"
                        onSubmit={signinUser}
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='login-modal'>
                            <h2>SignIn</h2>
                            <TextField
                                error={false}
                                required
                                name="email"
                                id="outlined-required-email-data"
                                label="Email"
                                value={signInData.email}
                                onChange={handelInput}
                            />

                            <TextField
                                error={false}
                                required
                                name="password"
                                type="password"
                                id="outlined-required-password-data"
                                label="Password"
                                value={signInData.password}
                                onChange={handelInput}
                            />

                            <button className="modal-signin-button">CONTINUE</button>

                            <h4>if you are new create a new account</h4>
                            <Link to="/signup">
                                <button onClick={handleClose} className="modal-signin-button">Create Account</button>
                            </Link>
                            <Button onClick={handleClose}>Close</Button>
                            <p className="privacy">By continuing, I accept TCP-bigbasket’s <a>Terms and Conditions</a> and <a>Privacy Policy.</a></p>
                        </div>
                    </Box>

                    {/* <SignUP handleClos={handleClose}/> */}

                </Box>
            </Modal>
        </div>
    );
}

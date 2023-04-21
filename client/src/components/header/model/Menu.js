import "./Menu.css";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, TextField } from '@mui/material';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "../../SignUP_signIn/SignIn";




export default function Menu() {
    const [open, setOpen] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(true);
    const navigate=useNavigate();
    const token=localStorage.getItem('token');



    //handel model close or open
    //-------------------------------------------------------------------------
    const menuOpen = () => {
        setOpen(true);
    };
    const menuClose = () => {
        setOpen(false);
    };

    //check user login or not 
    //-------------------------------------------------------------------------
    useEffect(()=>{
        const fetchFun =async()=>{
            const response = await fetch("http://localhost:8000/check-login",{
                method: "GET",
                headers:{
                    "Authorization": token,
                },
            });
            if(response.statusText==="Unauthorized"){
                navigate("/login-first");
            }else{
                setShowLoginButton(false);
            }
        }
        fetchFun();
    }, []);


    //logout function
    //----------------------------------------------------------------
    const handelLogOut=()=>{
        localStorage.removeItem("token");
        setShowLoginButton(true);
        navigate("/login-first");
    }




    //console.log(cookieValue);
    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={menuOpen}
            >
                <MenuIcon style={{ fontSize: 50 }} />
            </IconButton>

            <Modal
                open={open}
                onClose={menuClose}
            >
                <Box className='menu-modal' >
                    <Link to="/" onClick={menuClose}>
                        <div>Home</div>
                    </Link>
                        {showLoginButton ? <SignIn menuClose={menuClose}/> : <div onClick={handelLogOut}>Log Out</div>}
                    <div>User</div>
                    <Link to="/car-add-page" >
                        <div>Add New Car Information</div>
                    </Link>
                </Box>

                {/* <SignUP handleClos={handleClose}/> */}
            </Modal>
        </div >
    );
}
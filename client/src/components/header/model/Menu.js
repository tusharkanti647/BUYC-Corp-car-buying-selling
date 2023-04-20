import "./Menu.css";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, TextField } from '@mui/material';
import { Link } from "react-router-dom";
import { useState } from "react";
import SignIn from "../../SignUP_signIn/SignIn";




export default function Menu() {
    const [open, setOpen] = useState(false);



    //handel model close or open
    //-------------------------------------------------------------------------
    const menuOpen = () => {
        setOpen(true);
    };
    const menuClose = () => {
        setOpen(false);
    };





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
                        <SignIn menuClose={menuClose}/>
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
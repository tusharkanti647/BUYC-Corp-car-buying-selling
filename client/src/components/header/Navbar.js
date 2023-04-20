
import { Box, IconButton, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import "./Navbar.css"
import logo from "../../image/logo1.png";
import Menu from "./model/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";



function Navbar({ setSearchCarData }) {
  const [searchText, setSearchText] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  //handel search car
  //------------------------------------------------------------------------------------------------
  const handelSearch = async () => {

    try {
      let queryString = "http://localhost:8000/search-car";
      queryString = queryString + '?searchText=' + searchText.split(" ").join("+");

      const respons = await fetch(queryString, {
        method: "GET",
        headers: { "Authorization": token },
      });
      if (respons.statusText === "Unauthorized") {
        console.log("hello");
        navigate("/login-first");
      } else {
        const data = await respons.json();
        setSearchCarData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <header>
      <nav>
        <div className="left">
          <div className="navlogo" >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: 'block' } }}
            >
              <img src={logo} alt='logo' />
            </Typography>
            <span className='logo_div' style={{ display: "flex", flexDirection: 'column' }}>
              <Box className="logo_text" sx={{ color: "red" }} >BUYC</Box>
              <Box className="logo_text" sx={{ color: "black" }}>Corp</Box>
            </span>
          </div>

          <div className="nav_searchbaar">



            <input type="text" name=""
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search Your Dream Car" />

            <IconButton onClick={handelSearch} sx={{ m: "0", p: "0" }}>
              <SearchIcon id="search_icon" />
            </IconButton>
          </div>

        </div>

        <div className="right">

          <Menu />

          <Link to="/basket" >
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="black"
            >

            </IconButton>
          </Link>
        </div>
      </nav>

      <div className="nav_searchbaar_down">
        <div className="nav_searchbaar ">

          <input type="text" name=""
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Search Your Dream Car" />

          <IconButton onClick={handelSearch} sx={{ m: "0", p: "0" }}>
            <SearchIcon id="search_icon" />
          </IconButton>
        </div>
      </div>

    </header>
  </div>)
}

export default Navbar;
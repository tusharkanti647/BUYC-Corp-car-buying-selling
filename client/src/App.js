
//import './App.css';


import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/header/Navbar";
import CarPage from "./components/home/CarPage";
import AboutCar from "./components/carDetals/AboutCar";
import SignUp from "./components/SignUP_signIn/SignUp";
import CarAddPage from "./components/from/carAdd/CarAddPage";
import CarImgAdd from "./components/from/carAdd/CarImgAdd";
import CarEditPage from "./components/from/carAdd/CarEditPage";
import { useState } from "react";
import SignIn from "./components/SignUP_signIn/SignIn";
import LogInFirst from "./components/LogInFirst";

function App() {

  const [searchCarData, setSearchCarData] = useState([]);
 


  return (
    <>
      <Navbar setSearchCarData={setSearchCarData}/>
      
      <Routes>
        <Route path='/' element={<CarPage searchCarData={searchCarData} />}></Route>
        <Route path='/aboutCar/:id' element={<AboutCar />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login-first' element={<LogInFirst />}></Route>
        <Route path='/car-add-page' element={<CarAddPage />}></Route>
        <Route path='/car-add-page/img-add/:id' element={<CarImgAdd />}></Route>
        <Route path='/car-edit-page/:id' element={<CarEditPage />}></Route>
      </Routes>
      <Footer />

    </>
  );
}

export default App;

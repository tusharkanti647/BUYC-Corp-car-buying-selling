const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const secretKey = process.env.KEY;

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //left and right side of the name if have any spce it trimes
    },
    number: {
        type: String,
        require: true,
        uniqued: true, // it creat the number is unique
        maxlength: 10, //it creat the length of the number only 10
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    conPassword: {
        type: String,
        required: true,
        minlength: 6,
    },
    cars: Array,
});

const userModel = mongoose.model("users", usersSchema);


//Car schema
//----------------------------------------------------------------
const carSchema = new mongoose.Schema({
    
        modelName: {
            type: String,
            require: true,
        },
        modelYear: {
            type: Number,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        colors: {
            type: String,
            require: true,
        },
        mileage: {
            type: Number,
            require: true,
        },
        power: {
            type: Number,
            require: true,
        },
        maxSpeed: {
            type: Number,
            require: true,
        },
        imgLink: {
            type: String,
            //require: true,
        },
 

   
        odometerValue: {
            type: Number,
            require: true,
        },
        majorScratches: {
            type: String,
            require: true,
        },
        originalPaint: {
            type: String, 
            require: true,
        },
        accidents: {
            type: Number,
            require: true,
        },
        numberOfPreviousBuyers: {
            type: Number,
            require: true,
        },
        registrationPlace: {
            type: String,
            require: true,
        },
  

    description: [
        {
            type: String,
            require: true,
        },
        {
            type: String,
            require: true,
        },
        {
            type: String,
            require: true,
        }
    ],
});

const carModel = mongoose.model("cars", carSchema);

module.exports = { userModel, carModel };
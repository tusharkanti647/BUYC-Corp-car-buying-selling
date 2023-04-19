


const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const multer = require('multer');
const path = require('path');

router.use(bodyParser.json());
//router.use("./car", express.static("../upload/car"))
//app.use('/profile', express.static('upload/images'));
//router.use(express.static('public'));
//router.use("/car", express.static(__dirname + "../upload/car"))

const { userModel, carModel } = require("../model/schema");
const { Console } = require("console");

const secretKey = process.env.KEY;
require("./passport");
//const = require(".")



//--------------------------------------------------------------------------------------------------------
const storage = multer.diskStorage({
    destination: "./upload/car",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
});







//signUp root
//--------------------------------------------------------------------------------------
router.post("/signup", async (req, res) => {
    const { name, number, email, password, conPassword } = req.body;
    console.log({ name, number, email });
    if (!name || !number || !email || !password || !conPassword) {
        res.status(400).json("plices provide data");
        return;
    }
    const user = new userModel({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        conPassword: bcrypt.hashSync(req.body.conPassword, 10),
    });

    try {
        const respons = await user.save();

        const token = await generateAuthToken(respons._id);

        res.status(201).json({ user, token: "Bearer " + token });
    } catch (err) {
        res.status(400).json(err);
    }
});

//sign in path
//------------------------------------------------------------------------------------------
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json("invalid Credentials");
            return;
        }

        let user = await userModel.findOne({ email: email });
        if (!user) {
            res.status(400).send("not present");
            return;
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(400).send("password not match");
            return;
        }

        //generate token call the function
        const token = await generateAuthToken(user._id);
        //console.log(token);

        res.status(201).json({ user, token: "Bearer " + token });
    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        console.log("error the bhai catch ma for login time" + error.message);
    }
});

//car Post path
//-------------------------------------------------------------------------------
router.post("/add-car", (req, res) => {
    //const { oemSpecs, marketplaceInventory, description } = req.body;
    const { modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description } = req.body;
    //const { odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace } = marketplaceInventory;

    //console.log(req.body);
    const product = new carModel({

        modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink,

        odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace,

        description
    })

    product.save().then(() => {
        res.send({ status: true, product });
    }).catch((err) => {
        res.send({ status: false, err });
    });
});

//Car photo upload path
//-----------------------------------------------------------------------------
router.post("/car/photo/upload/:id", upload.single("car"), async (req, res) => {
    try {
        let _id = req.params.id;
        console.log(_id);
        //const car = await carModel.findOne({_id});
        //console.log(car);
        const data = await carModel.updateOne({ _id: _id }, {

            $set: {
                imgLink: `http://localhost:8000/car/${req.file.filename}`,
            }
        });
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
});



//Car get path
//-----------------------------------------------------------------------------
router.get("/get-cars", async (req, res) => {
    const data = await carModel.find();
    res.send(data);
});

//Car one get path
//----------------------------------------------------------------------------
router.get("/get-cars/:id", async (req, res) => {
    try {
        const data = await carModel.findById(req.params.id);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

//Car edit information path
//----------------------------------------------------------------------------
router.put("/cars/update/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        //console.log(_id);
        const { modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description } = req.body;
        //console.log({ modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink });

        const data = await carModel.updateOne({ _id: _id }, {

            $set: {
                modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description
            }
        });
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
});


// delete one car
//----------------------------------------------------------------------------
router.delete("/cars/delete/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        //console.log(_id);

        const data = await carModel.deleteOne({ _id });
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
});

//find the number of models available in db
//----------------------------------------------------------------------------
router.get('/models-count', async(req, res) => {
    try {
        const modelsCount = await carModel.distinct("modelName");
        console.log(modelsCount.length);
        res.status(200).send(modelsCount.length);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
})



//generet token 
async function generateAuthToken(id) {
    try {
        //first creat a paylod
        const paylod = {
            _id: id,
        }

        //creat token
        token = jwt.sign(paylod, secretKey, { expiresIn: "1d" });
        return token;
    } catch (err) {
        console.log(err);
    }
}


module.exports = router;
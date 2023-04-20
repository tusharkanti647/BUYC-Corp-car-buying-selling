


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







//signUp path
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
router.post("/add-car", passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        if (req.user) {
            const { modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description1, description2, description3 } = req.body;

            const product = new carModel({

                modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink,

                odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace,

                description: [description1, description2, description3]
            })

            product.save().then((productData) => {
                res.send({ status: true, productData });
            }).catch((err) => {
                res.send({ status: false, err });
            });
        } else {
            res.status(404).send("please login first");
        }
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

//Car photo upload path
//-----------------------------------------------------------------------------
router.post("/car/photo/upload/:id", upload.single("image"), async (req, res) => {
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
router.get("/get-cars", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (req.user) {
            const data = await carModel.find();
            res.send(data);
        } else {
            res.status(404).send("please login first");
        }
    } catch (err) {
        res.status(404).send(err);
    }
});

//Car one get path
//----------------------------------------------------------------------------
router.get("/get-cars/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (req.user) {
            const data = await carModel.findById(req.params.id);
            res.send(data);
        } else {
            res.status(404).send("please login first");
        }
    } catch (err) {
        res.status(404).send(err);
    }
});

//Car edit information path
//----------------------------------------------------------------------------
router.put("/cars/update/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (req.user) {
            let _id = req.params.id;
            const { modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description1, description2, description3 } = req.body;

            const data = await carModel.updateOne({ _id: _id }, {

                $set: {
                    modelName, modelYear, price, colors, mileage, power, maxSpeed, imgLink, odometerValue, majorScratches, originalPaint, accidents, numberOfPreviousBuyers, registrationPlace, description: [description1, description2, description3]
                }
            });
            console.log(data);
            res.status(200).json(data);
        } else {
            res.status(404).send("please login first");
        }
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});


// delete one car
//----------------------------------------------------------------------------
router.delete("/cars/delete/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (req.user) {
            let _id = req.params.id;
            //console.log(_id);

            const data = await carModel.deleteOne({ _id });
            console.log(data);
            res.status(200).json(data);
        } else {
            res.status(404).send("please login first");
        }
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

//find the number of models available in db
//----------------------------------------------------------------------------
router.get('/models-count', async (req, res) => {
    try {
        const modelsCount = await carModel.distinct("modelName");
        let count = modelsCount.length;
        res.status(200).json({ count: count });
    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

//search car 
//----------------------------------------------------------------------------
router.get('/search-car', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { searchText } = req.query;
    if (searchText) {
        let searchTextArr = searchText.split(" ");
        let modelYear = searchTextArr[searchTextArr.length - 1];

        searchTextArr.splice(searchTextArr.length - 1, 1);
        let modelName = searchTextArr.join(" ");
    }

    try {
        if (req.user) {

            if (searchText) {
                const data = await carModel.find({ $and: [{ modelName: modelName }, { modelYear: modelYear }] });
                res.status(200).send(data);
            } else {
                const data = await carModel.find();
                res.status(200).send(data);
            }
        } else {
            res.status(404).send("please login first");
        }

    } catch (err) {
        console.log(err);
        res.status(404).send(err);
    }
});

//filter car 
//----------------------------------------------------------------------------
router.get('/filter-car', async (req, res) => {
    let { color, price, mileage } = req.query;
    console.log({ color, price, mileage });
    console.log(price)
    try {
        if (color) {
            const data = await carModel.find({ colors: color });
            res.status(200).send(data);
            return;
        }
        if (price) {
            console.log("hello");
            if (price == 500000) {
                const data = await carModel.find({ price: { $lte: 500000 } });
                res.status(200).send(data);
            } else if (price == 1000000) {
                console.log(price);
                const data = await carModel.find({ price: { $gte: 500000 } });
                res.status(200).send(data);
            } else if (price == 1000001) {
                const data = await carModel.find({ price: { $gte: 1000000 } });
                res.status(200).send(data);
            }

        } else if (mileage) {
            if (mileage === 15) {
                const data = await carModel.find({ mileage: { $lte: 15 } });
                res.status(200).send(data);
            } else if (mileage === 30) {
                const data = await carModel.find({ mileage: { $gte: 15 } });
                res.status(200).send(data);
            } else if (mileage === 31) {
                const data = await carModel.find({ mileage: { $gte: 30 } });
                res.status(200).send(data);
            }

        } else {
            const data = await carModel.find();
            res.status(200).send(data);
        }

    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
});


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
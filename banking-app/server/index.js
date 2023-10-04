const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const User = require("./models/user");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000", "http://localhost:3001"],
    })
);


app.use('/api', require('./routes/api'))


app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message || "something went wrong";
    const data = error.data;
    console.log(error);
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(process.env.MONGO_DB)
    .then((result) => {
        app.listen(8080, () => {
            console.log("server running on port 8080");
        });
    })
    .catch((err) => {
        console.log(err);
    });


// generate 30 mock users
const users = [];
for (let i = 0; i < 60; i++) {
    const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        balance: faker.finance.amount(),
        socialId: faker.random.uuid()
    });
    users.push(user);
}

// insert mock users into the database
User.insertMany(users)
    .then(() => console.log('Mock users inserted into database'))
    .catch(err => console.error('Error inserting mock users:', err));
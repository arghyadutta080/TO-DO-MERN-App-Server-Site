const express = require('express')
const app = express();
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config();


app.use(cors({
    origin: true,
    credentials: true
}));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     next();
// });


app.use(express.json())
app.use(cookieParser())


app.use('/user', userRoute);
app.use('/task', taskRoute);


app.get('/', (req, res) => {
    res.send("Hello World");
})


mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("DB connected") })
    .catch((err) => { console.log(err) })


const port = process.env.PORT || 5000

console.log(process.env.MONGO_URL)

app.listen(port, () => {
    console.log('Server is running')
})
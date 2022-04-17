const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config() 

const likepost = require('./Routes/likepost')
const getsubscription = require('./Routes/getsubscription')
const getallsubscription = require('./Routes/getallsubs');
const createpost = require('./Routes/createpost')
const addcomment = require('./Routes/addcomment')
const corsOption = {
    origin: 'https://spilleet.com',
    credentials: true, 
    optionSuccessStatus: 200
}

app.use(cors(corsOption))

// allow access request body
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

// Routes
// ****change

app.use('/api', likepost)
app.use('/api', getsubscription)
app.use('/api', getallsubscription)
app.use('/api', createpost)
app.use('/api', addcomment)


app.listen(process.env.PORT || 5000, () => {
    console.log("app started")
})
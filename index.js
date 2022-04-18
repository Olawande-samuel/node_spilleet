const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config() 
const helmet = require("helmet")
const likepost = require('./Routes/likepost')
const getsubscription = require('./Routes/getsubscription')
const getallsubscription = require('./Routes/getallsubs');
const createpost = require('./Routes/createpost')
const addcomment = require('./Routes/addcomment')
const corsOption = {
    origin: '*',
    credentials: true, 
    optionSuccessStatus: 200
}

app.use(cors(corsOption))
app.use(helmet())
// allow access request body
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

// Routes
// ****chang
app.use('/api', likepost)
app.use('/api', getsubscription)
app.use('/api', getallsubscription)
app.use('/api', createpost)
app.use('/api', addcomment) 
 
// if(process.env.NODE_ENV === 'production') {
//         console.log( "We are running in production mode")
// } else {
//      console.log("We are running in development mode")
// }

app.listen(process.env.PORT || 5000, () => {
    console.log("app started")
})
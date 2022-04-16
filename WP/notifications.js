const webpush = require('web-push');


const vapidKeys = webpush.generateVAPIDKeys();

// console.log(vapidKeys);
// {
//     "subject": "mailto: <olawandesamuel@gmail.com>",
// }
const publicKey = "BFea5_DSEOa1_ZgE_rY0ckYx4FPrEY-P63AA2SmD9JH1LF6qYvxuWaZqCaj-g5LeRfjMlEb-5o1BwMyo-gtCFfE"
const privateKey = "JeIFbIaMX3c1SKUnXJU4GitdlF0IoCABGLCvQSU0FIE"

webpush.setVapidDetails(
    "mailto: <olawandesamuel@gmail.com>", publicKey, privateKey
)

module.exports = webpush
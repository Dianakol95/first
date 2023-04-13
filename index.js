const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const firebase = require('firebase-admin');
const userRouter = require('./api/user');

//otp sent 
// var unirest = require("unirest");

// var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

// req.headers({
//   "authorization": "JKZRDQ5fhosH2wPaNSM0G8xVWl4FubyernBU39YzEmgt7kcXApAw0aYZPqK29iOR7QlImGD48H6NLsoT"
// });

// req.form({
//   "variables_values": "5599",
//   "route": "otp",
//   "numbers": "7003560239",
// });

// req.end(function (res) {
//   if (res.error) throw new Error(res.error);

//   console.log(res.body);
// });

app.use('/users', userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

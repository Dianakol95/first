const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const firebase = require('firebase-admin');
const userRouter = require('./api/user'); //api path call
const productRouter = require('./api/product'); //api path call
const otpRouter = require('./api/otp'); //api path call
const loginRouter = require('./api/login');
const photoRouter = require('./api/photo');
const tokenfetchRouter = require('./api/fetchtoken');

app.use('/users', userRouter); //for frontend api call
app.use('/product', productRouter); //for frontend api call
app.use('/otp', otpRouter); //for frontend api call
app.use('/login', loginRouter);
app.use('/photo', photoRouter);
app.use('/fat', tokenfetchRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

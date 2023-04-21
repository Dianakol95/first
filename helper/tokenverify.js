const jwt = require('jsonwebtoken');

function tokeveryfi(token){

    const secretKey = 'mysecretkey';
    const decoded = jwt.verify(token, 'mysecretkey');

    const phn = decoded.phn;


    return phn;

}

module.exports = {
    tokeveryfi,
};

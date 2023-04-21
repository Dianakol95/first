const jwt = require('jsonwebtoken');

function tokengen(phn){

    const secretKey = 'mysecretkey';
    const token = jwt.sign({phn}, secretKey, {expiresIn: '30d'});

    console.log(token);

    return token;

}

module.exports = {
    tokengen,
};

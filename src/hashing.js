const {SHA256} = require('crypto-js');
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '1234asd';

bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
});

var hashedPassword = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc0MTljZDE1ZjkxMTJkNjBjZDVkNDgiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM0MzM1NDg0fQ.oyEc2kuWNWNEa9_MHrAYxAwJfKztwL8LUE8iCAmHY6k';

bcrypt.compare(password,hashedPassword, (err,res) => {
    console.log(res);
});

// var data = {
//     id: 10,
// };

// var token = jwt.sign(data, '123abc');
// console.log(token)

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded)


// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// //token.data.id = 4;
// //token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash) {
//     console.log('Data was not changed')
// } else {
//     console.log('Data was changed. Do not trust!')
// }
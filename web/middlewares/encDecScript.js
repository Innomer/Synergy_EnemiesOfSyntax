const crypto = require('crypto');
const base64Encode = (data) => {
    let buff = new Buffer.from(data);
    return buff.toString('base64');
}

const base64Decode = (data) => {
    let buff = new Buffer.from(data, 'base64');
    return buff.toString('ascii');
}

const sha256 = (salt, password) => {
    var hash = crypto.createHash('sha512', password);
    hash.update(salt);
    var value = hash.digest('hex');
    return value;
}

module.exports={base64Decode,base64Encode,sha256};
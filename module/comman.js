const getotp = (num = 4) => {
    let val = Math.floor(Math.pow(10, num) + Math.random() * (Math.pow(10, num) - 1));
    return val;
}

const base64Encoding = (str) => {
    let val = Buffer.from(String(str)).toString('base64');
    return val;
}
const base64Decoding = (encrStr) => {
    let val = Buffer.from(encrStr, 'base64').toString('ascii');
    return val;
}
module.exports = { getotp, base64Encoding, base64Decoding }


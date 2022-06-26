var fs = require('fs');

const getCertificate = () => {
    try {
        return {
            key: fs.readFileSync('src/config/ssl/code.key', 'utf8'),
            cert: fs.readFileSync('src/config/ssl/code.cert', 'utf8'),
        }
    } catch (error) {
        console.log(error)
        console.error('Could not find SSL Certificate files, https is disabled.');
        return null;
    }
};

module.exports =  getCertificate;

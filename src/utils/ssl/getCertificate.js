var fs = require('fs');

const getCertificate = () => {
    try {
        return {
            key: fs.readFileSync('../sslcert/key.pem', 'utf8'),
            cert: fs.readFileSync('../src/sslcert/certificate.pem', 'utf8'),
        }
    } catch (error) {
        console.error('Could not find SSL Certificate files, https is disabled.');
        return null;
    }
};

module.export =  getCertificate;

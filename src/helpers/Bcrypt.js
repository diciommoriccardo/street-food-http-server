var bycript = require('bcrypt');


const Bcrypt = {
    getHashedPassword,
    compare: (password, hashedPassword) => bcrypt.compare(password, hashedPassword)
}


async function getHashedPassword(password){
    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(10)
            .then(salt => {
                bcrypt.hash(password, salt)
                .then(hash => resolve(hash))
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
        } catch (err) {
            return err
        }
    })
}

module.exports = Bcrypt;
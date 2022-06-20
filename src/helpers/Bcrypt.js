var bycript = require('bcrypt');


const Bcrypt = {
    getHashedPassword,
    compare: (password, hashedPassword) => bcrypt.compare(password, hashedPassword)
}


async function getHashedPassword(password){
    return new Promise((resolve, reject) => {
        console.log("dentro")
            bycript.genSalt(10)
            .then(salt => {
                console.log(salt)
                bycript.hash(password, salt)
                .then(hash => resolve(hash))
                .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

module.exports = Bcrypt;
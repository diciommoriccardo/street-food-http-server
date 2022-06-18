const Fed = require('../models/FederatedCredentials.js');

const fedController = {
    create: (req) => {
        return new Promise((resolve, reject) => {
            new Fed(req).save()
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    },

    get: async function(provider, subject) {
        try {
            let data = Fed.find({ provider: provider, subject: subject})
        } catch (error) {
            return error
        }
            return data
        }
}

module.exports = fedController;
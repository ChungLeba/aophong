const mongoose = require('./dbConnect');

const blackListSchema = mongoose.Schema({
    token: String
}, {
    collection: 'blackList'
})
const blackListModel = mongoose.model('blackList', blackListSchema)
module.exports = blackListModel
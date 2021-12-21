const jwt = require('jsonwebtoken')
const useModel = require('../models/usemodel')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.KEY)
        const user = await useModel.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user) {
            throw new Error('')
        }
        req.token = token
        req.user = user
        next()
    } catch (err) {
        res.status(401).send({ error:  'Please authenticate.'})
    }
}
module.exports = auth
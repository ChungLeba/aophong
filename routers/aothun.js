const express = require('express');
const router = express.Router();
const path = require('path')
const checkLogin = require('../middlewares/checkLogin')
const aothunModel = require('../models/aothunmodel')


router.get('/:id', async(req, res) => {
    try {
        const item = await aothunModel.findById(req.params.id)
        res.status(201).send(item)
    } catch (error) {
        res.status(500).send(error)
    }
})
// có thể phân trang 20 sp/trang và lọc theo giá
router.get('/', (req, res) => {
        let { min, max, page } = req.query
        const PAGE_SIZE = 20
        const pageNumber = (!page) ? 1: parseInt(page)
        const minPrice = (!min) ? 0: parseInt(min)
        const maxPrice = (!max) ? 1000000 : parseInt(max)
        console.log(pageNumber, minPrice, maxPrice)
        aothunModel.find({
            price: { $gte: minPrice, $lte: maxPrice }
        })
            .sort({ price: 1 })
            .skip((pageNumber-1) *PAGE_SIZE)
            .limit(PAGE_SIZE)
            .then( items => {
                res.status(201).send(items)
            })
            .catch(error => {
                res.status(500).send(error)
            })
})

module.exports = router
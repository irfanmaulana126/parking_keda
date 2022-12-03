const express = require("express");
const Parking = require('../controllers/Parking');
const router = express.Router();

router.get('/', async (req,res) => {
    let datas = req.query
    let todos = await new Parking().getParkings(datas);
    return res.render('home',{todos});
});

router.post('/parking', async (req,res) => {
    let datas = req.body;
    await new Parking().createParking(datas,res);
    return res.redirect('/')
});

module.exports = router;
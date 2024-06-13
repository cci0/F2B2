const express = require('express');
const { findMusic, getMusic, chartAll, chart } = require('../controller/Cmusic');
const router = express.Router();

// localhost:8000/api/music/getMusic
router.post('/findMusic', findMusic);
router.get('/getMusic/:genre', getMusic);
router.get('/chartall', chartAll);
router.get('/chart', chart);
module.exports = router;

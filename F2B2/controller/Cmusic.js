const { Music } = require('../models');
const sequelize = require('sequelize');
const findMusic = async (req, res) => {
    const { music_name } = req.body;
    console.log('@@@@@@ musicname', music_name);
    const result = await Music.findOne({ where: { music_name } });
    console.log('@@@@@ result', result);
    res.json({ result });
};
const getMusic = async (req, res) => {
    console.log(req.params.genre);
    const { genre } = req.params;
    const result = await Music.findAll({ where: { genre } });
    res.json({ result }); // result는 배열, 9개의 요소가 들어있음
};
const chartAll = async (req, res) => {
    const result = await Music.findAll({
        attributes: [
            [sequelize.literal("DATE_FORMAT(rel_date, '%Y-%m-%d')"), 'latestAlbum'],
            ['album_img', 'album_img'],
            ['album_name', 'album_name'],
            ['artist_name', 'artist_name'],
            ['genre', 'genre'],
            ['rel_date', 'rel_date'],
            ['chart', 'chart'],
        ],
        order: [['chart', 'ASC']],
    });
    res.json({ result });
};
const chart = async (req, res) => {
    const result = await Music.findAll({
        attributes: [
            [sequelize.literal("DATE_FORMAT(rel_date, '%Y-%m-%d')"), 'latestAlbum'],
            ['album_img', 'album_img'],
            ['album_name', 'album_name'],
            ['artist_name', 'artist_name'],
            ['music_name', 'music_name'],
            ['genre', 'genre'],
            ['rel_date', 'rel_date'],
            ['chart', 'chart'],
        ],
        order: [['chart', 'ASC']],
        limit: 10,
    });
    res.json({ result });
};
module.exports = { findMusic, getMusic, chartAll, chart };

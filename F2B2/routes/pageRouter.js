const express = require('express');
const middleware = require('../middleware'); //사용자 인증정보 미들웨어 추가

const {
    home,
    signup,
    login,
    music,
    detail,
    beforeHome,
    search,
    myPage,
    recentAlbum,
    flobChart,
} = require('../controller/Cpage');

const router = express.Router();

router.get('/', home); //메인페이지
router.get('/signup', signup); //회원가입페이지
router.get('/login', login); //로그인페이지
router.get('/music', music); // localhost:8000/music
router.get('/music/detail/:genre', detail); // localhost:8000/music/detail
router.get('/beforeHome', beforeHome);
router.get('/search', search);
router.get('/myPage', myPage);
router.get('/recentAlbum', recentAlbum);
router.get('/flobChart', flobChart);
module.exports = router;

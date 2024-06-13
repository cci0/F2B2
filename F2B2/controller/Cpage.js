const home = (req, res) => {
    res.render('home');
};

const signup = (req, res) => {
    res.render('signup'); //회원가입페이지
};

const login = (req, res) => {
    res.render('login');
};
const music = (req, res) => {
    res.render('music');
};
const detail = (req, res) => {
    res.render('detail');
};

const beforeHome = (req, res) => {
    res.render('beforeHome');
};

const search = (req, res) => {
    res.render('search');
};
const myPage = (req, res) => {
    res.render('myPage');
};

const recentAlbum = (req, res) => {
    res.render('recentAlbum');
};

const flobChart = (req, res) => {
    res.render('flobChart');
};

module.exports = {
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
};

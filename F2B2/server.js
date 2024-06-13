require('dotenv').config();

const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// css 파일 적용
app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/album_img', express.static('album_img'));
app.use('/js', express.static('js'));
// music 파일 적용
app.use('/music', express.static('music'));
//라우터
//처음 페이지
const pageRouter = require('./routes/pageRouter');
app.use('/', pageRouter);

//사용자: 회원가입하기 + 로그인하기 + 사용자 데이터 조회/수정/삭제 하기
const userRouter = require('./routes/userRouter');
app.use('/api/user', userRouter);
// localhost:8000/api/music
const musicRouter = require('./routes/musicRouter');
app.use('/api/music', musicRouter);

//404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});

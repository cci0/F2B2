const { User, PlayList, Music, LikeList } = require("../models");
const jwt = require("jsonwebtoken"); // 세션 모듈
const bcrypt = require("bcrypt"); // 암호화 모듈
const { music } = require("./Cpage");

//회원가입
exports.signup = async (req, res) => {
  console.log("============== signup() ===================");

  const {
    user_id: inputUserId,
    user_pw: inputUserPw,
    user_name: inputUserName,
    user_email: inputUserEmail,
    user_gender: inbputUserGender,
  } = req.body;

  console.log(inputUserId);

  //존재여부확인
  const find = await User.findOne({ where: { user_id: inputUserId } });
  console.log("@ find", find);

  if (find) {
    res.json({ success: false, message: "이미 존재하는 회원입니다." });
  } else {
    const encryptedPw = await bcrypt.hash(inputUserPw, 11); // 데이터 암호화
    //생성 create
    const result = await User.create({
      user_id: inputUserId,
      user_pw: encryptedPw,
      user_name: inputUserName,
      user_email: inputUserEmail,
      user_gender: inbputUserGender,
    });
    console.log("@ result = User.create()", result);
    res.json({ success: true, message: "회원가입을 축하드립니다" });
  }
};

//로그인
exports.login = async (req, res) => {
  console.log("====================login=======================");

  const { user_id: inputUserId, user_pw: inputUserPw } = req.body;
  //검색 findOne
  const result = await User.findOne({ where: { user_id: inputUserId } });
  console.log("@ result = User.findOne()", result); // => member{dataValues:{}, _previousDataValues:{},uniqno:}

  if (result) {
    console.log("@ result.dataValues.user_pw", result.dataValues.user_pw); // => $2b$11$7SvufIcg5v3vTnZaJ.PPxODtmmQrGYLthZyFhTZG/l3AKduvW4FJ6
    console.log("@ result.user_pw", result.user_pw); //원래는 dataValues안에 있는데 직접 접근이 가능한가 봄

    const isPwEqual = await bcrypt.compare(inputUserPw, result.user_pw);
    if (isPwEqual) {
      //jwt토큰 발행
      const token = jwt.sign({ id: result.user_id }, process.env.SECRET, {
        expiresIn: "1h",
      });
      console.log("@ token: ", token); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4Njk0MjEzLCJleHAiOjE3MDg2OTc4MTN9.HxlLJqRtLFvkB4XwU9_wSj96Y-5A9kD3KZxFSWGlrE0
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "비밀번호가 틀립니다" });
    }
  } else {
    res.json({ success: false, message: "해당 아이디가 존재하지 않습니다." });
  }
};

//회원 별명 조회
exports.username = async (req, res) => {
  console.log("=================username=====================");
  const { id } = req.user; //auth 미들웨어에서 보내주는값
  console.log("@ next()로 추가된 req.user: ", req.user);
  //findByPk
  //const find = await User.findOne({ where: { id } });

  const result = await User.findOne({ where: { user_id: id } });
  console.log("result", result);
  //   const result = await User.findByPk(id, {
  //     attributes: ["user_id", "user_name"],
  //   });
  res.json({ success: true, result });
};
// //회원조회 (지금 사용 안하는중)
// exports.find = async (req, res) => {
//   console.log("=================find=====================");
//   const { id } = req.user; //auth 미들웨어에서 보내주는값
//   console.log("@ req: ", req);
//   console.log("@ next()로 추가된 req.user: ", req.user);
//   //findByPk
//   //const find = await User.findOne({ where: { id } });
//   const result = await User.findByPk(id, {
//     attributes: ["user_id", "user_pw"],
//     include: [
//       { model: Profile, attributes: ["user_name", "age", "user_email"] },
//     ],
//   });
//   console.log("result = User.findByPk()", result);
//   res.json({ success: true, result });
// };

//정보수정 (지금 사용 안하는중)
exports.update = async (req, res) => {
  const {
    user_id: inputUserId,
    user_pw: inputUserPw,
    user_name: inputUserName,
    user_email: inputUserEmail,
    user_gender: inbputUserGender,
  } = req.body;

  const { id } = req.user;
  const encryptedPw = await bcrypt.hash(inputUserPw, 11); // 데이터 암호화

  const result = await User.update(
    {
      user_id: inputUserId,
      user_pw: encryptedPw,
      user_name: inputUserName,
      user_email: inputUserEmail,
      user_gender: inbputUserGender,
    },
    { where: { user_id: id } }
  );
  console.log("update", result);
  res.json({ success: true });
};

//회원탈퇴 (지금 사용 안하는중)
exports.delete = async (req, res) => {
  const { id } = req.user;
  const result = await User.destroy({ where: { user_id: id } });
  console.log("delete", result);
  res.json({ success: true });
};

//유저 플리 추가: http://localhost:8000/api/user/addList
exports.addList = async (req, res) => {
  const { musicId } = req.body;
  const { id } = req.user;
  const data = await User.findOne({ where: { user_id: id } });
  // 이미 개인 플레이리스트에 추가했던 곡이 존재한다면 중복(음악) 방지 메세지 출력
  const find = await PlayList.findOne({ where: { musicId } });
  if (find) {
    res.json({ success: false });
  } else {
    await PlayList.create({ userId: data.id, musicId: musicId });
    res.json({ success: true });
  }
};
//유저 플리곡 삭제: http://localhost:8000/api/user/deleteList
exports.deleteList = async (req, res) => {
  const { musicId } = req.body;
  const { id } = req.user;
  const data = await User.findOne({ where: { user_id: id } });
  const result = await PlayList.destroy({
    where: { userId: data.id, musicId: musicId },
  });
  res.json({ success: true, result });
};

//유저 플레이리스트 조회: http://localhost:8000/api/user/list
exports.list = async (req, res) => {
  const musicData = [];
  const { id } = req.user;
  const data = await User.findOne({ where: { user_id: id } });
  const result = await PlayList.findAll({ where: { userId: data.id } });
  for (let i = 0; i < result.length; i++) {
    musicData.push(await Music.findOne({ where: { id: result[i].musicId } }));
  }
  res.json({ result, musicData });
};

// users Table user_id(아이디)
// lists Table userId(users Table id)

//유저 좋아요 버튼: http://localhost:8000/api/user/addLike
exports.addLike = async (req, res) => {
  const { musicId } = req.body;
  const { id } = req.user;
  const data = await User.findOne({ where: { user_id: id } });
  // 이미 개인 플레이리스트에 추가했던 곡이 존재한다면 중복(음악) 방지 메세지 출력
  const find = await LikeList.findOne({ where: { musicId } });
  if (find) {
    res.json({ success: false });
  } else {
    await LikeList.create({ userId: data.id, musicId: musicId });
    res.json({ success: true });
  }
};

//유저 플리곡 삭제: http://localhost:8000/api/user/deleteLike
exports.deleteLike = async (req, res) => {
  const { musicId } = req.body;
  const { id } = req.user;
  const data = await User.findOne({ where: { user_id: id } });
  const result = await LikeList.destroy({
    where: { userId: data.id, musicId: musicId },
  });
  res.json({ success: true, result });
};

//유저 좋아요 조회: http://localhost:8000/api/user/like
exports.like = async (req, res) => {
  const musicData = [];
  const { id } = req.user;
  const data = await User.findOne({ where: { user_id: id } });
  const result = await LikeList.findAll({ where: { userId: data.id } });
  for (let i = 0; i < result.length; i++) {
    musicData.push(await Music.findOne({ where: { id: result[i].musicId } }));
  }
  res.json({ result, musicData });
};

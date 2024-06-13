const express = require("express");
const controller = require("../controller/Cuser");
const middleware = require("../middleware"); //사용자 인증정보 미들웨어 추가

const router = express.Router();

//POST /signup 회원가입
router.post("/signup", controller.signup);
//POST /login 로그인
router.post("/login", controller.login);

//GET /username 별명 조회
router.get("/username", middleware.auth, controller.username);

// //GET /profile 회원조회
// router.get("/profile", middleware.auth, controller.find);
// //PATCH /update 정보수정
// router.patch("/update", middleware.auth, controller.update);
// //DELETE /delete 회원탈퇴
// router.delete("/delete", middleware.auth, controller.delete);

//POST /addList 개인의 플레이리스트 목록 추가
router.post("/addList", middleware.auth, controller.addList);
//POST /deleteList 개인 플레이리스트 곡 삭제
router.post("/deleteList", middleware.auth, controller.deleteList);

//GET /list 개인 플레이리스트 목록 조회
router.get("/list", middleware.auth, controller.list);

//POST /addLike 개인의 좋아요 목록 추가
router.post("/addLike", middleware.auth, controller.addLike);

//POST /deleteLike 개인 좋아요 곡 삭제
router.post("/deleteLike", middleware.auth, controller.deleteLike);

//GET /like 개인 좋아요 목록 조회
router.get("/like", middleware.auth, controller.like);

module.exports = router;

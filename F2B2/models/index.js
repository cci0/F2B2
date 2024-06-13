"use strict";

// const fs = require('fs');
// const path = require('path');
const Sequelize = require("sequelize");
// const process = require('process');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
//모델
// db.Member = require("./member")(sequelize);
// db.Profile = require("./profile")(sequelize);
db.User = require("./user")(sequelize);
db.Music = require("./music")(sequelize);
db.PlayList = require("./playList")(sequelize);
db.LikeList = require("./likeList")(sequelize);

db.User.hasOne(db.PlayList, { foreignKey: "userId", onDelete: "CASCADE" });
db.PlayList.belongsTo(db.User, { foreignKey: "userId", onDelete: "CASCADE" });
db.LikeList.belongsTo(db.User, { foreignKey: "userId", onDelete: "CASCADE" });
db.LikeList.belongsTo(db.Music, { foreignKey: "musicId", onDelete: "CASCADE" });

db.Music.hasOne(db.PlayList, { foreignKey: "musicId", onDelete: "CASCADE" });
db.PlayList.belongsTo(db.Music, { foreignKey: "musicId", onDelete: "CASCADE" });
//1:1 Profile 외래키 설정: memberId ==> Member 테이블 속성 기본키 id 참조
// console.log("Member 테이블과 Profile 테이블의 Join");
// db.Member.hasOne(db.Profile, { foreignKey: "memberId", onDelete: "CASCADE" }); //foreignKey: 'memberId': Profile 모델에서 참조하는 외래 키
// db.Profile.belongsTo(db.Member, {
//   foreignKey: "memberId",
//   onDelete: "CASCADE",
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

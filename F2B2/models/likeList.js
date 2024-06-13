const { DataTypes } = require("sequelize");

// List 테이블 속성: id(pk) + userId(외래키) + musicId(외래키)
const LikeModel = (sequelize) => {
  return sequelize.define("like", {}, { timestamps: false });
};

module.exports = LikeModel;

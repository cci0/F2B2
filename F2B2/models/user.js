const { DataTypes } = require("sequelize");

// user 테이블 속성: id(pk) + 사용자 아이디 + 사용자 비밀번호
const userModel = (sequelize) => {
  return sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.STRING(31),
        allowNull: false,
      },
      user_pw: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    // { freezeTableName: true, timestamps: false }
    { timestamps: false }
  );
};

module.exports = userModel;

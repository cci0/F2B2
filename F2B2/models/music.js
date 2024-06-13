const { DataTypes } = require('sequelize');

const MusicModel = (sequelize) => {
    return sequelize.define(
        'music',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            music_mp3: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            album_img: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            album_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            music_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            artist_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            genre: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            rel_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            chart: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        { timestamps: false }
    );
};
module.exports = MusicModel;

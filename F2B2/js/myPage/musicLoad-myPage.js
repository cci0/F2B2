// 페이지 로드 시 음악 목록을 가져와서 표시
(async function () {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/user/list',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const { musicData } = res.data;
        const playlistList = document.querySelector('#playlist_list');

        musicData.forEach((music) => {
            const playlistHtml = `
                        <li class="album-move-li">
                            <input type="checkbox" class="playlist-checkbox" />
                            <div class="album-img">
                                <img src="../album_img/all/${music.album_img}" alt="album-img" />
                            </div>
                            
                            <div class="music-info">
                                <span class="music-name">${music.music_name}</span>
                                <div class="artist-name">${music.artist_name}</div>
                            </div>
                            <audio src="/music/${music.genre}/${music.music_mp3}" preload="none"></audio>
                            <button type="button" class="play-button"><i class="fa-solid fa-play"></i></button>
                            <button type="button" class="delete-button" onclick="deleteList(${music.id},'${music.music_name}')">삭제</i></button>
                        </li>`;
            playlistList.insertAdjacentHTML('beforeend', playlistHtml);
        });
    } catch (error) {
        console.log(error);
    }
})();

// 페이지 로드 시 좋아요 목록을 가져와서 표시
(async function () {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/user/like',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const { musicData } = res.data;
        const favoriteList = document.querySelector('#favorite_music_list');

        musicData.forEach((music) => {
            const favoriteHtml = `
                        <li class="album-move-li">
                            <input type="checkbox" class="favorite-checkbox" />
                            <div class="album-img">
                                <img src="../album_img/all/${music.album_img}" alt="album-img" />
                            </div>
                            <button type="button" class="delete-button" onclick="deleteLike(${music.id},'${music.music_name}')"><i class="fas fa-heart"></i></button>
                            <div class="music-info">
                                <span class="music-name">${music.music_name}</span>
                                <div class="artist-name">${music.artist_name}</div>
                            </div>
                            <audio src="/music/${music.genre}/${music.music_mp3}" preload="none"></audio>
                            <button type="button" class="play-button"><i class="fa-solid fa-play"></i></button>
                        </li>`;
            favoriteList.insertAdjacentHTML('beforeend', favoriteHtml);
        });
    } catch (error) {
        console.log(error);
    }
})();

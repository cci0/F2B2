//Pc기준 음원 차트 데이터 불러오기//////////////////////////////////////////////
(async function () {
    const chartData = await axios({
        method: 'GET',
        url: 'api/music/chart',
    });
    console.log('@@@@ chartData', chartData);
    for (let i = 0; i <= 9; i++) {
        let title = document.querySelector(`#title${i}`);
        let artist = document.querySelector(`#artist${i}`);
        let album_td = document.querySelector(`#album_img${i}`);
        let album_img = document.createElement('img');
        album_img.setAttribute('src', `/album_img/all/${chartData.data.result[i].album_img}`);
        album_img.style.width = '60px';
        album_img.style.height = '50px';
        album_td.appendChild(album_img);
        title.textContent = chartData.data.result[i].music_name;
        artist.textContent = chartData.data.result[i].artist_name;
    }
    console.log(chartData);
})();
//모바일기준 음원 차트 데이터 불러오기//////////////////////////////////////////////
(async function () {
    const chartData = await axios({
        method: 'GET',
        url: 'api/music/chart',
    });
    console.log(chartData);
    for (let i = 0; i < chartData.data.result.length; i++) {
        let album_div = document.querySelector(`#mobile-img${i}`);
        let title = document.querySelector(`#mobile-title${i}`);
        let artist = document.querySelector(`#mobile-artist${i}`);
        let album_img = document.createElement('img');
        // console.log(chartData.data.result[i].album_img);/
        album_img.setAttribute('src', `/album_img/all/${chartData.data.result[i].album_img}`);
        album_img.style.width = '35px';
        album_img.style.height = '40px';
        album_div.appendChild(album_img);
        title.textContent = chartData.data.result[i].music_name;
        artist.textContent = chartData.data.result[i].artist_name;
    }
    console.log(chartData);
})();

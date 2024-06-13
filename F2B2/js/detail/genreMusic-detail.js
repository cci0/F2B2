//PC 기준 장르 음악 불러오기///////////////////////////////////////////
(async function () {
    const [_, url] = document.location.href.split('http://localhost:8000/music/detail/');
    const genre = decodeURIComponent(url);
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/music/getMusic/${genre}`,
            params: { genre: `${genre}` },
        });
        console.log('@@@@ res', res);
        try {
            for (let i = 0; i < res.data.result.length; i++) {
                document.querySelector(`#title${i}`).textContent = res.data.result[i].music_name;
                document.querySelector(`#artist${i}`).textContent = res.data.result[i].artist_name;
                document
                    .querySelector(`#album_img${i}`)
                    .setAttribute('src', `/album_img/${genre}/${res.data.result[i].album_img}`);
                document.querySelector(`#album_img${i}`).style.width = '60px';
                document.querySelector(`#album_img${i}`).style.height = '50px';
            }
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
})();
//모바일 기준 장르 음악 불러오기///////////////////////////////////////////
(async function () {
    const [_, url] = document.location.href.split('http://localhost:8000/music/detail/');
    const genre = decodeURIComponent(url);
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/music/getMusic/${genre}`,
            params: { genre: `${genre}` },
        });
        console.log('@@@@ res', res);
        try {
            for (let i = 0; i < res.data.result.length; i++) {
                document.querySelector(`#mobile-title${i}`).textContent = res.data.result[i].music_name;
                document.querySelector(`#mobile-artist${i}`).textContent = res.data.result[i].artist_name;
                let img_div = document.querySelector(`#mobile-img${i}`);
                let img = document.createElement('img');
                img.setAttribute('src', `/album_img/${genre}/${res.data.result[i].album_img}`);
                img.style.width = '40px';
                img.style.height = '40px';
                img_div.appendChild(img);
            }
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
})();

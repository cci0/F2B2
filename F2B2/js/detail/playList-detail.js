//playList 추가하기//////////////////////////////////////////////
async function playList1() {
    const music_name = document.querySelector('#title0').textContent;
    await playListFunc(music_name);
}
async function playList2() {
    const music_name = document.querySelector('#title1').textContent;
    await playListFunc(music_name);
}
async function playList3() {
    const music_name = document.querySelector('#title2').textContent;
    await playListFunc(music_name);
}
async function playList4() {
    const music_name = document.querySelector('#title3').textContent;
    await playListFunc(music_name);
}
async function playList5() {
    const music_name = document.querySelector('#title4').textContent;
    await playListFunc(music_name);
}
async function playList6() {
    const music_name = document.querySelector('#title5').textContent;
    await playListFunc(music_name);
}
async function playList7() {
    const music_name = document.querySelector('#title6').textContent;
    await playListFunc(music_name);
}
async function playList8() {
    const music_name = document.querySelector('#title7').textContent;
    await playListFunc(music_name);
}
async function playList9() {
    const music_name = document.querySelector('#title8').textContent;
    await playListFunc(music_name);
}
async function playList10() {
    const music_name = document.querySelector('#title9').textContent;
    await playListFunc(music_name);
}
async function playListFunc(music_name) {
    const musicData = await axios({
        method: 'POST',
        url: '/api/music/findMusic',
        data: {
            music_name,
        },
    });
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/user/addList',
            data: {
                musicId: musicData.data.result.id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('@@@ res', res);
        if (res.data.success) {
            alert(`${music_name}곡이 플레이리스트에 추가되었습니다`);
        } else {
            alert(`${music_name}곡이 이미 플레이리스트에 존재합니다`);
        }
    } catch (error) {
        if (error.response.data) {
            const { success } = error.response.data;
            if (success === false) {
                alert('로그인을해야 음악을 추가할 수 있습니다.');
            }
        }
        // errorFunc(error);
    }
}

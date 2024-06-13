async function likeList1() {
    const music_name = document.querySelector('#title0').textContent;
    await likeListFunc(music_name);
}
async function likeList2() {
    const music_name = document.querySelector('#title1').textContent;
    await likeListFunc(music_name);
}
async function likeList3() {
    const music_name = document.querySelector('#title2').textContent;
    await likeListFunc(music_name);
}
async function likeList4() {
    const music_name = document.querySelector('#title3').textContent;
    await likeListFunc(music_name);
}
async function likeList5() {
    const music_name = document.querySelector('#title4').textContent;
    await likeListFunc(music_name);
}
async function likeList6() {
    const music_name = document.querySelector('#title5').textContent;
    await likeListFunc(music_name);
}
async function likeList7() {
    const music_name = document.querySelector('#title6').textContent;
    await likeListFunc(music_name);
}
async function likeList8() {
    const music_name = document.querySelector('#title7').textContent;
    await likeListFunc(music_name);
}
async function likeList9() {
    const music_name = document.querySelector('#title8').textContent;
    await likeListFunc(music_name);
}
async function likeList10() {
    const music_name = document.querySelector('#title9').textContent;
    await likeListFunc(music_name);
}
async function likeListFunc(music_name) {
    const musicData = await axios({
        method: 'POST',
        url: '/api/music/findMusic',
        data: {
            music_name,
        },
    });
    // console.log('@@@@ res', musicData);
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/user/addLike',
            data: {
                musicId: musicData.data.result.id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('@@@ res', res);
        if (res.data.success) {
            alert(`${music_name}곡이 좋아요에 추가되었습니다`);
        } else {
            alert(`${music_name}곡이 이미 좋아요에 존재합니다`);
        }
    } catch (error) {
        errorFunc(error);
    }
}
// 에러처리 함수
function errorFunc(error) {
    if (error.response.data) {
        const { success } = error.response.data;
        if (success === false) {
            alert('로그인을해야 음악을 추가할 수 있습니다.');
        }
    }
}

async function musicStart1() {
    const music_name = document.querySelector('#title0').textContent;
    musicStartFunc(music_name);
}
async function musicStart2() {
    const music_name = document.querySelector('#title1').textContent;
    musicStartFunc(music_name);
}
async function musicStart3() {
    const music_name = document.querySelector('#title2').textContent;
    musicStartFunc(music_name);
}
async function musicStart4() {
    const music_name = document.querySelector('#title3').textContent;
    musicStartFunc(music_name);
}
async function musicStart5() {
    const music_name = document.querySelector('#title4').textContent;
    musicStartFunc(music_name);
}
async function musicStart6() {
    const music_name = document.querySelector('#title5').textContent;
    musicStartFunc(music_name);
}
async function musicStart7() {
    const music_name = document.querySelector('#title6').textContent;
    musicStartFunc(music_name);
}
async function musicStart8() {
    const music_name = document.querySelector('#title7').textContent;
    musicStartFunc(music_name);
}
async function musicStart9() {
    const music_name = document.querySelector('#title8').textContent;
    musicStartFunc(music_name);
}
async function musicStart10() {
    const music_name = document.querySelector('#title9').textContent;
    musicStartFunc(music_name);
}
async function musicStartFunc(music_name) {
    const audio_bar = document.querySelector('#audio_bar');
    document.querySelector('#audiobar').hidden = false;
    audio_bar.setAttribute('src', '');
    const musicData = await axios({
        method: 'POST',
        url: '/api/music/findMusic',
        data: {
            music_name,
        },
    });
    audio_bar.setAttribute('src', `/music/all/${musicData.data.result.music_mp3}`);
    $('audio').attr('controlsList', 'nodownload');
    audio_bar.play();
}

// 좋아요 삭제 기능
async function deleteLike(musicId, music_name) {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/user/deleteLike',
            data: { musicId },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (res.data.success) {
            if (!confirm('해당 곡을 삭제하시겠습니까?')) {
                return;
            }
            alert(`${music_name}곡이 삭제 되었습니다.`);
            document.location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}

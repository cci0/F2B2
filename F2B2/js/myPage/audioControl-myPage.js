// 하트 버튼 클릭 이벤트 처리
$(document).on('click', '.bb1, .delete-button', function () {
    toggleFavorite(this);
});

// 재생 버튼 클릭 이벤트 처리
$(document).on('click', '.play-button', function () {
    const button = $(this);
    const audio = button.closest('.album-move-li').find('audio')[0];

    // 오디오가 재생 중인지 확인
    const isPlaying = !audio.paused;

    // 재생 중이라면 일시 정지하고 아이콘 변경
    if (isPlaying) {
        audio.pause();
        button.find('i').removeClass('fa-pause').addClass('fa-play'); // 아이콘 변경
    } else {
        // 일시 정지 중이라면 재생하고 아이콘 변경
        audio
            .play()
            .then(() => {
                button.find('i').removeClass('fa-play').addClass('fa-pause'); // 아이콘 변경
            })
            .catch((error) => {
                console.error('Error playing audio:', error);
            });
    }

    // 오디오 재생이 끝나면 페이지 새로고침
    audio.addEventListener('ended', function () {
        location.reload();
    });
});

$(document).ready(function () {
    $('.favorite-checkbox-all').change(function () {
        // favorite-checkbox 모두 체크/해제
        $('.favorite-checkbox').prop('checked', this.checked);
    });

    $('.favorite-checkbox').change(function () {
        // 모든 favorite-checkbox가 체크되었는지 확인
        const allChecked = $('.favorite-checkbox:checked').length === $('.favorite-checkbox').length;
        $('.favorite-checkbox-all').prop('checked', allChecked);
    });

    $('.playlist-checkbox-all').change(function () {
        // playlist-checkbox 모두 체크/해제
        $('.playlist-checkbox').prop('checked', this.checked);
    });

    $('.playlist-checkbox').change(function () {
        // 모든 playlist-checkbox가 체크되었는지 확인
        const allChecked = $('.playlist-checkbox:checked').length === $('.playlist-checkbox').length;
        $('.playlist-checkbox-all').prop('checked', allChecked);
    });
});

// 로그인 관련
(async function () {
    if (localStorage.getItem('token')) {
        const res = await axios({
            method: 'GET',
            url: 'api/user/username',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        document.querySelector('#navLoginButton').textContent = '로그아웃';
        document.querySelector('#sideLoginButton').textContent = '로그아웃';

        document.querySelector('#navSignupButton').textContent = `${res.data.result.user_id}님 환영합니다.`;
        document.querySelector('#sideSignupButton').textContent = `${res.data.result.user_id}님 환영합니다.`;
    }
})();

////////////////////////////////////////////////////////////

$('#navSignupButton').click(function (event) {
    if (localStorage.getItem('token')) {
        event.preventDefault();
    }
});

$('#sideSignupButton').click(function (event) {
    if (localStorage.getItem('token')) {
        event.preventDefault();
    }
});

function loginButtonClick() {
    if (localStorage.getItem('token')) {
        //로그인 되어있으면
        alert('로그아웃 되었습니다');
        localStorage.removeItem('token');
        document.location.href = '/';
    } else {
        document.location.href = '/login';
    }
}
$('#navLoginButton').click(function (event) {
    event.preventDefault();
    loginButtonClick();
});

$('#sideLoginButton').click(function (event) {
    event.preventDefault();
    loginButtonClick();
});

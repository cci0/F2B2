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

        // document.querySelector(
        //   "#navSignupButton"
        // ).textContent = `${res.data.result.user_id}님 \r\n환영합니다.`;
        document.querySelector('#navSignupButton').innerHTML = `${res.data.result.user_id}님 <br> 환영합니다.`;

        document.querySelector(
            '#navSignupButton'
        ).innerHTML = `<div style = "text-align : right; font-size:24px;" >${res.data.result.user_id}님 <br> 환영합니다.</div>`;
        document.querySelector(
            '#sideSignupButton'
        ).innerHTML = `<div style = "text-align : right; font-size:20px;" >${res.data.result.user_id}님 <br> 환영합니다.</div>`;
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
////////////////////////////////////////////////////////////
function myPageButtonClick() {
    if (localStorage.getItem('token')) {
        //로그인 되어있으면
        document.location.href = '/myPage';
    } else {
        alert('로그인을 해야 이용할 수 있습니다.');
        document.location.href = '/login';
    }
}
$('#navmyPageButton').click(function (event) {
    event.preventDefault();

    myPageButtonClick();
});
$('#sidemyPageButton').click(function (event) {
    event.preventDefault();

    myPageButtonClick();
});

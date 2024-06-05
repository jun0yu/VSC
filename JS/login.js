function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수


const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;
    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);
    // Sanitized된 값과 원본 입력 값 비교
   if (sanitizedInput !== input) {
    // XSS 공격 가능성 발견 시 에러 처리
   alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
    return false;
    }
    // Sanitized된 값 반환
   return sanitizedInput;
};

    
const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput= document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
     // 전역 변수 추가, 맨 위 위치
    const idsave_check = document.getElementById('idSaveCheck');
    const c = '아이디, 패스워드를체크합니다';
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    if (emailValue === '') {
    alert('이메일을입력하세요.');
    return false;
    }
    if (passwordValue === '') {
    alert('비밀번호를입력하세요.');
    return false;
    }


    if (emailValue.length < 5) {
        alert('아이디는최소5글자이상입력해야합니다.');
        return false;
        }
        if (passwordValue.length < 12) {
        alert('비밀번호는반드시12글자이상입력해야합니다.');
        return false;
        }
        const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/) !== null;
        if (!hasSpecialChar) {
        alert('패스워드는특수문자를1개이상포함해야합니다.');
        return false;
        }
        const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
        const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
        if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는대소문자를1개이상포함해야합니다.');
        return false;
        }
        const sanitizedPassword = 
        check_xss(passwordValue);
         // check_xss 함수로 비밀번호 Sanitize
         const sanitizedEmail = check_xss(emailValue);
         // check_xss 함수로 비밀번호 Sanitize
         if (!sanitizedEmail) {
         // Sanitize된 비밀번호 사용
        return false;
         }
         if (!sanitizedPassword) {
         // Sanitize된 비밀번호 사용
        return false;
         }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    if(idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    }
    else
    { // 아이디 체크 x
        setCookie("id", emailValue, 0); //날짜를 0 - 쿠키 삭제
    }

    session_set(); // 세션 생성
    loginForm.submit();

};

   
    function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
        const emailInput = document.getElementById('typeEmailX');
         const idsave_check = document.getElementById('idSaveCheck');
         let get_id = getCookie("id");
         if(get_id) {
         emailInput.value = get_id;
         idsave_check.checked = true;
         }
         session_check(); // 세션 유무 검사
         }

         function logout(){
            session_del(); // 세션 삭제
           location.href='../index.html';
            }
document.getElementById("login_btn").addEventListener('click', check_input);
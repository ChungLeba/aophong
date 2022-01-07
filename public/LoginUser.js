async function login (){
    const email = $('#email').val()
    const password = $('#password').val()
    try {
        const data = await $.ajax({
            url:'/user/login',
            type:'POST',
            data:{email, password}
        })
        if(data.status === 200){
            setCookie('userToken', data.token, 7)
            window.location.href = '/home'
        }
    } catch (error) {
        console.log(error);
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
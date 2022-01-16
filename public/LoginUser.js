async function login (){
    const email = $('#email').val()
    const matkhau = $('#password').val()
    console.log(email,matkhau );
    try {
        const data = await $.ajax({
            url:'/c/login',
            type:'POST',
            data:{email, matkhau}
        })
        console.log(data);
        if(data.status === 200){
            setCookie('userToken', data.userToken, 7)
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
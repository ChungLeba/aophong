async function login() {
    try {
    let email = $('#username').val()
    let matkhau = $('#password').val()
    let res = await $.ajax({
        url:"/c/login",
        type:"POST",
        data: { email, matkhau }
    })
    if(res.status == 200) {
        console.log(res.mess)     
        setCookie('userToken', res.userToken, 1)
        window.location.href="/home"
        }else {
        $('.notify').html(`Admin: ${res.mess}`)
        }
    } catch (error) {
        console.log(error)
    }
}
$.ajax({
    type:"GET",
    url:"/checkLogin"
})
.then(data => {
    if(data.status == 200) {
        window.location.href = '/home'
    }
})
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
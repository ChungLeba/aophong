async function register() {
    try {
        let email = $('#username').val();
        let matkhau = $('#password').val();
        let confirm_password = $('#confirm_password').val();
        let ketqua = await $.ajax({
            type: "POST",
            url: `/c`,
            data: {
                email,
                matkhau,
                confirm_password
            }
        })
             console.log(ketqua)
    } catch (error) {
       console.log(error) 
    }
}
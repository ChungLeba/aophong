const link = window.location.href
var array = link.split('/')
const code = array[array.length - 1]
var size
var color
var dulieura3 = 1;
var dl1 = 0;
var dl2 = 0;
var j = 0;
var Length = 0;
var arrimgurl = []
var codeSize = []
$.ajax({
  type: "GET",
  url: "/aothun/code/" + code

})
  .then(data => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let name = `${data[i].ten}`
      $(".name").html(name)
      let gia = `${data[i].gia}đ`
      $(".giasp").html(gia)
      let mota = ` <ul><li>${data[i].mota}</li></ul>	`
      $(".rte").html(mota)
      let artist = `Artist: ${data[i].thuonghieu}`
      $(".a_name").html(artist)
      let coler = `<div onclick ='CLI("${data[i].mausac}")' class='colorItem colorItem${data[i].mausac.slice(1, data[i].mausac.length)}' style = 'background :${data[i].mausac};'>
          </div>`
      $(".listcolor").append(coler)


      //onclick  mouseover
    }

    for (let i = 0; i < data.length; i++) {

      if (!codeSize.includes(data[i].size)) {
        codeSize.push(data[i].size)
      }
    }
    for (let i = 0; i < codeSize.length; i++) {
      let Size = `<div onclick ='CLZ("${codeSize[i]}")' class='colorsize colorsize${codeSize[i]}'> <p class='Sizee'>${codeSize[i]}</p>
  </div>`
      $(".listsize").append(Size)

    }
  })
  .catch(err => { console.log(err); })

function CLZ(i) {
  console.log(i);
  size = i
  let bder = ` .colorsize${i}{
    border: solid 1px #e4393c;}
  `
  $(".CSSS").html(bder)

}
function CLI(a) {
  console.log(a);
  color = a.slice(1, a.length)
  let bder = ` .colorItem${color}{
    border: solid 1px #e4393c;}
  `
  $(".CSSSS").html(bder)

}
function logo() {
  window.location.href = 'http://localhost:3000/home'
}
function giohang() {
  window.location.href = 'http://localhost:3000/Gio_Hang'
}
async function them() {
  try {
    dulieura3 = $(".number").val();
   // console.log(dulieura3);
    const data = await $.ajax({
      type: "GET",
      url: "/aothun/find/" + code + `?size=${size}&color=${color}`

    })
    if (data) {
      let htmll=`<p> Đã thêm vào giỏ hàng </p>`
      $(".contennnn").html(htmll)
      let time1=setTimeout(function(){
        let htmlll=``
        $(".contennnn").html(htmlll)
        },3000);// 
  
      console.log(84, data);
      const dt = await $.ajax({
        type: "POST",
        url: "/cart/add-to-cart/" + data._id,
        data: {
          aothunID: data._id,
          gia: data.gia,
          soluong: dulieura3
        },
      })
      if (dt) {
        console.log(dt);
      }
      
    }
    else{
      let htmll1=`<p> Chưa chọn màu hoặc size </p>`
      $(".contennnn").html(htmll1)
      let time1=setTimeout(function(){
        let htmlll2=``
        $(".contennnn").html(htmlll2)
    },3000);//
    }
   }
    catch (error) {
      console.log(error)

    }


  }
  async function muahang() {
    try {
      dulieura3 = $(".number").val();
     // console.log(dulieura3);
      const data = await $.ajax({
        type: "GET",
        url: "/aothun/find/" + code + `?size=${size}&color=${color}`
  
      })
      if (data) {
        let htmll=`<p> Đã thêm vào giỏ hàng </p>`
        $(".contennnn").html(htmll)
        let time1=setTimeout(function(){
          let htmlll=``
          $(".contennnn").html(htmlll)
          },3000);// 
    
        console.log(84, data);
        const dt = await $.ajax({
          type: "POST",
          url: "/cart/add-to-cart/" + data._id,
          data: {
            aothunID: data._id,
            gia: data.gia,
            soluong: dulieura3
          },
        })
        if (dt) {
          window.location.href = 'http://localhost:3000/Thanh_toan'
        }
        
      }
      else{
        let htmll1=`<p> Chưa chọn màu hoặc size </p>`
        $(".contennnn").html(htmll1)
        let time1=setTimeout(function(){
          let htmlll2=``
          $(".contennnn").html(htmlll2)
      },3000);//
      }
     }
      catch (error) {
        console.log(error)
  
      }
  
  
    }



$.ajax({
  type: "GET",
  url: "/aothun/code/" + code

})
  .then(data => {

    for (let i = 0; i < data.length; i++) {
      arrimgurl = arrimgurl.concat(data[i].imgurl)
    }
    Length = arrimgurl.length;
    for (let i = 0; i < arrimgurl.length; i++) {
      let img = `
      <img class='arrimgC arrimgC${i}' src='http://localhost:3000/public/uploads/${arrimgurl[i]}'>   
      `
      $(".page1").append(img)
      $(`.arrimgC${i}`).on('click', function () {
        $(".imggg").html(img)
      })
    }
    let imgma = `
  <img class='arrimgL' src='http://localhost:3000/public/uploads/${arrimgurl[j]}'>   
  `
    $(".imggg").html(imgma)

  })
  .catch(err => {
    console.log(err);
  })





$(".next1").on('click', function () {
  // let move = 
  $('.page1').animate({ "right": "+=168px" }, "slow")
  j += 2;
  if (j <= Length) {
    let imgma = `
  <img class='arrimgL' src='http://localhost:3000/public/uploads/${arrimgurl[j]}'>   
  `
    $(".imggg").html(imgma)
  }

})

$(".back1").on('click', function () {
  // let move = 
  $('.page1').animate({ "right": "-=168px" }, "slow")
  j -= 2;
  if (j >= 0) {
    let imgma = `
  <img class='arrimgL' src='http://localhost:3000/public/uploads/${arrimgurl[j]}'>   
  `
    $(".imggg").html(imgma)
  }

})
function taotaikhoan() {
  window.location.href = 'http://localhost:3000/logon'

}
function dangnhap() {
  window.location.href = 'http://localhost:3000/login'
}
function dangxuat() {

  //...logout
  $.ajax({
    type: "GET",
    url: "/admin/logout"
  })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  window.location.href = 'http://localhost:3000/login'
  let SM5 = `
   <li onclick="dangnhap()">Đăng Nhập</li>
   <li onclick="taotaikhoan()">Tạo Tài Khoản</li>
   `
  $(".subMenu5").html(SM5)
}

$.ajax({
  url: '/user/check',
  type: 'POST'
}).then((data) => {
  if (data.status === 200) {
    let SM5 = ` <li onclick="dangxuat()">Đăng Xuất</li>`
    $(".subMenu5").html(SM5)
  }
}).catch(err => {
  console.log(135, err);
})



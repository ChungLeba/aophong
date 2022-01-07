$('.next').on('click', function(){
    // let move = 
    $('.listData').animate({ "right": "+=1550px" }, "slow" )
  })
  
  $('.back').on('click', function(){
    // let move = 
    $('.listData').animate({ "right": "-=1550" }, "slow" )
  })
  $.ajax({
    type :"GET",
    url:"/aothun"
  
})
.then(function(data){
console.log(17,data);
let Length=data.length;
console.log(19,Length);
var codeArr = []

for( let i = 0; i<Length ; i++){
 
  if( !codeArr.includes(data[i].masanpham) ){
    codeArr.push(data[i].masanpham)
  }
}

console.log(26,codeArr.length);
console.log(29,codeArr);
codeArr.map(function(value, index){
  console.log(31,value);
  let html = `
  <div class="spnho" onclick = 'gotoDetail("${value}")'>
    
    <div class='img${value}'>

    </div>
    <div class='name${value} tensanphan'>

    </div>
    
    <div class='giatien${value} giatiensanpham'style = 'color: #a74939;'>

    </div>
    <div class = 'listColor${value} mausac'>
      
    </div>
  </div>
  `
  $('.listData').append(html)
  for( let i = 0; i < data.length ; i++){
    if(data[i].masanpham === value){
      let color = `
      <div class='colorItem colorItem${i}' style = 'background : ${data[i].mausac};'>
      </div>
      `
      $(`.listColor${value}`).append(color)
      let img = `
      <img class='anhmoi' src='public/uploads/${data[i].imgurl[0]}'>
      `
      $(`.img${value}`).html(img)
      let gia=`
      <b>${data[i].gia}đ</b>
      `
      $(`.giatien${value}`).html(gia)
      let name=`
      <p>${data[i].ten}</p>
      `
      $(`.name${value}`).html(name)
  

      $(`.colorItem${i}`).on('mouseover', function(){
      $(`.img${value}`).html(img)
      $(`.name${value}`).html(name)
      $(`.giatien${value}`).html(gia)
      })
    }
  }
})
})
.catch(function(err){
     console.log(err);
});

function gotoDetail(code){
  //window.location.href = 'http://localhost:3000/detail/'+code
  //localhost:3000/aothun/luucode?k=1&codel=code
  $.ajax({
    type :"GET",
    url:"/aothun/luucode?k=1&codel="+code
  
})

  window.location.href = 'http://localhost:3000/detail/'+code;

  
}
//<a class="xemtatca" title="Xem tất cả">XEM TẤT CẢ</a>
function taotaikhoan(){
 window.location.href = 'http://localhost:3000/logon'

}
function dangnhap(){
  window.location.href = 'http://localhost:3000/login'
}
function dangxuat(){
 
  //...logout
$.ajax({
    type :"GET",
    url:"/admin/logout" 
})
.then(data=>{
  console.log(data);
})
.catch(err=>{
  console.log(err);
})
  window.location.href = 'http://localhost:3000/login'
  let SM5 =`
  <li onclick="dangnhap()">Đăng Nhập</li>
  <li onclick="taotaikhoan()">Tạo Tài Khoản</li>
  `
  $(".subMenu5").html(SM5)
}

$.ajax({
  url:'/user/check',
  type:'POST'
}).then((data)=>{
  if(data.status === 200){
    let SM5 =` <li onclick="dangxuat()">Đăng Xuất</li>`
    $(".subMenu5").html(SM5)
  }
}).catch(err=>{
  console.log(135, err);
})
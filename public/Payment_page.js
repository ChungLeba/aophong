



async function order(){
  try {
    // const email = $('.email').val()
    const ten = $('.ten').val()
    const sdt = $('.sdt').val()
    const diachi = $('.diachi').val()
     //console.log(11,email, ten, sdt, diachi);
    if(ten!=''||sdt!=''||diachi!=''){
       const res = await $.ajax({
      url:'/order/order/add',
      type:'POST',
      data:{tennguoinhan: ten, sdtnguoinhan:sdt, diachinhanhang:diachi}
    })
    console.log(85, res);
    }else{
     
      let htmll=`<p> Thông tin khách hàng còn thiếu </p>`
      $(".contennnn").html(htmll)
      let time1=setTimeout(function(){
        let htmlll=``
        $(".contennnn").html(htmlll)
        },3000);// 
    
    }

     
    
   
  } catch (error) {
    console.log(30,error);
   
  }
}
var tienkhachhangptra=0;

$.ajax({
  url:'/cart/',
  type:'GET'
}).then(data=>{
  console.log(28,data);
  data.donhang.map((ele)=>{
      console.log(ele);
      const html = `
      <tr class="ngang">
          <td class="tensp">
              <a class="tenspdt">${ele.aothunID.ten}</a><br>
              <div class="trangthai" style="display: flex;">
                  <div class="mausacdt" style='background: ${ele.aothunID.mausac}; width:30px; height:20px'></div>
                  <div class="sizedt" style=' width:10px; '>${ele.aothunID.size}</div>
              </div>              
          </td>
          <td class="dongiasp">${ele.aothunID.gia}</td>
          <td lass="slsp">
              <div class="sl">
                    
              <div class="thongso thongso${ele.aothunID._id}">
                  <input  class="solongbentrong solongbentrong${ele.aothunID._id}" type="text" value="${ele.soluong}">                  
              </div>             
              </div>
          </td>
          <td class="thanhtiensp thanhtiensp${ele.aothunID._id}">${ele.aothunID.gia * ele.soluong}</td>
      </tr>
      `
      
      $("#donhangthanhtoan").append(html)
     tienkhachhangptra+=ele.aothunID.gia * ele.soluong;

     let abchtml=`${tienkhachhangptra}đ`
     $(".tongcongso").html(abchtml)
  
  })
}).catch(err=>{console.log(err);})
function quayvegiohang() {
  window.location.href='http://localhost:3000/Gio_Hang'
}
function quaylaihome() {
  window.location.href='http://localhost:3000/home'
}
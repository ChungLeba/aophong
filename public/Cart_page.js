var tongthanhtien=0;
$.ajax({
    url:'/cart/',
    type:'GET'
}).then(data=>{
    data.donhang.map((ele)=>{
        console.log(ele);
        const html = `
        <tr class="ngang">
            <td class="imgsp"><img src="/public/uploads/${ele.aothunID.imgurl[0]}" alt=""></td>
            <td class="tensp">
                <a class="tenspdt">${ele.aothunID.ten}</a><br>
                <div class="trangthai" style="display: flex;">
                    <div class="mausacdt" style='background: ${ele.aothunID.mausac}; width:30px; height:20px'></div>/
                    <div class="sizedt">${ele.aothunID.size}</div>
                </div>
                
            </td>
            <td class="dongiasp">${ele.aothunID.gia}</td>
            <td lass="slsp">
                <div class="sl">
                    <div>
                    <button onclick="trsl('${ele.aothunID._id}',${ele.aothunID.gia})" class="trusl">-</button>
                    </div>   
                <div class="thongso thongso${ele.aothunID._id}">
                    <input  class="solongbentrong solongbentrong${ele.aothunID._id}" type="text" value="${ele.soluong}">
                    
                </div>  
                    <div>
                        <button onclick="cgsl('${ele.aothunID._id}',${ele.aothunID.gia})" class="congsl">+</button>
                    </div>              
                </div>
            </td>
            <td class="thanhtiensp thanhtiensp${ele.aothunID._id}">${ele.aothunID.gia * ele.soluong}</td>
            <td class="xoasp">
                <i class="fas fa-times"></i>
            </td>
        </tr>
        `
        
        $('.bang tbody').append(html)
        tongthanhtien += ele.aothunID.gia * ele.soluong;


        
    
    })
}).catch(err=>{console.log(err);})

function quaylaihome(){
    window.location.href = 'http://localhost:3000/home'
}

function quatrangthanhtoan(){
    window.location.href = 'http://localhost:3000/Thanh_toan'
}

function trsl (ID,giaban) { 
    tongthanhtien -= giaban;
    const so_luong= $(`.solongbentrong${ID}`).val()-1;
    console.log(4, so_luong);

    if(so_luong>=1){
        let html=`
    <input class="solongbentrong solongbentrong${ID}" type="text" value=${so_luong}>
    `  
    $(`.thongso${ID}`).html(html)
    $.ajax({
        type: "POST",
        url: "/cart/cart/reduce/" + ID,
      })
      .then(data=>{
          console.log(55,data);
          var tiencanthanhtoan=0;   
          for (let i = 0; i < data.length; i++) {

            tiencanthanhtoan+=data[i].gia*data[i].soluong*1             
          }
          console.log(tiencanthanhtoan);
          let tiencanthanhtoann=`${tiencanthanhtoan}đ`
          $(".thanhtienttt").html(tiencanthanhtoann)
      })
      .catch(err=>{
          console.log(58,err);
      })
    }
    else{
     let html=`
     <input class="solongbentrong solongbentrong${ID}" type="text" value=1>
     `   
     $(`.thongso${ID}`).html(html)
    }
    thanhtien(ID,giaban)  
}

 function cgsl(ID,giaban){
     console.log('cong');
    tongthanhtien += giaban;
     var so_luong= $(`.solongbentrong${ID}`).val()*1+1
     console.log(20, so_luong);
         let html=`
     <input class="solongbentrong solongbentrong${ID}" type="text" value=${so_luong}>
     `  
     $(`.thongso${ID}`).html(html)   
     thanhtien(ID,giaban)
     $.ajax({
        type: "POST",
        url: "/cart/add-by-one/" + ID,
      })
      .then(data=>{
        var tiencanthanhtoan=0;   
          for (let i = 0; i < data.length; i++) {
              
            tiencanthanhtoan+=data[i].gia*data[i].soluong*1             
          }
          console.log(tiencanthanhtoan);
          let tiencanthanhtoann=`${tiencanthanhtoan}đ`
          $(".thanhtienttt").html(tiencanthanhtoann)
      })
      .catch(err=>{
          console.log(58,err);
      }) 
 }

 function thanhtien(ID,giaban){
     var so_luong= $(`.solongbentrong${ID}`).val()*1
     let html=  `${so_luong*giaban}đ`
     $(`.thanhtiensp${ID}`).html(html)
     
 }
 function logo() {
    window.location.href = 'http://localhost:3000/home'
 }
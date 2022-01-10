var gia=349;
function trsl(){
   const so_luong= $(".solongbentrong").val()-1;
   if(so_luong>=1){
       let html=`
   <input class="solongbentrong" type="text" value=${so_luong}>

   `  
   $(".thongso").html(html)
   }
   else{
    let html=`
    <input class="solongbentrong" type="text" value=1>
 
    `   
    $(".thongso").html(html)
   }
   thanhtien()
  
}
function cgsl(){
    var so_luong= $(".solongbentrong").val()*1+1
   
    if(so_luong>=1){
        let html=`
    <input class="solongbentrong" type="text" value=${so_luong}>
 
    `  
    $(".thongso").html(html)
    }
    else{
     let html=`
     <input class="solongbentrong" type="text" value=1>
  
     `   
     $(".thongso").html(html)
    }
    thanhtien();
}

function thanhtien(){
    var so_luong= $(".solongbentrong").val()*1
    let html=  `${so_luong*gia}.000đ`
    $(".thanhtiensp").html(html)
    return html;
}
thanhtien();
function quaylaihome(){
    window.location.href = 'http://localhost:3000/home'
}
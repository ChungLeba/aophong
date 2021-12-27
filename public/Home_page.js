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
 
  if( !codeArr.includes(data[i].productCode) ){
    codeArr.push(data[i].productCode)
  }
}

console.log(26,codeArr.length);
console.log(29,codeArr);
codeArr.map(function(value, index){
  let html = `
  <div class="spnho">
    
    <div class='img${value}'>

    </div>
    <div class='name${value}'>

    </div>
    <div class='thuonghieu${value}'>

    </div>
    <div class='giatien${value}'style = 'color: red;'>

    </div>
    <div class = 'listColor${value}'>
      
    </div>
  </div>
  `
  $('.listData').append(html)
  for( let i = 0; i < data.length ; i++){
    if(data[i].code === value){
      let color = `
      <div class='colorItem colorItem${i}' style = 'background : ${data[i].color}'>
      </div>
      `
      $(`.listColor${value}`).append(color)
      let img = `
      <img src='${data[i].imgurl[0]}'>
      `
      $(`.img${value}`).html(img)
      let gia=`
      <span>${data[i].gia}</span>
      `
      $(`.giatien${value}`).html(gia)
      let name=`
      <a>${data[i].ten}</a>
      `
      $(`.name${value}`).html(name)
      let thuonghieu=`
      <a>${data[i].thuonghieu}</a>
      `
      $(`.thuonghieu${value}`).html(thuonghieu)

      $(`.colorItem${i}`).on('mouseover', function(){
      $(`.img${value}`).html(img)
      })
    }
  }
})
})
.catch(function(err){
     console.log(err);
});
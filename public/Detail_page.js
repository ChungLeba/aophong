const link = window.location.href
var array = link.split('/')
const code = array[array.length-1]

$.ajax({
    type :"GET",
    url:"/aothun/code/"+code
  
})
.then(data=>{console.log(data);})
.catch(err => {console.log(err);})

